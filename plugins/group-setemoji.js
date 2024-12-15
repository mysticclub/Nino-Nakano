/* 
- Setemoji By Angel-OFC 
- edita el tagall con tu emoji favorito 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
let handler = async (m, { conn, text, isRowner }) => {

  if (!text) {
    return m.reply('🤍 Debes proporcionar un emoji válido después del comando. Ejemplo: `.setemoji 💖`');
  }

  const emoji = text.trim();

  if (!isEmoji(emoji)) {
    return m.reply('🤍 El texto proporcionado no es un emoji válido. Asegúrate de que sea un emoji real.');
  }

  try {
    global.db.data.chats[m.chat].customEmoji = emoji;

    m.reply(`🤍 El emoji del grupo ha sido actualizado correctamente a: ${emoji}`);
  } catch (error) {
    console.error(error);
    m.reply('🤍 Hubo un error al intentar cambiar el emoji.');
  }
};

const isEmoji = (text) => {
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
  return emojiRegex.test(text) && text.length <= 2; // Permitir solo un emoji
};

handler.help = ['setemoji <emoji>'];
handler.tags = ['main'];
handler.command = ['setemoji', 'setemo'];
handler.admin = true;
handler.group = true;

export default handler;


/* let handler = async (m, { conn, isRowner }) => {

  if (!m.quoted || !m.quoted.text) {
    return m.reply('🤍 Debes responder a un mensaje que contenga un emoji válido.');
  }

  const emoji = m.quoted.text.trim();

  if (!isEmoji(emoji)) {
    return m.reply('🤍 El contenido citado no es un emoji válido. Por favor, responde a un mensaje que contenga solo un emoji.');
  }

  try {
    global.db.data.chats[m.chat].customEmoji = emoji;

    m.reply(`🤍 El emoji del grupo ha sido actualizado correctamente a: ${emoji}`);
  } catch (error) {
    console.error(error);
    m.reply('🤍 Hubo un error al intentar cambiar el emoji.');
  }
};

const isEmoji = (text) => {
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
  return emojiRegex.test(text) && text.length <= 2;
};

handler.help = ['setemoji'];
handler.tags = ['main'];
handler.command = ['setemoji', 'setemo'];
handler.admin = true;
handler.group = true;

export default handler; */