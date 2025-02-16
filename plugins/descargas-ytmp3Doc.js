import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw "✧ Ingresa un link válido de:\n- YouTube\n- Instagram\n- TikTok\n- Facebook\n- Twitter";

    await conn.sendMessage(m.chat, { react: { text: "🌟", key: m.key } });

    try {
        let url = `https://api.nasirxml.my.id/download/aio?url=${encodeURIComponent(args[0])}`;
        let response = await axios.get(url);
        let data = response.data;

        // Verificar si la API responde correctamente
        if (!data || !data.result || data.result.length === 0) {
            throw "❌ No se encontraron resultados.";
        }

        let result = data.result[0]; // Tomar el primer resultado
        let message = `*🎥 Título:* ${result.title || "Desconocido"}\n`;
        message += `👤 *Dueño:* ${result.owner || "No disponible"}\n`;
        message += `👀 *Vistas:* ${result.views || "No disponible"}\n`;
        message += `🔄 *Compartidos:* ${result.shares || "No disponible"}\n\n`;

        // Enviar la imagen si existe
        if (result.image) {
            await conn.sendMessage(m.chat, { image: { url: result.image }, caption: message });
        } else {
            await m.reply(message);
        }

        // Verificar enlaces de descarga
        let videoLinks = result.dlink?.filter(link => link.title?.toLowerCase().includes("video")) || [];
        let audioLinks = result.dlink?.filter(link => link.title?.toLowerCase().includes("mp3")) || [];

        if (videoLinks.length > 0) {
            await conn.sendMessage(m.chat, {
                video: { url: videoLinks[0].link },
                caption: "🎬 *Aquí está tu video:*"
            });
        } else if (audioLinks.length > 0) {
            await conn.sendMessage(m.chat, {
                audio: { url: audioLinks[0].link },
                mimetype: 'audio/mp3',
                ptt: false
            }, { quoted: m });
        } else {
            await m.reply("⚠️ No se encontró un enlace de descarga disponible.");
        }

    } catch (error) {
        console.error(error);
        await m.reply(`❌ Error: ${error.message || "Ocurrió un problema inesperado."}`);
    }
}

handler.help = ['aio <link>'];
handler.tags = ['descargas'];
handler.command = /^(aio)$/i;

handler.limit = true;
handler.register = true;

export default handler;