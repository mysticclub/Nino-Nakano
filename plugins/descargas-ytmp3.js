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

// *[ ❀ YTMP3 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${text}`)
let json = await api.json()
let { title, author, image:img, id, views, likes, comments, duration, download } = json.data
let HS = `- *Titulo :* ${title}
- *Autor :* ${author}
- *Visitas :* ${Num(views)}
- *Likes :* ${Num(likes)}
- *Comentarios :* ${Num(comments)}

*[ INFO ARCHIVO AUDIO ]*

- *Tamaño :* ${download.size}
- *Calidad :* ${download.quality}`
await conn.sendFile(m.chat, img, 'HasumiBotFreeCodes.jpg', HS, m)
await conn.sendMessage(m.chat, { audio: { url: download.url }, mimetype: 'audio/mpeg' }, { quoted: m });
} catch (error) {
console.error(error)
}}

handler.help = ['ytmp3 *<url>*']
handler.tags = ['dl']
handler.command = /^(ytmp3)$/i

export default handler

function Num(number) {
if (number >= 1000 && number < 1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number >= 1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else if (number <= -1000 && number > -1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number <= -1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else {
return number.toString()
}}





/* import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Ingresa un enlace de YouTube.`, m, fake);
    }

    try {
        await m.react('🕒');

        let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`);
        let json = await api.json();

        if (!json || !json.result || !json.result.download || !json.result.download.url) {
            await m.react('❌');
            return conn.reply(
                m.chat,
                `《❌》No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`,
                m
            );
        }

        let title = json.result.metadata.title || "Sin título";
        let dl_url = json.result.download.url;

        await conn.sendMessage(
            m.chat,
            { 
                audio: { url: dl_url }, 
                fileName: `${title}.mp3`, 
                mimetype: 'audio/mp4' 
            },
            { quoted: m }
        );

        await m.react('✅');

    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(
            m.chat,
            `《❌》Ocurrió un error al intentar descargar el audio. Por favor, verifica el enlace e inténtalo nuevamente.`,
            m
        );
    }
};

handler.help = ['ytmp3 *<url>*']
handler.tags = ['dl']
handler.command = ['ytmp3', 'fgmp3', 'yta'];

export default handler; */