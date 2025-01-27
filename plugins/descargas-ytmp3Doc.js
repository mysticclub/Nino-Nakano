import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝚄𝙽 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙳𝙴 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼*\n\n*𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} luisitocomunica*`;

  await m.reply(global.wait);

  // API Key de BotCahX
  const apiKey = 'xenzpedo'; // Reemplaza con tu clave de API
  const url = `https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${encodeURIComponent(args[0])}&apikey=${apiKey}`;

  try {
    const res = await fetch(url); // Realizamos la solicitud GET
    const data = await res.json(); // Parseamos la respuesta en formato JSON

    const anuku = data.result; // Obtenemos las historias

    // Verificamos si la respuesta contiene historias
    if (!anuku || anuku.length === 0) {
      return m.reply('*[❗] 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙸𝙽𝚅𝙰𝙻𝙸𝙳𝙾 𝙾 𝚂𝙸𝙽 𝙷𝙸𝚂𝚃𝙾𝚁𝙸𝙰𝚂*');
    }

    // Enviar cada archivo (imagen o video)
    for (const i of anuku) {
      const mime = i.url.split('.').pop().toLowerCase(); // Obtenemos la extensión del archivo
      if (['jpg', 'jpeg', 'png', 'webp', 'heic', 'tiff', 'bmp'].includes(mime)) { // Si es imagen
        await conn.sendFile(m.chat, i.url, 'error.jpg', null, m).catch(() => {
          return m.reply('*[❗] 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙸𝙽𝚅𝙰𝙻𝙸𝙳𝙾 𝙾 𝚂𝙸𝙽 𝙷𝙸𝚂𝚃𝙾𝚁𝙸𝙰𝚂*');
        });
      } else if (mime === 'mp4') { // Si es video
        await conn.sendFile(m.chat, i.url, 'error.mp4', null, m).catch(() => {
          return m.reply('*[❗] 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙸𝙽𝚅𝙰𝙻𝙸𝙳𝙾 𝙾 𝚂𝙸𝙽 𝙷𝙸𝚂𝚃𝙾𝚁𝙸𝙰𝚂*');
        });
      }
    }
  } catch (error) {
    console.error(error);
    m.reply('*[❗] 𝙴𝚁𝙾𝚁 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙽𝙾 𝙲𝙾𝙽 𝙻𝙰 𝙰𝙿𝙸*');
  }
};

handler.help = ['igstory <username>'];
handler.tags = ['downloader'];
handler.command = ['igstory', 'ighistoria'];

export default handler;