import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Ingresa una URL de YouTube.');
    if (!text.match(/youtu\.be|youtube\.com/i)) return m.reply('❌ URL de YouTube no válida.');

    await m.react('⏳');

    try {
        const apiUrl = `https://dark-core-api.vercel.app/api/download/ytmp4?key=api&url=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.downloads || data.downloads.length === 0) throw new Error('⚠️ No se encontraron enlaces de descarga.');

        const video = data.downloads[0]; // Solo el primer resultado
        const sizeMB = parseFloat(video.size.replace('MB', '').trim());

        const messageOptions = {
            mimetype: 'video/mp4',
            fileName: `${data.title || "video"}.mp4`,
            caption: `🎥 *${data.title || "Video"}*\n📦 *Tamaño:* ${video.size}\n🔹 *Calidad:* ${video.quality}`
        };

        if (sizeMB > 50) {
            await conn.sendMessage(m.chat, { document: { url: video.link }, ...messageOptions }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { video: { url: video.link }, ...messageOptions }, { quoted: m });
        }

        await m.react('✅');

    } catch (error) {
        await m.react('❌');
        m.reply('❌ Error al procesar la solicitud.');
    }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = /^ytmp4$/i;

export default handler;
