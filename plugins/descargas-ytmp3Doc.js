import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖️');
  if (!text) throw `*Ej:* ${usedPrefix + command} https://youtube.com/watch?v=YgOAN8_KYEk`;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo';
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = await response.json();

    if (result.status && result.result && result.result.mp3) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result.result.mp3 }, 
          mimetype: 'audio/mpeg' 
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('Error: Unable to fetch audio');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'An unknown error occurred'}`);
  }
};

handler.help = ['ytmp3', 'yta']; 
handler.command = ['ytmp3v3', 'ytav3'];
handler.tags = ['downloader'];
handler.limit = true;

export default handler;