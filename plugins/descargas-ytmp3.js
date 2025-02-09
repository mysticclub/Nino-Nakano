let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, "⚠️ *Por favor, ingresa un enlace de YouTube.*", m);

  let url = `https://ytcdn.project-rian.my.id/audio?url=${encodeURIComponent(text)}&bitrate=160`;

  try {
      await conn.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mpeg' }, { quoted: m });
  } catch (e) {
      conn.reply(m.chat, "❌ *Error al descargar el audio.*", m);
      console.error(e);
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = /^ytmp3$/i;
export default handler;
