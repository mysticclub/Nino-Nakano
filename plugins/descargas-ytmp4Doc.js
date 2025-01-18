/* 

*❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ APPLEMUSIC DL ]*
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, `❀ Ingresa un enlace de applemusic`, m)

try {
let api = await axios.get(`https://restapi.apibotwa.biz.id/api/appledl?url=${args[0]}`)
let json = api.data
let { name, albumname, artist, thumb, duration, url, download } = json.result
let HS = `- *Album Name :* ${albumname}
- *Duracion :* ${duration}`

conn.reply(m.chat, `${HS}`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: name,
body: artist,
previewType: 0, thumbnailUrl: thumb,
sourceUrl: url }}})
    
await conn.sendFile(m.chat, download, 'Applemusic.mp4', null, m)
} catch (error) {
console.error(error)    
}}    

handler.command = ['appledl', 'applemusicdl']

export default handler