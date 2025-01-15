import axios from 'axios'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
    if (!args[0]) {
        await m.react('✖️') // Reacción de error por falta de enlace
        return conn.reply(m.chat, `❀ Ingresa un link de Instagram`, m)
    }

    if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(p|tv|reel)\\/([a-zA-Z0-9_-]+)(\\/)?(\\?.*)?$'))) {
        await m.react('✖️') // Reacción de error por enlace inválido
        return conn.reply(m.chat, `❀ Verifica que sea un link de Instagram`, m)
    }

    try {
        await m.react('🕑')
        let api = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/igdl?url=${args[0]}`)
        for (let a of api.data.data) {
            if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
                await conn.sendMessage(m.chat, { image: { url: a.url } }, { quoted: m })
            } else {
                await conn.sendMessage(m.chat, { video: { url: a.url } }, { quoted: m })
            }
        }
        await m.react('✅')
    } catch (error) {
        console.log(error)
        await m.react('❌')
    }
}

handler.command = /^(instagramdl|igdl|ig|instagram)$/i

export default handler