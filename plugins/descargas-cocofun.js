
import fetch from "node-fetch"
 
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply("ingresa un link de cocofun")
 
try {
let api = await fetch(`https://api.agatz.xyz/api/cocofundl?url=${args[0]}`)
let json = await api.json()
let { title, description, image, video, topic, caption, play, like, share, duration, thumbnail, watermark, no_watermark } = json.data
let JT = `*Title :* ${title}
*Descripcion :* ${description}
*Visitas :* ${play}
*Likes :* ${like}
*Duracion :* ${duration}
`
 
await conn.sendFile(m.chat, image, 'HasumiBotFreeCodes.jpg', JT, m)
await conn.sendFile(m.chat, no_watermark, 'HasumiBotFreeCodes.mp4', JT, m)
} catch (error) {
console.error(error)
}}
 
handler.command = ['cocofundl']
 
export default handler