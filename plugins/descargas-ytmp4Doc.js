import fetch from "node-fetch"

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        await m.react('✖️')
        return m.reply("Ingresa un link de videy")
    }

    try {
        await m.react('🕑')
        let api = await fetch(`https://api.agatz.xyz/api/videydl?url=${args[0]}`)
        let json = await api.json()
        let { data } = json

        await conn.sendFile(m.chat, data, 'video.mp4', null, m)
        await m.react('✅')
    } catch (error) {
        console.error(error)
        await m.react('❌')
    }
}

handler.command = ['videydl']

export default handler






// BY JTXS
// Creado : 21/11/24
 
/* import fetch from "node-fetch"
 
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply("ingresa un link de videy")
 
try {
let api = await fetch(`https://api.agatz.xyz/api/videydl?url=${args[0]}`)
let json = await api.json()
let { data } = json
 
await conn.sendFile(m.chat, data, 'HasumiBotFreeCodes.mp4', null, m)
} catch (error) {
console.error(error)
}}
 
handler.command = ['videydl']
 
export default handler */