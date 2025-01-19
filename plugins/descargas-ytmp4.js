import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de youtube', m)
    
    try {
        await m.react('🕒');
        let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`)
        let json = await api.json();
        let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json;
        
        let HS = `*Titulo :* ${title}\nDuración : ${duration}\nCalidad : ${quality}p`;
        
        let durationInSeconds = parseInt(duration.split(':')[0]) * 60 + parseInt(duration.split(':')[1]);
        
        if (durationInSeconds >= 3600) {
            await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'video/mp4', fileName: `${title}.mp4`, caption: HS }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: HS }, { quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖');
    }
}

handler.command = ['ytmp4']

export default handler;



/* import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un  link de youtube`, m)
    
try {
await m.react('🕒');
let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`)
let json = await api.json()
let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json
let HS = `*Titulo :* ${title}
*Duracion :* ${duration}
*Calidad :* ${quality}p`
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: HS }, { quoted: m })
await m.react('✅');
} catch (error) {
console.error(error)
await m.react('✖️');
}}

handler.command = ['ytmp4']

export default handler */