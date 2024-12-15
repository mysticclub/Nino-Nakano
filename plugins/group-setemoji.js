let handler = async (m, { conn, isRowner }) => {
  let time = global.db.data.users[m.sender]?.lastmiming + 60000 || 0;
  if (new Date - time < 60000) {
    return conn.reply(m.chat, `⛄ Debes esperar ${msToTime(time - new Date())} para cambiar el emoji.`, m);
  }

  // Validar si el mensaje citado tiene un emoji en texto
  if (!m.quoted || !m.quoted.text) {
    return m.reply('🌲 Debes responder a un mensaje que contenga un emoji válido.');
  }

  const emoji = m.quoted.text.trim();

  if (!isEmoji(emoji)) {
    return m.reply('🌲 El contenido citado no es un emoji válido. Por favor, responde a un mensaje que contenga solo un emoji.');
  }

  try {
    global.customEmoji = emoji; // Guardar el emoji personalizado
    global.db.data.users[m.sender].lastmiming = new Date().getTime(); // Actualizar el tiempo del usuario

    m.reply(`❄️ El emoji fue actualizado correctamente a: ${emoji}`);
  } catch (error) {
    console.error(error);
    m.reply('✧ Hubo un error al intentar cambiar el emoji.');
  }
};

// Función para validar si un texto es un emoji
const isEmoji = (text) => {
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
  return emojiRegex.test(text) && text.length <= 2; // Permitir solo un emoji
};

handler.help = ['setemoji'];
handler.tags = ['main'];
handler.command = ['setemoji', 'setemo'];
//handler.rowner = true;

export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ' m y ' + seconds + ' s ';
}