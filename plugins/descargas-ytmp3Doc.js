import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  await m.react('✖️');
  if (!text) throw `Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵`;

  await m.react('🕓');

  try {
    const response = await fetch(`https://api.diioffc.web.id/api/download/ytmp3?url=${encodeURIComponent(text)}`);
    const result = await response.json();

    if (result.status && result.result?.download?.url) {
      const { 
        title, 
        description, 
        thumbnail, 
        url: videoUrl, 
        ago, 
        views, 
        duration, 
        author, 
        download 
      } = result.result;

      const caption = `🎵 *Título:* ${title}\n📌 *Canal:* ${author.name}\n🔗 *Canal URL:* ${author.url}\n⏳ *Duración:* ${duration.timestamp}\n👁️ *Vistas:* ${views.toLocaleString()}\n🕰️ *Publicado:* ${ago}\n🔗 *Video URL:* ${videoUrl}\n📝 *Descripción:* ${description}`;

      await conn.sendMessage(
        m.chat,
        { 
          image: { url: thumbnail },
          caption
        },
        { quoted: m }
      );

      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: download.url }, 
          mimetype: 'audio/mpeg',
          fileName: download.filename || 'audio.mp3'
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('No se pudo obtener el audio.');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.command = ['ytmp6'];

export default handler;