// YOUTUBE DOWNLOAD MP4
// Fitur by nano gembul
// https://whatsapp.com/channel/0029VagvXerC1FuF4KH1yd1F
import axios from 'axios';

async function dansyaytdl(link) {
    try {
        const response = await axios.get('https://y2ts.us.kg/token');
        const token = response.data.token;
        const url = `https://y2ts.us.kg/youtube?url=${link}`;
        const headers = {
            'Authorization-Token': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Content-Type': 'application/json',
        };

        const videoResponse = await axios.get(url, { headers });

        if (videoResponse.data.status) {
            return videoResponse.data.result || '';
        } else {
            throw new Error('Status is false, no result found.');
        }
    } catch (error) {
        throw new Error(error.message || 'Error occurred while fetching video data.');
    }
}

async function handler(m, { text, conn, botname }) {
    if (!text) {
        return conn.sendMessage(m.chat, { text: ' [ Example ] :*\n> *.ytmp4 <link youtube>*' }, { quoted: m });
    }
    conn.sendMessage(m.chat, { text: 'tunggu sebentar ya...' }, { quoted: m });

    try {
        const data = await dansyaytdl(text);
        const hasilnya = data.mp4;
        const ytc = `*[ YOUTUBE DOWNLOADER ]*
🔥 *Title*: ${data.title || ''}
🔥 *Description*: ${data.description || ''}
🔥 *Views*: ${data.views || ''}
© ${botname}`;

        await conn.sendMessage(m.chat, { video: { url: hasilnya }, caption: ytc }, { quoted: m });
    } catch (e) {
        conn.sendMessage(m.chat, { text: '*Terjadi error :* ' + e.message }, { quoted: m });
    }
}

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = ['tes'];

export default handler;






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