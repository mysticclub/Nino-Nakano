import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) {
        return // conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m).then(() => m.react('✖️'));
    }

    if (!m.quoted.text.includes("*`【Y O U T U B E - P L A Y】`*")) {
        return // conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m).then(() => m.react('✖️'));
    }

    let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/, 'gi'));
    if (!urls) {
        return conn.reply(m.chat, `Resultado no encontrado.`, m).then(() => m.react('✖️'));
    }

    let videoUrl = urls[0];
    await m.react('🕓');

    try {
        // Llamada a la API para obtener el video
        let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${videoUrl}`);
        let json = await api.json();

        let { title, quality, size, download_url } = json.result;

        // Enviar el video al usuario
        let caption = `» *Título:* ${title}\n`;
        caption += `» *Calidad:* ${quality}\n`;

        await conn.sendMessage(m.chat, { 
            video: { url: download_url }, 
            caption: caption, 
            mimetype: 'video/mp4' 
        }, { quoted: m });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        return conn.reply(`Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.`);
    }
};

handler.customPrefix = /^(V|v)/;
handler.command = new RegExp();

export default handler;