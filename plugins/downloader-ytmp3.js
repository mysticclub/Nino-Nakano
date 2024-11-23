/* 
- YTMP3 By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
/* import { ytmp3 } from 'ruhend-scraper';

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

export default handler; */

import { ytmp3 } from 'ruhend-scraper';
let limit = 200;

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m).then(_ => m.react('✖️'));
    if (!m.quoted.text.includes("*\`【 Y T - P L A Y 】\`*")) return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m).then(_ => m.react('✖️'));
    let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'));
    if (!urls) return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(_ => m.react('✖️'));
    if (urls.length < text) return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(_ => m.react('✖️'));
    
    let user = global.db.data.users[m.sender];

    await m.react('🕓');
    try {
        let videoUrl = urls[0];
        let { title, audio, author, description, duration, views, upload, thumbnail } = await ytmp3(videoUrl);

        // Validar tamaño del archivo
        if (parseFloat(size) >= limit) {
            return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la descarga.`, m).then(_ => m.react('✖️'));
        }

        // Enviar el archivo al usuario
     //   await conn.sendFile(m.chat, dl_url, `${title}.mp3`, null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
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


/* import Starlights from '@StarlightsTeam/Scraper'
let limit = 200

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
if (!m.quoted) return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
if (urls.length < text) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
let user = global.db.data.users[m.sender]

await m.react('🕓')
try {
let v = urls[0]
let { title, duration, size, thumbnail, dl_url } = await Starlights.ytmp3v2(v)

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))

await conn.sendFile(m.chat, dl_url, title + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
} catch {
try {
let v = urls[0]
let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp3(v)

if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))

await conn.sendFile(m.chat, dl_url, title + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
await m.react('✅')
} catch {
await m.react('✖️')
}}}
handler.help = ['Audio']
handler.tags = ['downloader']
handler.customPrefix = /^(Audio|audio)/
handler.command = new RegExp
//handler.limit = 1

export default handler

Para que funcione de la misma manera pero descargando desde otro scraper que es el siguiente 

import { ytmp3 } from 'ruhend-scraper'; */
