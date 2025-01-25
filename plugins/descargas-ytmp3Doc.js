import fetch from "node-fetch";

let handler = async (m, { conn, args, text }) => {
    // Verifica si se proporcionó una URL
    if (!args[0]) {
        return m.reply(
            `✧ Por favor, ingresa un enlace válido de una de las plataformas soportadas:\n\n` +
            `- Facebook\n- Instagram\n- TikTok\n- Twitter\n- y más...`
        );
    }

    const apiKey = 'xenzpedo'; // Tu API Key
    const url = args[0]; // URL proporcionada por el usuario

    // Indica que el bot está procesando la solicitud
    await conn.sendMessage(m.chat, { react: { text: `🌟`, key: m.key } });

    try {
        // Llamada a la API
        const response = await fetch(
            `https://api.botcahx.eu.org/api/dowloader/allin?url=${encodeURIComponent(url)}&apikey=${apiKey}`
        );

        // Procesa la respuesta de la API
        const result = await response.json();

        if (result.status === 200 && result.result) {
            const { title, video, audio } = result.result;

            // Enviar video si está disponible
            if (video) {
                await conn.sendMessage(
                    m.chat,
                    {
                        video: { url: video },
                        caption: `*Título*: ${title || 'Sin título disponible'}\n\n*Enlace del video:* ${video}`,
                    },
                    { quoted: m }
                );
            } else {
                await m.reply("No se encontró un video para el enlace proporcionado.");
            }

            // Enviar audio si está disponible
            if (audio) {
                await conn.sendMessage(
                    m.chat,
                    {
                        audio: { url: audio },
                        mimetype: 'audio/mp4',
                        ptt: false,
                        caption: `*Título*: ${title || 'Sin título disponible'}\n\n*Enlace del audio:* ${audio}`,
                    },
                    { quoted: m }
                );
            } else {
                await m.reply("No se encontró un audio para el enlace proporcionado.");
            }
        } else {
            // Error proporcionado por la API
            await m.reply(`Error: ${result.message || 'No se pudo procesar la solicitud.'}`);
        }
    } catch (error) {
        console.error(error);
        await m.reply(`Error: ${error.message}`);
    }
};

handler.help = ['aio'].map(v => v + ' *<link>*');
handler.tags = ['downloader'];
handler.command = /^(aio)$/i;

handler.limit = true;
handler.register = true;

export default handler;