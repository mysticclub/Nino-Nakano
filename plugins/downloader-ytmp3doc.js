/* 
- YTMP3 By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import { ytmp3 } from 'ruhend-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) {
        return conn.reply(m.chat, `Etiqueta el mensaje que contenga el resultado del Play.`, m)
            .then(_ => m.react('✖️'));
    }

    if (!m.quoted.text.includes("`【Y O U T U B E - P L A Y】`")) {
        return conn.reply(m.chat, `Etiqueta el mensaje que contenga el resultado del Play.`, m)
            .then(_ => m.react('✖️'));
    }

    let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'));

    if (!urls) {
        return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(_ => m.react('✖️'));
    }

    if (urls.length < parseInt(text)) {
        return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(_ => m.react('✖️'));
    }

    let user = global.db.data.users[m.sender];

    await m.react('🕓');
    try {
        let videoUrl = urls[0];
        let { title, audio, author, description, duration, views, upload, thumbnail } = await ytmp3(videoUrl);

        // Enviar el archivo como documento
        await conn.sendMessage(m.chat, { 
            document: { url: audio }, 
            mimetype: 'audio/mpeg', 
            fileName: `${title}.mp3`, 
            caption: `🎵 *Título:* ${title}\n👤 *Autor:* ${author}\n⏳ *Duración:* ${duration}\n👀 *Vistas:* ${views}`,
            }, { quoted: m })

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `Hubo un error al procesar la descarga.`, m).then(_ => m.react('✖️'));
    }
};

handler.help = ['Docaudio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Docaudio|docaudio)/;

handler.command = new RegExp;

export default handler;