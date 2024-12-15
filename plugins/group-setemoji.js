import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, isRowner }) => {
  let time = global.db.data.users[m.sender]?.lastmiming + 60000 || 0;
  if (new Date - time < 60000) {
    return conn.reply(m.chat, `⛄ Debes esperar ${msToTime(time - new Date())} para cambiar el emoji.`, m);
  }

  // Validar que el mensaje citado exista y tenga un archivo descargable
  if (!m.quoted || !m.quoted.download) {
    return m.reply('🌲 Debes responder a un mensaje con un archivo válido (imagen o emoji).');
  }

  try {
    const mime = m.quoted.mimetype || '';
    if (!mime.startsWith('image/')) {
      return m.reply('🌲 El archivo citado no es una imagen. Por favor, responde a un archivo de tipo imagen.');
    }

    const media = await m.quoted.download(); // Intentar descargar el archivo

    if (!media || !isEmojiValid(media)) {
      return m.reply('🌲 El archivo descargado no es válido. Asegúrate de responder a un archivo correcto.');
    }

    global.customEmoji = media; // Guardar el emoji personalizado
    global.db.data.users[m.sender].lastmiming = new Date().getTime(); // Actualizar el tiempo del usuario

    m.reply('❄️ El emoji fue actualizado correctamente.');
  } catch (error) {
    console.error(error);
    m.reply('✧ Hubo un error al intentar cambiar el emoji.');
  }
};

// Función para validar si el archivo es un emoji o imagen válido
const isEmojiValid = (buffer) => {
  return buffer.length > 0; // Verificar que el archivo no esté vacío
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