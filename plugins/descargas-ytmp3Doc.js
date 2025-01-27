import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝚄𝙽 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙳𝙴 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼*\n\n*𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} luisitocomunica*`;
  }

  await m.reply(global.wait);

  // API key de BotCahX
  const apiKey = 'xenzpedo'; // Asegúrate de que la clave sea válida
  const url = `https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${encodeURIComponent(args[0])}&apikey=${apiKey}`;

  try {
    const res = await fetch(url); // Hacemos la solicitud a la API
    const data = await res.json(); // Convertimos la respuesta en formato JSON

    if (!data.result || data.result.length === 0) {
      return m.reply('*[❗] 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙸𝙽𝚅𝙰𝙻𝙸𝙳𝙾 𝙾 𝚂𝙸𝙽 𝙷𝙸𝚂𝚃𝙾𝚁𝙸𝙰𝚂*');
    }

    // Procesamos los resultados (historias)
    for (const item of data.result) {
      const mime = item.url.split('.').pop().toLowerCase(); // Obtener la extensión del archivo

      // Si es imagen
      if (['jpg', 'jpeg', 'png', 'webp', 'heic', 'tiff', 'bmp'].includes(mime)) {
        await conn.sendFile(m.chat, item.url, 'imagen.jpg', null, m).catch((err) => {
          console.log(err);
          return m.reply('*[❗] 𝙴𝚁𝙾𝚁 𝙲𝙾𝙽 𝙸𝙼𝙰𝙶𝙴𝙽*');
        });
      }

      // Si es video
      else if (mime === 'mp4') {
        await conn.sendFile(m.chat, item.url, 'video.mp4', null, m).catch((err) => {
          console.log(err);
          return m.reply('*[❗] 𝙴𝚁𝙾𝚁 𝙲𝙾𝙽 𝙻𝙰 𝙲𝙾𝙽𝚃𝙴𝙽𝙸𝙳𝙾 𝚅𝙸𝙳𝙴𝙾*');
        });
      }
    }

  } catch (error) {
    console.log(error);
    m.reply('*[❗] 𝙴𝚁𝙾𝚁 𝙲𝙾𝙽 𝙻𝙰 𝙰𝙿𝙸*');
  }
};

handler.help = ['igstory <username>'];
handler.tags = ['downloader'];
handler.command = ['igstory', 'ighistoria'];

export default handler;