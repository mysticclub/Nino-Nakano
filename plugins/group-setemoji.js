let handler = async (m, { conn, isRowner }) => {

  if (!m.quoted || !m.quoted.text) {
    return m.reply('🌲 Debes responder a un mensaje que contenga un emoji válido.');
  }

  const emoji = m.quoted.text.trim();

  if (!isEmoji(emoji)) {
    return m.reply('🌲 El contenido citado no es un emoji válido. Por favor, responde a un mensaje que contenga solo un emoji.');
  }

  try {
    global.db.data.chats[m.chat].customEmoji = emoji;

    m.reply(`❄️ El emoji del grupo ha sido actualizado correctamente a: ${emoji}`);
  } catch (error) {
    console.error(error);
    m.reply('✧ Hubo un error al intentar cambiar el emoji.');
  }
};

// Función para validar si un texto es un emoji
const isEmoji = (text) => {
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
  return emojiRegex.test(text) && text.length <= 2;
};

handler.help = ['setemoji'];
handler.tags = ['main'];
handler.command = ['setemoji', 'setemo'];
//handler.rowner = true;

export default handler;