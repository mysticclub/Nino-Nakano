import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖️');
  if (!text) throw `Proporcióname el enlace de la historia de Instagram para que pueda ayudarte. 📷`;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo'; // Manteniendo el API key original
    const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = response.data;

    if (result.status && result.result) {
      let processedUrls = new Set(); // Para evitar procesar URLs duplicadas

      const uniqueStories = Array.from(new Set(result.result.map(item => item.url))).map(url => {
        return result.result.find(item => item.url === url);
      });

      for (const item of uniqueStories) {
        const fileExtension = item.url.split('.').pop().toLowerCase(); 
        const isVideo = fileExtension === 'mp4';
        const isImage = 
          item.url.includes('jpg') || 
          item.url.includes('png') || 
          item.url.includes('jpeg') || 
          item.url.includes('webp') || 
          item.url.includes('heic') || 
          item.url.includes('tiff') || 
          item.url.includes('bmp'); 

        if (!processedUrls.has(item.url)) {
          processedUrls.add(item.url);

          if (isImage) {
            await conn.sendMessage(
              m.chat,
              { 
                image: { url: item.url },
                caption: '*✔️🍟 Downloader Instagram*' 
              },
              { quoted: m }
            );
          } else if (isVideo) {
            await conn.sendMessage(
              m.chat,
              { 
                video: { url: item.url },
                caption: '*✔️🍟 Downloader Instagram*' 
              },
              { quoted: m }
            );
          }
        }
      }

      await m.react('✅'); 
    } else {
      throw new Error('No se pudo obtener las historias, verifica el enlace.');
    }
  } catch (error) {
    await m.react('❌'); 
    console.error(error); 
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['igstory *<url>*']; 
handler.command = ['igstory'];
handler.tags = ['dl'];

export default handler;