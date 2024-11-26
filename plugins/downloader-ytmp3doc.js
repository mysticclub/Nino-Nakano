/* 
- YTMP3 By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
/* import { ytmp3 } from 'ruhend-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) {
        return conn.reply(m.chat, `Etiqueta el mensaje que contenga el resultado del Play.`, m)
            .then(_ => m.react('✖️'));
    }

    if (!m.quoted.text.includes("`【Y O U T U B E - P L A Y】`")) {
        return conn.reply(m.chat, `Etiqueta el mensaje que contenga el resultado del Play.`, m)
            .then(_ => m.react('✖️'));
    }

    let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'));

    if (!urls) {
        return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(_ => m.react('✖️'));
    }

    if (urls.length < parseInt(text)) {
        return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(_ => m.react('✖️'));
    }

    let user = global.db.data.users[m.sender];

    await m.react('🕓');
    try {
        let videoUrl = urls[0];
        let { title, audio, author, description, duration, views, upload, thumbnail } = await ytmp3(videoUrl);

        // Enviar el archivo como documento
        await conn.sendMessage(m.chat, { 
            document: { url: audio }, 
            mimetype: 'audio/mpeg', 
            fileName: `${title}.mp3`, 
            caption: `🎵 *Título:* ${title}\n👤 *Autor:* ${author}\n⏳ *Duración:* ${duration}\n👀 *Vistas:* ${views}`,
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `Hubo un error al procesar la descarga.`, m).then(_ => m.react('✖️'));
    }
};

handler.help = ['Docaudio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Docaudio|docaudio)/;

handler.command = new RegExp;

export default handler; */

import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.reply(m.chat, `*_Uso incorrecto_*\n\n*Ejemplo:*\n${usedPrefix + command} https://youtu.be/ejemplo`, m)
  let youtubeLink = args[0]
  console.log('URL to fetch:', youtubeLink)
  await conn.reply(m.chat, '💙 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙉𝘿𝙊', m)  
  try {
    if (typeof youtubeLink !== 'string' || !youtubeLink.startsWith('http')) {
      throw new Error('URL inválida proporcionada')
    }
    const fetchUrl = `https://rembotapi.vercel.app/api/yt?url=${encodeURIComponent(youtubeLink)}`
    console.log('Fetch URL:', fetchUrl)
    const response = await fetch(fetchUrl)
    const data = await response.json()
    if (!data.status) {
      return conn.reply(m.chat, `❌ _Error:_ ${data.message || 'No se encontró el video'}`, m)
    }
    const { title, audioUrl, thumbnail } = data.data
    const caption = ` *📌 Titulo:* ${title}`
    await conn.sendMessage(m.chat, {
      document: { url: audioUrl },
      mimetype: 'audio/mp3',
      fileName: `${title}.mp3`,
      caption: caption,
      thumbnail: await fetch(thumbnail.url).then(res => res.buffer())
    }, { quoted: m })
  } catch (error) {
    console.error('Error:', error)
    conn.reply(m.chat, `❌ _Error:_ Ocurrió un problema al procesar la solicitud`, m)
  }
}

handler.help = ['yt mp3 <url>']
handler.tags = ['dl']
handler.command = ['ytmp3doc', 'ytaudio']
handler.register = true

export default handler