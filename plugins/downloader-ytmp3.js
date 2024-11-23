/* 
- YTMP3 By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import { ytmp3 } from 'ruhend-scraper';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args || !args[0]) return conn.reply(m.chat, '*\`Ingresa El link Del audio a descargar 🤍\`*', m, fake)
    await m.react('🕓');
    try {
        const { title, audio, author, description, duration, views, upload, thumbnail } = await ytmp3(args[0]);

       await m.react('✅'); 
       await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: "audio/mp4", fileName: title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${title}`,
body: `${author}`,
mediaType: 2, 
sourceUrl: ' ',
thumbnail: await (await fetch(thumbnail)).buffer()}}}, { quoted: m })

    } catch (error) {
        console.error(error);
        await m.react('✖️');
    }
};

handler.help = ['audio *<link yt>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3', 'audio'];
handler.register = true;

export default handler; 