import fg from 'api-dylux';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const limit = 320; // Límite en MB
const rwait = '⏳'; // Emoji o texto para indicar espera
const done = '✅';  // Emoji o texto para indicar éxito

let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
    if (!args || !args[0]) {
        throw `✳️ Ejemplo:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
    }

    // Validar que el enlace sea de YouTube
    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(args[0])) {
        throw `❎ No es un enlace válido de YouTube.`;
    }

    const quality = args[1] || '360p'; // Calidad por defecto
    const chat = global.db.data.chats[m.chat]; // Obtener configuración del chat

    try {
        // Enviar reacción inicial
        await m.react(rwait);

        // Descargar usando `fg.ytv`
        const yt = await fg.ytv(args[0], quality);
        const { title, dl_url, quality: ytQuality, size, sizeB } = yt;
        const isLimit = limit * 1024 < sizeB;

        // Mensaje de carga
        await conn.reply(m.chat, `📥 Descargando...\n${isLimit ? `⚖️ *Peso*: ${size}\n🎞️ *Calidad*: ${ytQuality}\n\n_Límite de descarga superado: ${limit} MB_` : '✅ Descarga Completada'}`, m);

        // Enviar archivo si no supera el límite
        if (!isLimit) {
            await conn.sendFile(
                m.chat,
                dl_url,
                `${title}.mp4`,
                `
≡  *Descarga Completa*

📌 *Título:* ${title}
🎞️ *Calidad:* ${ytQuality}
⚖️ *Peso:* ${size}
                `.trim(),
                m,
                false,
                { asDocument: chat.useDocument }
            );
        }
        await m.react(done); // Reacción de éxito
    } catch (error) {
        try {
            // Intentar con `fg.ytmp4` si el anterior falla
            const yt = await fg.ytmp4(args[0], quality);
            const { title, size, sizeB, dl_url, quality: ytQuality } = yt;
            const isLimit = limit * 1024 < sizeB;

            // Mensaje de carga
            await conn.reply(m.chat, `📥 Descargando...\n${isLimit ? `⚖️ *Peso*: ${size}\n🎞️ *Calidad*: ${ytQuality}\n\n_Límite de descarga superado: ${limit} MB_` : '✅ Descarga Completada'}`, m);

            // Enviar archivo si no supera el límite
            if (!isLimit) {
                await conn.sendFile(
                    m.chat,
                    dl_url,
                    `${title}.mp4`,
                    `
≡  *Descarga Completa (Método Alternativo)*

📌 *Título:* ${title}
🎞️ *Calidad:* ${ytQuality}
⚖️ *Peso:* ${size}
                    `.trim(),
                    m,
                    false,
                    { asDocument: chat.useDocument }
                );
            }
            await m.react(done); // Reacción de éxito
        } catch (e) {
            // Enviar mensaje de error si ambos métodos fallan
            await conn.reply(m.chat, `❎ Error al procesar la descarga. Intenta con otro enlace.`, m);
        }
    }
};

handler.help = ['ytmp4 <link yt>'];
handler.tags = ['dl'];
handler.command = ['ytmp4doc', 'fgmp4doc'];
handler.diamond = false;

export default handler;