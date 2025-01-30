/* 
- Downloader Ytmp3 By Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y 
*/
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) throw '• Ingresa un enlace de YouTube.'
try {
let res = await fetch(`https://api.diioffc.web.id/api/download/ytmp3?url=${encodeURIComponent(text)}`)
let json = await res.json()
if (json.status && json.result?.download?.url) {
let { title, thumbnail, views, duration, author, download } = json.result
let caption = `🎵 *Título:* ${title}\n📌 *Canal:* ${author.name}\n⏳ *Duración:* ${duration.timestamp}\n👁️ *Vistas:* ${views.toLocaleString()}`
await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption }, { quoted: m })
await conn.sendMessage(m.chat, { audio: { url: download.url }, mimetype: 'audio/mpeg', fileName: download.filename || 'audio.mp3' }, { quoted: m })
} else throw 'No se pudo obtener el audio.'
} catch (e) {
m.reply(`❌ *Error:* ${e.message || 'Ocurrió un error desconocido'}`)
}}
handler.command = ['ytmp3']
export default handler

/* import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '• Ingresa un enlace de YouTube.', m)

try {
let apiUrl = `https://api.diioffc.web.id/api/download/ytmp4?url=${encodeURIComponent(text)}`
let response = await fetch(apiUrl)
let result = await response.json()

if (!result.status) throw new Error('No se pudo obtener el video.')

let { title, thumbnail, views, duration, download } = result.result
let info = `🎬 *Título:* ${title}\n👀 *Vistas:* ${views.toLocaleString()}\n⏳ *Duración:* ${duration.timestamp}`

await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: info }, { quoted: m })
await conn.sendMessage(m.chat, { video: { url: download.url }, caption: title }, { quoted: m })

} catch (error) {
console.error(error)
conn.reply(m.chat, '❌ Error al descargar el video.', m)
}}

handler.command = ['ytmp7']
export default handler */