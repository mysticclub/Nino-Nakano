/* 
- Downloader Ytmp3 By Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y 
*/
import fetch from 'node-fetch'

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
export default handler