// *[ ❀ YT POST DL  ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de un post de youtube`, m)
  
try {
let api = await fetch(`https://api.siputzx.my.id/api/d/ytpost?url=${text}`)
let json = await api.json()
let { images, content } = json.data
let HS = `- *Titulo :* ${content}`
for (let imagen of images) {
await conn.sendFile(m.chat, imagen, 'HasumiBotFreeCodes.jpg', HS, m)
}

} catch (error) {
console.error(error)    
}}

handler.command = ['ytpost', 'ytpostdl']

export default handler