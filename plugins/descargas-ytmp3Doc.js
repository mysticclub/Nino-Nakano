import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `[ ✰ ] Ingresa un enlace válido para descargar el video.`, m);
    }

    await m.react('🕓');

    try {
        const response = await axios.get(`https://bk9.fun/download/alldownload?url=${encodeURIComponent(args[0])}`);
        const data = response.data;

        if (data.status) {
            const { title, low, high } = data.BK9;
            const videoUrl = high || low; // Preferencia por calidad alta, si está disponible.

            const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });

            const message = `🏷️ *Título*: ${title}\n` +
                            `🔗 *Enlace Original*: ${args[0]}\n`;

            await conn.sendFile(m.chat, videoResponse.data, 'video.mp4', message, m, { quoted: m });
            await m.react('✅');
        } else {
            await conn.reply(m.chat, `[ ✰ ] Ocurrió un error: No se pudo descargar el video.`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `[ ✰ ] Ocurrió un error al procesar tu solicitud.`, m);
        await m.react('✖️');
    }
};

handler.help = ['download *<url>*'];
handler.tags = ['dl'];
handler.command = ['download', 'video'];

export default handler;