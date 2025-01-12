//Los que no dejan creditos se la comen 🗣🗣

/* 

*❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${text}`)
let json = await api.json()
let { title, author, image:img, id, views, likes, comments, duration, download } = json.data
let HS = `- *Titulo :* ${title}
- *Autor :* ${author}
- *Visitas :* ${views}
- *Likes :* ${likes}
- *Comentarios :* ${comments}

*[ INFO ARCHIVO AUDIO ]*

- *Tamaño :* ${download.size}
- *Calidad :* ${download.quality}`
await conn.sendFile(m.chat, img, 'HasumiBotFreeCodes.jpg', HS, m)
await await conn.sendMessage(m.chat, { video: { url: download.url }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `` }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = /^(ytmp4)$/i

export default handler






/* import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    await m.react('✖️');
    return conn.reply(m.chat, `☁️ Ingresa un enlace de YouTube.`, m, fake);
  }

  try {
    await m.react('🕒');

    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json || !json.data || !json.data.download || !json.data.download.url) {
      await m.react('❌');
      return conn.reply(
        m.chat,
        `❌ No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`,
        m
      );
    }

    let title = json.data.metadata.title || "Sin título";
    let dl_url = json.data.download.url;
    let fileName = json.data.filename || "video";

    await conn.sendMessage(
      m.chat,
      {
        video: { url: dl_url },
        caption: `🎥 *Título*: ${title}`,
        fileName: `${fileName}.mp4`,
        mimetype: "video/mp4",
      },
      { quoted: m }
    );

    await m.react('✅');

  } catch (error) {
    console.error(error);
    await m.react('❌');
    await conn.reply(
      m.chat,
      `❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.`,
      m
    );
  }
};

handler.help = ['ytmp4 *<url>*']
handler.tags = ['dl']
handler.command = ['ytmp4'];
export default handler; */