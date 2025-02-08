/* 
- Play Botones By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import fetch from 'node-fetch';
import yts from 'yt-search';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args, usedPrefix }) => {

    if (!args[0]) return conn.reply(m.chat, '*\`Ingresa el nombre de lo que quieres buscar\`*', m);

    await m.react('🕓');
    try {
        let res = await search(args.join(" "));
        if (!res.length) return conn.reply(m.chat, '*\`No se encontraron resultados\`*', m);

        let video = res[0];
        let img = await (await fetch(video.image)).buffer();

        let txt = `> *YouTube Play 🍧.*\n\n`;
        txt += `${video.title}\n\n`;
        txt += `• *Duración:* ${secondString(video.duration.seconds)}\n`;
        txt += `• *Autor:* ${video.author.name || 'Desconocido'}\n`;
        txt += `• *Publicado:* ${eYear(video.ago)}\n`;
        txt += `• *Url:* _https://youtu.be/${video.videoId}_\n`;

        const sections = res.slice(1, 11).map((v, index) => ({
            title: `${index + 1}┃ ${v.title}`,
            rows: [
                {
                    header: '🎶 MP3',
                    title: `${v.author.name || 'Desconocido'}`,
                    description: `Duración: ${secondString(v.duration.seconds)}`, 
                    id: `.ytmp3 https://youtu.be/${video.videoId}`
                },
                {
                    header: "🎥 MP4",
                    title: `${v.author.name || 'Desconocido'}`,
                    description: `Duración: ${secondString(v.duration.seconds)}`, 
                    id: `.ytmp4 https://youtu.be/${video.videoId}`
                }
            ]
        }));

        await conn.sendMessage(m.chat, {
            image: img,
            caption: txt,
            footer: 'Presiona el botón para el tipo de descarga.',
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            },
            buttons: [
                {
                    buttonId: `.ytmp3 https://youtu.be/${video.videoId}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆' },
                    type: 1,
                },
                {
                    buttonId: `.ytmp4 https://youtu.be/${video.videoId}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆' },
                    type: 1,
                },
                {
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'ᯓᡣ𐭩 mᥲs rᥱsᥙᥣ𝗍ᥲძ᥆s',
                            sections: sections,
                        }),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*\`Error al buscar el video.\`*', m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];
export default handler;

async function search(query, options = {}) {
    let searchResults = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return searchResults.videos;
}

function secondString(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}

function eYear(txt) {
    if (txt.includes('year')) return txt.replace('year', 'año').replace('years', 'años');
    if (txt.includes('month')) return txt.replace('month', 'mes').replace('months', 'meses');
    if (txt.includes('day')) return txt.replace('day', 'día').replace('days', 'días');
    if (txt.includes('hour')) return txt.replace('hour', 'hora').replace('hours', 'horas');
    if (txt.includes('minute')) return txt.replace('minute', 'minuto').replace('minutes', 'minutos');
    return txt;
}















/* import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, '*\`Ingresa el nombre de lo que quieres buscar\`*', m);

  await m.react('🕓');
  try {
    let res = await search(args.join(" "));
    let video = res[0];
    let img = await (await fetch(video.image)).buffer();

    let txt = `> *YouTube Play 🍧.*\n\n`;
    txt += `${video.title}\n\n`;
    txt += `• *Duración:* ${secondString(video.duration.seconds)}\n`;
    txt += `• *Autor:* ${video.author.name || 'Desconocido'}\n`;
    txt += `• *Publicado:* ${eYear(video.ago)}\n`;
    txt += `• *Url:* _https://youtu.be/${video.videoId}_\n\n`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: txt,
      footer: 'Presiona el botón para el tipo de descarga.',
      buttons: [
        {
          buttonId: `.ytmp3 https://youtu.be/${video.videoId}`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆',
          },
        },
        {
          buttonId: `.ytmp4 https://youtu.be/${video.videoId}`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('✖️');
    conn.reply(m.chat, '*\`Error al buscar el video.\`*', m);
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}

function secondString(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}

function eYear(txt) {
  if (txt.includes('year')) return txt.replace('year', 'año').replace('years', 'años');
  if (txt.includes('month')) return txt.replace('month', 'mes').replace('months', 'meses');
  if (txt.includes('day')) return txt.replace('day', 'día').replace('days', 'días');
  if (txt.includes('hour')) return txt.replace('hour', 'hora').replace('hours', 'horas');
  if (txt.includes('minute')) return txt.replace('minute', 'minuto').replace('minutes', 'minutos');
  return txt;
} */