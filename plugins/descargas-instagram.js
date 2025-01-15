/* import axios from 'axios'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
    if (!args[0]) {
        await m.react('✖️')
        return conn.reply(m.chat, `☁️ Ingresa un link de Instagram`, m, fake)
    }

    if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(p|tv|reel)\\/([a-zA-Z0-9_-]+)(\\/)?(\\?.*)?$'))) {
        await m.react('✖️')
        return conn.reply(m.chat, `☁️ Verifica que sea un link de Instagram`, m)
    }

    try {
        await m.react('🕑')
        let api = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/igdl?url=${args[0]}`).JSON
        let title = api.title
        for (let a of api.data.data) {
            if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
                await conn.sendMessage(
                    m.chat, 
                    { 
                        image: { url: a.url }, 
                        caption: '> *[ I G - D O W N L O A D ]*\n ${title}' 
                    }, 
                    { quoted: m }
                )
            } else {
                await conn.sendMessage(
                    m.chat, 
                    { 
                        video: { url: a.url }, 
                        caption: '> *[ I G - D O W N L O A D ]*\n' 
                    }, 
                    { quoted: m }
                )
            }
        }
        await m.react('✅') 
    } catch (error) {
        console.log(error)
        await m.react('❌')
    }
}

handler.command = /^(instagramdl|igdl|ig|instagram)$/i

export default handler */

import axios from 'axios'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
    if (!args[0]) {
        await m.react('✖️')
        return conn.reply(m.chat, `☁️ Ingresa un link de Instagram`, m)
    }

    if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(p|tv|reel)\\/([a-zA-Z0-9_-]+)(\\/)?(\\?.*)?$'))) {
        await m.react('✖️')
        return conn.reply(m.chat, `☁️ Verifica que sea un link de Instagram`, m)
    }

    try {
        await m.react('🕑')
        let response = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/igdl?url=${args[0]}`)
        let { title, data } = response.data

        for (let a of data) {
            if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
                await conn.sendMessage(
                    m.chat, 
                    { 
                        image: { url: a.url }, 
                        caption: `> *[ I G - D O W N L O A D ]*\n*Título:* ${title}` 
                    }, 
                    { quoted: m }
                )
            } else {
                await conn.sendMessage(
                    m.chat, 
                    { 
                        video: { url: a.url }, 
                        caption: `> *[ I G - D O W N L O A D ]*\n*Título:* ${title}` 
                    }, 
                    { quoted: m }
                )
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