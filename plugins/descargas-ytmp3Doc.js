import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Por favor, proporciona una URL de YouTube';

  // Validar si es una URL válida de YouTube
  const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!ytRegex.test(text)) throw 'La URL proporcionada no es válida. Asegúrate de que sea un enlace de YouTube';

  // Obtener información del video usando la API de YouTube
  let videoId = text.split('v=')[1]?.split('&')[0] || text.split('/').pop();
  let apiURL = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  let response = await fetch(apiURL);
  if (!response.ok) throw 'No se pudo obtener información del video. Verifica la URL proporcionada.';
  
  let videoData = await response.json();
  
  // Construir datos para enviar
  let ytData = {
    url: text,
    title: videoData.title || 'Sin título',
    thumbnail: videoData.thumbnail_url || `https://img.youtube.com/vi/${videoId}/0.jpg`
  };

  // Descargar y enviar el archivo de audio como documento
  return conn.sendMessage(m.chat, {
    document: { 
      url: `https://kepolu-ytdl.hf.space/yt/dl?url=${ytData.url}&type=audio`
    },
    mimetype: "audio/mpeg",
    fileName: `${ytData.title} | YouTube Audio`,
    caption: "> Descargue el documento para escuchar la música\n\n> *Presione el botón Descargar arriba.*",
    jpegThumbnail: await conn.resize(ytData.thumbnail, 400, 400),
  }, { quoted: m });
};

handler.help = ['playyt'];
handler.command = ['ytmp3doc'];
handler.tags = ['downloader'];
export default handler;