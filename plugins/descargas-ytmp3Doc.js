import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖️');
  if (!text) throw `Proporcióname el enlace de la historia de Instagram para que pueda ayudarte. 📷`;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo'; // API key
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = await response.json();

    if (result.status && result.result) {
      // Filtrar URLs únicas
      const uniqueStories = Array.from(new Set(result.result.map(item => item.url))).map(url => {
        return result.result.find(item => item.url === url);
      });

      for (const item of uniqueStories) {
        try {
          const fileExtension = item.url.split('.').pop().toLowerCase(); // Extraemos la extensión
          const isVideo = fileExtension === 'mp4';
          const isImage = ['jpg', 'jpeg', 'png'].includes(fileExtension);

          if (!isVideo && !isImage) continue; // Ignorar formatos no compatibles

          const mediaType = isVideo ? 'video' : 'image';
          const mimetype = isVideo ? 'video/mp4' : `image/${fileExtension}`;

          // Descargar el archivo
          const res = await fetch(item.url);
          if (!res.ok) throw new Error(`No se pudo descargar el archivo: ${item.url}`);
          const buffer = await res.buffer();

          // Guardar el archivo temporalmente
          const filePath = `/tmp/${Date.now()}_${mediaType}.${fileExtension}`;
          await writeFile(filePath, buffer);

          // Enviar el archivo descargado
          await conn.sendMessage(
            m.chat,
            {
              [mediaType]: { url: filePath },
              mimetype,
              caption: isVideo ? '🎥 Video' : '🖼️ Imagen',
            },
            { quoted: m }
          );
        } catch (err) {
          // Manejo de errores individuales para cada archivo
          console.error(`Error procesando el archivo ${item.url}:`, err);
        }
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