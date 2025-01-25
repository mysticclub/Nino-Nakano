import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply(
            `✧ Por favor, ingresa un enlace válido de una plataforma soportada.`
        );
    }

    const apiKey = 'xenzpedo'; // API Key
    const url = args[0]; // URL del enlace proporcionado

    try {
        // Llamada a la API
        const response = await fetch(
            `https://api.botcahx.eu.org/api/dowloader/allin?url=${encodeURIComponent(url)}&apikey=${apiKey}`
        );

        // Verifica si el servidor respondió correctamente
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error del servidor: ${errorText}`);
            return m.reply(`Error: El servidor devolvió un error. Verifica tu URL o la API Key.`);
        }

        // Intenta convertir la respuesta a JSON
        let result;
        try {
            result = await response.json();
        } catch (error) {
            console.error(`Error al analizar JSON: ${error.message}`);
            const errorText = await response.text();
            console.error(`Respuesta del servidor: ${errorText}`);
            return m.reply(`Error: El servidor no devolvió una respuesta válida.`);
        }

        // Verifica el estado de la respuesta
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
            m.reply(`Error: ${result.message || 'No se pudo procesar la solicitud.'}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        m.reply(`Error al procesar la solicitud: ${error.message}`);
    }
};

handler.help = ['aio'].map(v => v + ' *<link>*');
handler.tags = ['downloader'];
handler.command = /^(aio)$/i;

handler.limit = true;
handler.register = true;

export default handler;