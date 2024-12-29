import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, '*\`Ingresa el nombre de lo que quieres buscar\`*', m);
  
  await m.react('🕓');
  try {
    let res = await search(args.join(" "));
    let video = res[0]; // Usamos el primer resultado
    let img = await (await fetch(video.image)).buffer();

    let txt = `*\`【Y O U T U B E - P L A Y】\`*\n\n`;
    txt += `• *\`Título:\`* ${video.title}\n`;
    txt += `• *\`Duración:\`* ${secondString(video.duration.seconds)}\n`;
    txt += `• *\`Publicado:\`* ${eYear(video.ago)}\n`;
    txt += `• *\`Canal:\`* ${video.author.name || 'Desconocido'}\n`;
    txt += `• *\`Url:\`* _https://youtu.be/${video.videoId}_\n\n`;
    txt += `Selecciona una opción:\n`;

    // Enviar mensaje con botones
conn.sendMessage(m.chat, { text: txt, caption: "1234", footer: 'Selecciona una opción', buttons: [
  {
    buttonId: "A", 
    buttonText: { 
      displayText: 'Audio' 
    }
  }, {
    buttonId: "V", 
    buttonText: {
      displayText: "Video"
    }
  }
],
  image: img,
  viewOnce: true,
  headerType: 1,
}, { quoted: m });




 /*   await conn.sendMessage(m.chat, {
      text: txt,
      footer: 'Selecciona una opción',
      buttons: [
        {
          buttonId: `.video ${video.url}`,
          buttonText: { displayText: '🎥 Video' },
        },
        {
          buttonId: `.audio ${video.url}`,
          buttonText: { displayText: '🎵 Audio' },
        },
      ],
      image: img,
      headerType: 4, // Mensaje con imagen
    }, { quoted: m }); */

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

// Funciones auxiliares
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
}