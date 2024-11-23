import { ytmp3 } from 'ruhend-scraper';
import fetch from 'node-fetch'; // Si estás en un entorno Node.js

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) {
        return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m)
            .then(_ => m.react('✖️'));
    }

    if (!m.quoted.text.includes("*\`【 Y T - P L A Y 】\`*")) {
        return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m)
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

        // Enviar el archivo al usuario
        await conn.sendMessage(m.chat, { 
            audio: { url: audio }, 
            mimetype: "audio/mp3", 
            fileName: title + '.mp3', 
            quoted: m, 
            contextInfo: {
                'forwardingScore': 200,
                'isForwarded': true,
                externalAdReply: {
                    showAdAttribution: false,
                    title: `${title}`,
                    body: `${author}`,
                    mediaType: 2,
                    sourceUrl: ' ',
                    thumbnail: await (await fetch(thumbnail)).buffer()
                }
            }
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `Hubo un error al procesar la descarga.`, m).then(_ => m.react('✖️'));
    }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)/;
handler.command = new RegExp;
// handler.limit = 1;

export default handler;
