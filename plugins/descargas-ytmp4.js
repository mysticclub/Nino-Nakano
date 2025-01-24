import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖️');
  if (!text) throw `Proporcióname el enlace de YouTube para que pueda ayudarte. 🎥`;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo';
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = await response.json();

    if (result.status && result.result && result.result.mp4) {
      const { title, thumb, mp4, duration } = result.result;

      await conn.sendMessage(
        m.chat,
        {
          video: { url: mp4 },
          mimetype: 'video/mp4',
          caption: `*🍟 Título:* ${title}\n*🍟 Duración:* ${Math.floor(duration / 60)}:${duration % 60} minutos`,
          thumbnail: await (await fetch(thumb)).buffer(),
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('Error: No se pudo obtener el archivo MP4');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['ytmp4', 'ytv'];
handler.command = ['ytmp4v3', 'ytav3'];
handler.tags = ['downloader'];
handler.limit = true;

export default handler;




/* import axios from 'axios';

const handler = async (m, { text, conn }) => {
    if (!text) return m.reply('Proporcióname el enlace de YouTube para que pueda ayudarte. 🎥');

    try {
       await m.react('🕓');

        const response = await axios.get(`https://ytdl.axeel.my.id/api/download/video/?url=${text}`);

        if (!response.data || !response.data.metadata) {
            return m.reply('No se pudo obtener los datos del enlace de YouTube. Asegúrate de que el enlace sea correcto. 😕');
        }

        const { metadata, downloads } = response.data;

        const videoUrl = downloads.url;
        const thumbnailUrl = metadata.thumbnail.url;

        await conn.sendMessage(m.chat, {
            video: {
                url: videoUrl
            },
            caption: `*• Título*: ${metadata.title}`,
        }, { quoted: m });
        await m.react('✅');

    } catch (error) {
        await m.react('✖️');
    }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp4'];
export default handler; */




/* import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de youtube', m);

    try {
        await m.react('🕒');
        let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`);
        let json = await api.json();
        let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json;
        
        let HS = `*Titulo :* ${title}\nDuración : ${duration}\nCalidad : ${quality}p`;

        let durationInSeconds = 0;
        if (duration.includes("min")) {
            let minutes = parseFloat(duration.replace(" min", ""));
            durationInSeconds = Math.round(minutes * 60); 
        }

        if (durationInSeconds >= 2400) {
            await conn.sendMessage(m.chat, { 
                document: { url: downloadUrl }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`, 
                caption: HS 
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
                caption: HS 
            }, { quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖');
    }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp4'];

export default handler; */