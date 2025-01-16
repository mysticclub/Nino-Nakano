
import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 320
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
        if (!args || !args[0]) throw `✳️ ejemplo :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
    if (!args[0].match(/youtu/gi)) throw `❎ no es un link de yt`
         let chat = global.db.data.chats[m.chat]
         m.react(rwait) 

         let q = args[1] || '360p'
 try {
                const yt = await fg.ytv(args[0], q)
                let { title, dl_url, quality, size, sizeB } = yt
        let isLimit = limit * 1024 < sizeB 

     await conn.loadingMsg(m.chat, '📥 Descargando', ` ${isLimit ? `≡  *FG YTDL 2*\n\n▢ *⚖️ peso*: ${size}\n▢ *🎞️ calidad*: ${quality}\n\n▢ _limite_ *+${limit} MB*` : '✅ Descarga Completada' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m)

          if(!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp4', `
 ≡  *FG YTDL*
  
*📌 título:* ${title}
*🎞️ titulo:* ${quality}
*⚖️ titulo:* ${size}
`.trim(), m, false, { asDocument: chat.useDocument })
                m.react(done) 
         } catch {

        try {
        let yt = await fg.ytmp4(args[0], q)
    let { title, size, sizeB, dl_url, quality } = yt

  let isLimit = limit * 1024 < sizeB 

  await conn.loadingMsg(m.chat, '📥 Descargando', ` ${isLimit ? `≡  *FG YTDL 2*\n\n▢ *⚖️peso*: ${size}\n▢ *🎞️ calidad*: ${quality}\n\n▢ _Limite_ *+${limit} MB*` : '✅ Descarga Completada' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m)

if(!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp4', `
 ≡  *FG YTDL 2*
  
▢ *📌titulo* : ${title}
*🎞️calidad:* ${quality}
▢ *⚖️peso* : ${size}
`.trim(), m, false, { asDocument: chat.useDocument })
                m.react(done)

        } catch {
                await m.reply(`❎ error`)
        }
                } 
}
handler.help = ['ytmp4 <link yt>']
handler.tags = ['dl'] 
handler.command = ['ytmp4doc', 'fgmp4doc']
handler.diamond = false

export default handler