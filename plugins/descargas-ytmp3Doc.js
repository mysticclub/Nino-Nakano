import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `[ ✰ ] Ingresa un enlace válido para descargar el archivo.`, m);
    }

    await conn.sendMessage(m?.chat, { react: { text: `🌟`, key: m?.key } });

    class APIError extends Error {
        constructor(message) {
            super(message);
            this.name = "APIError";
        }
    }

    class BK9Downloader {
        constructor() {
            this.apiUrl = 'https://bk9.fun/download/alldownload?url=';
        }

        async fetch(url) {
            try {
                const response = await axios.get(`${this.apiUrl}${encodeURIComponent(url)}`);
                if (!response.data.status) throw new APIError("No se pudo obtener un enlace de descarga.");
                return this.parseData(response.data.BK9);
            } catch (error) {
                console.error(`[BK9] Error: ${error.message}`);
                throw new APIError(error.message);
            }
        }

        parseData(data) {
            return {
                title: data.title || "Sin título",
                videoLinks: [
                    { quality: 'Alta', url: data.high || null },
                    { quality: 'Baja', url: data.low || null }
                ].filter(v => v.url),
                audioLink: data.audio || null,
                downloadLink: data.download || null
            };
        }
    }

    const bk9 = new BK9Downloader();
    try {
        const result = await bk9.fetch(args[0]);

        let message = `🏷️ *Título*: ${result.title}\n`;
        if (result.videoLinks.length > 0) {
            message += `🎥 *Videos Disponibles*:\n`;
            result.videoLinks.forEach(v => message += `🔹 *${v.quality}*: ${v.url}\n`);
        }
        if (result.audioLink) message += `🎵 *Audio*: ${result.audioLink}\n`;

        await conn.reply(m.chat, message, m);

        // Enviar el mejor video disponible
        if (result.videoLinks.length > 0) {
            const bestVideo = result.videoLinks[0].url;
            await conn.sendMessage(m.chat, { video: { url: bestVideo }, caption: `🎥 ${result.title}` }, { quoted: m });
        } else {
            await conn.reply(m.chat, `[ ✰ ] No se encontró un video descargable.`, m);
        }

    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m);
    }
};

handler.help = ['download *<url>*'];
handler.tags = ['dl'];
handler.command = ['download', 'video', 'image', 'doc'];

export default handler;