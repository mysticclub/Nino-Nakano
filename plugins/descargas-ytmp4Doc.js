import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text || !text.startsWith('https://pastebin.com/')) {
    return await conn.sendMessage(
      m.chat,
      { text: '❗ Por favor, proporciona una URL de Pastebin válida.' },
      { quoted: m }
    );
  }

  try {
    const { data } = await axios.get(text);
    const $ = cheerio.load(data);

    const title = $('div.info-top h1').text().trim() || 'Título no encontrado';
    const rawLink = $('a[href^="/raw"]').attr('href');
    const downloadLink = $('a[href^="/dl"]').attr('href');

    const content = [];
    $('.source.text ol li').each((i, el) => content.push($(el).text().trim()));

    const username = $('div.username a').text().trim() || 'Nombre de usuario no encontrado';
    const datePosted = $('div.date span').text().trim() || 'Fecha no encontrada';
    const viewCount = $('div.visits').text().trim() || 'Número de vistas no encontrado';

    const caption = `🍁 *Obtener Pastebin*\n\n` +
      `📌 *Título*: ${title}\n` +
      `👤 *Subido por*: ${username}\n` +
      `📅 *Fecha*: ${datePosted}\n` +
      `👀 *Vistas*: ${viewCount}\n\n` +
      `🔗 *Enlace Raw*: ${rawLink ? `https://pastebin.com${rawLink}` : 'No encontrado'}\n` +
      `📥 *Enlace de Descarga*: ${downloadLink ? `https://pastebin.com${downloadLink}` : 'No encontrado'}\n\n` +
      `📝 *Contenido*:\n${content.length ? content.join('\n') : 'No se encontró contenido de código.'}\n\n`;

    const documentContent = content.join('\n') || 'No hay contenido para guardar.';

    await conn.sendMessage(
      m.chat,
      {
        document: Buffer.from(documentContent, 'utf-8'),
        mimetype: 'application/octet-stream',
        fileName: 'nazandcode.js',
        caption,
      },
      { quoted: m }
    );

  } catch (error) {
    console.error('Error Skill Issue:', error);
    await conn.sendMessage(
      m.chat,
      { text: `❗ Ocurrió un error: ${error.message}` },
      { quoted: m }
    );
  }
};

handler.command = /^(pastebindl)$/i;
handler.tags = ['tools'];
handler.help = ['pastebindl <url>'];

export default handler;