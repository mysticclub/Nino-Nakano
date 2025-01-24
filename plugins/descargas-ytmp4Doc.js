import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Ejemplo:* ${usedPrefix + command} https://youtube.com/watch?v=YgOAN8_KYEk`;

  m.reply('⏳ *Procesando, por favor espera...*');

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
          caption: `*Título:* ${title}\n*Duración:* ${Math.floor(duration / 60)}:${duration % 60} minutos\n\n🎥 *Disfruta del video!*`,
          thumbnail: await (await fetch(thumb)).buffer(), // Opcional: usa la miniatura como preview
        },
        { quoted: m }
      );
    } else {
      throw new Error('Error: No se pudo obtener el archivo MP4');
    }
  } catch (error) {
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['ytmp4', 'ytv'];
handler.command = ['ytmp4v3', 'ytav3'];
handler.tags = ['downloader'];
handler.limit = true;

export default handler;