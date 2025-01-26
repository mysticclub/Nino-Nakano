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
      // Eliminamos duplicados basándonos en las URLs únicas
      const uniqueStories = Array.from(new Set(result.result.map(item => item.url))).map(url => {
        return result.result.find(item => item.url === url);
      });

      for (const item of uniqueStories) {
        const fileExtension = item.url.split('.').pop().toLowerCase(); // Extraemos la extensión
        const isVideo = fileExtension === 'mp4';
        const isImage = ['jpg', 'jpeg', 'png'].includes(fileExtension); // Verificamos extensiones válidas para imágenes

        if (!isVideo && !isImage) continue; // Ignorar formatos no compatibles

        const mediaType = isVideo ? 'video' : 'image';
        const mimetype = isVideo ? 'video/mp4' : `image/${fileExtension}`;

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
      throw new Error('Error: No se pudo obtener las historias');
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