import fetch from 'node-fetch';

let handler = async (m, { conn, args, command }) => {
    if (!args[0]) throw m.reply('✧ Ingresa el nombre de la canción o un enlace de YouTube.');

    await conn.sendMessage(m.chat, { react: { text: `🎵`, key: m.key } });

    try {
        if (command === "ply2") {
            let apiUrl = `https://api.diioffc.web.id/api/search/ytplay?query=${encodeURIComponent(args.join(" "))}`;
            const res = await fetch(apiUrl);
            const response = await res.json();

            if (!response.result || !response.result.url) throw new Error("No se encontró el video.");

            let { url, title, description, views, thumbnail } = response.result;
            let caption = `🎶 *Título:* ${title}\n📄 *Descripción:* ${description}\n👀 *Vistas:* ${views}`;

            await conn.sendMessage(m.chat, {
                caption,
                footer: "YouTube Play",
                buttons: [
                    { buttonId: `.ytmp3 ${url}`, buttonText: { displayText: "🎵 Ytmp3 / Audio" }, type: 1 },
                    { buttonId: `.ytmp4 ${url}`, buttonText: { displayText: "📹 Ytmp4 / Video" }, type: 1 }
                ],
                headerType: 1,
                contextInfo: {
                    externalAdReply: {
                        title: 'Descargar MP4 / MP3',
                        body: 'YouTube Downloader',
                        thumbnailUrl: thumbnail,
                        sourceUrl: url,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });

        } else if (command === "ytmp3") {
            let apiUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(args[0])}`;
            const res = await fetch(apiUrl);
            const response = await res.json();

            console.log("Respuesta API YTMP3:", response);

            if (!response.data || !response.data.dl) throw new Error("No se pudo descargar el audio.");

            await conn.sendMessage(m.chat, {
                audio: { url: response.data.dl },
                mimetype: "audio/mpeg",
                fileName: `${response.data.title || "audio"}.mp3`
            }, { quoted: m });

        } else if (command === "ytmp4") {
            let apiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(args[0])}`;
            const res = await fetch(apiUrl);
            const response = await res.json();

            console.log("Respuesta API YTMP4:", response);

            if (!response.data || !response.data.dl) throw new Error("No se pudo descargar el video.");

            await conn.sendMessage(m.chat, {
                video: { url: response.data.dl },
                mimetype: 'video/mp4',
                caption: '✅ Descarga completada.'
            }, { quoted: m });
        }
    } catch (error) {
        console.error("Error en descarga:", error);
        await m.reply(`❌ Error: ${error.message}`);
    }
};

handler.help = ['ply2', 'ytmp3', 'ytmp4'].map(v => v + ' <texto o enlace>');
handler.tags = ['dl'];
handler.command = /^(ply2|ytmp3|ytmp4)$/i;
handler.limit = true;
handler.register = true;

export default handler;