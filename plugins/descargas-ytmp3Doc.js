import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖️');
  if (!text) throw `Proporcióname el enlace de la historia de Instagram para que pueda ayudarte. 📷`;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo'; // Manteniendo el API key original
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = await response.json();

    if (result.status && result.result) {
      for (const item of result.result) {
        const isVideo = item.url.endsWith('.mp4');
        const mediaType = isVideo ? 'video' : 'image';
        const mimetype = isVideo ? 'video/mp4' : 'image/jpeg';

        await conn.sendMessage(
          m.chat,
          { 
            [mediaType]: { url: item.url },
            mimetype 
          },
          { quoted: m }
        );
      }

      await m.react('✅');
    } else {
      throw new Error('Error: Unable to fetch media');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['igstory *<url>*']; 
handler.command = ['igstory'];
handler.tags = ['dl'];

export default handler;