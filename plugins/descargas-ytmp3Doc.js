import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `🎵 Ingresa un link de TikTok.`, m);
    await m.react('🕓');

    try {
        let api = await fetch(`https://only-awan.biz.id/api/fullApi/d/tiktok?url=${encodeURIComponent(text)}`);
        let json = await api.json();
        
        if (!json.status || !json.data?.status || !json.data?.data?.urls?.length) {
            return m.reply('❌ Error al obtener los detalles del video. Asegúrate de que el enlace es válido.');
        }

        let { original_url, urls } = json.data.data;
        let downloadLink = urls[0]; // Usamos el primer enlace de la lista
        
        let caption = `*「🎵 TikTok Downloader 」*\n\n> 📌 Enlace original: ${original_url}\n> 📥 [Descargar Video](${downloadLink})`;

        // Enviar el archivo con el caption
        await conn.sendFile(m.chat, downloadLink, 'tiktok.mp4', caption, m, null, { asDocument: false });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
}

handler.help = ['tiktok *<url>*'];
handler.tags = ['dl'];
handler.command = ['tiktokv3'];

export default handler;