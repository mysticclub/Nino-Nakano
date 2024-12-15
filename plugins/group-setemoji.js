import fs from 'fs';  
import path from 'path';  

let handler = async (m, { conn, isRowner }) => {
  let time = global.db.data.users[m.sender].lastmiming + 60000;
  if (new Date - global.db.data.users[m.sender].lastmiming < 60000) {
    return conn.reply(m.chat, `⛄ Debes esperar ${msToTime(time - new Date())} para cambiar el emoji.`, m);
  }

  try {
    const media = await m.quoted.download();

    if (!isEmojiValid(media)) {
      return m.reply('🌲 El archivo enviado no es un emoji válido.');
    }
    global.customEmoji = media; // Aquí almacenamos el emoji personalizado

    m.reply('❄️ El emoji fue actualizado correctamente.');

  } catch (error) {
    console.error(error);
    m.reply('✧ Hubo un error al intentar cambiar el emoji.');
  }
};

const isEmojiValid = (buffer) => {
  // Aquí puedes implementar validaciones específicas si los emojis están en formato imagen
  return buffer.length > 0; // Solo verificamos que el archivo no esté vacío
};

handler.help = ['setemoji'];  
handler.tags = ['main'];    
handler.command = ['setemoji', 'setemo'];  
//handler.rowner = true

export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return minutes + ' m y ' + seconds + ' s ';
}