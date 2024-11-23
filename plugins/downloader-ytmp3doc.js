import { youtubedl } from '@bochilteam/scraper-youtube';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) {
        return conn.reply(m.chat, `*\`Etiqueta el mensaje que contenga el resultado del Play.🤍\`*`, m)
            .then(_ => m.react('✖️'));
    }

    if (!m.quoted.text.includes("*\`【Y O U T U B E - P L A Y】\`*")) {
        return conn.reply(m.chat, `*\`Etiqueta el mensaje que contenga el resultado del Play.🤍\`*`, m)
            .then(_ => m.react('✖️'));
    }

    let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'));

    if (!urls) {
        return conn.reply(m.chat, `*\`Resultado no Encontrado.🤍\`*`, m).then(_ => m.react('✖️'));
    }

    if (urls.length < parseInt(text)) {
        return conn.reply(m.chat, `*\`Resultado no Encontrado.🤍\`*`, m).then(_ => m.react('✖️'));
    }

    let user = global.db.data.users[m.sender];

    await m.react('🕓');
    try {
        let videoUrl = urls[0];
        let { title, description, viewH, duration, url } = await youtubedl(videoUrl);

        // Enviar el archivo MP3 (documento)
        await conn.sendMessage(m.chat, { 
            document: { url: url }, 
            caption: '*By: GenesisBot*', 
            mimetype: 'audio/mpeg', 
            fileName: `${title}.mp3`
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `*\`Hubo un error al procesar la descarga.🤍\`*`, m).then(_ => m.react('✖️'));
    }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)/;
handler.command = new RegExp();

export default handler;
