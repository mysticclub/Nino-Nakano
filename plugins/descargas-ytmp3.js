/* 
*❀ By Jtxs*
[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ YTMP3 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `☁️ Ingresa un link de youtube`, m)
await m.react('🕓')

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`)
let json = await api.json()
let title = json.result.metadata.title
let dl_url = json.result.download.url

await m.react('✅')
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })

} catch (error) {
console.error(error)
}}

handler.command = ['ytmp3']

export default handler