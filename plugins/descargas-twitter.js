/* import fetch from "node-fetch"

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    await m.react('✖️')
    return m.reply("☁️ ingresa un link de twitter")
  }

  try {
    await m.react('🕒')

    let api = await fetch(`https://api.agatz.xyz/api/twitter?url=${args[0]}`)
    let json = await api.json()
    let { desc, thumb, video_sd, video_hd, audio } = json.data

    await conn.sendFile(m.chat, thumb, 'imagen.jpg', desc, m)
    await m.react('✅')

    await conn.sendFile(m.chat, video_hd || video_sd, 'video.mp4', desc, m)
    await m.react('✅')

  } catch (error) {
    console.error(error)
    await m.react('❌')
  }
}

handler.command = ['x']

export default handler */



/* 
- Twitter Downloader By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
 import axios from 'axios';
let enviando = false;

const handler = async (m, {conn, text, usedPrefix, command, args}) => {
    if (!args || !args[0]) return conn.reply(m.chat, '*Ingresa un enlace de Twitter*', m)
    if (enviando) return; 
    enviando = true;

    try {
 
        const apiResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/download/twitterdl?url=${args[0]}`);
        const res = apiResponse.data;

        if (res?.type === 'video') {
            
            const caption = res.caption ? res.caption : '*TWITTER - VIDEO*';
            for (let i = 0; i < res.media.length; i++) {

                await conn.sendMessage(m.chat, { video: { url: res.media[i].url }, caption: caption }, { quoted: m });
            }

            enviando = false;
            return;
        
        } else if (res?.type === 'image') {
            
            const caption = res.caption ? res.caption : '*TWITTER - IMAGEN*';
            for (let i = 0; i < res.media.length; i++) {
                await conn.sendMessage(m.chat, { image: { url: res.media[i].url }, caption: caption }, { quoted: m });
            }

            enviando = false;
            return;
        }

    } catch (error) {
        
        enviando = false;
        console.error(error);         
        conn.reply(m.chat, `Error al descargar su archivo`, m);
    }
};

handler.help = ['twitter *<url>*']
handler.tags = ['dl']
handler.command = /^(x|twt|twitter(dl)?)$/i
export default handler;
