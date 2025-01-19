import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text || !text.startsWith('https://pastebin.com/')) {
    return await conn.sendMessage(
      m.chat,
      { text: '❗ Mohon berikan URL Pastebin yang valid.' },
      { quoted: m }
    );
  }

  try {
    const { data } = await axios.get(text);
    const $ = cheerio.load(data);

    const title = $('div.info-top h1').text().trim() || 'Judul tidak ditemukan';
    const rawLink = $('a[href^="/raw"]').attr('href');
    const downloadLink = $('a[href^="/dl"]').attr('href');

    const content = [];
    $('.source.text ol li').each((i, el) => content.push($(el).text().trim()));

    const username = $('div.username a').text().trim() || 'Username tidak ditemukan';
    const datePosted = $('div.date span').text().trim() || 'Tanggal tidak ditemukan';
    const viewCount = $('div.visits').text().trim() || 'Jumlah tampilan tidak ditemukan';

    const caption = `🍁 *Ambil Pastebin*\n\n` +
      `📌 *Judul*: ${title}\n` +
      `👤 *Uploader*: ${username}\n` +
      `📅 *Tanggal*: ${datePosted}\n` +
      `👀 *Tampilan*: ${viewCount}\n\n` +
      `🔗 *Link Raw*: ${rawLink ? `https://pastebin.com${rawLink}` : 'Tidak ditemukan'}\n` +
      `📥 *Link Unduh*: ${downloadLink ? `https://pastebin.com${downloadLink}` : 'Tidak ditemukan'}\n\n` +
      `📝 *Konten*:\n${content.length ? content.join('\n') : 'Tidak ada konten kode ditemukan.'}\n\n`;

    const documentContent = content.join('\n') || 'Tidak ada konten untuk disimpan.';

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
    console.error('Error Skill Isue:', error);
    await conn.sendMessage(
      m.chat,
      { text: `❗ Terjadi kesalahan: ${error.message}` },
      { quoted: m }
    );
  }
};

handler.command = /^(pastebindl)$/i;
handler.tags = ['tools'];
handler.help = ['pastebindl <url>'];

export default handler;