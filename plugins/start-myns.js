import { createHash } from 'crypto'
import canvafy from 'canvafy' // Asegúrate de que tienes esta librería instalada

let handler = async function (m, { conn, text, usedPrefix }) {
  // Verificar si 'text' es una cadena de texto antes de usar 'match'
  if (typeof text !== 'string') {
    text = ''; // Si no es una cadena, lo inicializamos como una cadena vacía
  }

  // Generación del número de serie
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

  // Obtener el JID del usuario (en caso de mencionar a alguien o usar el propio usuario)
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  // Obtener la foto de perfil del usuario
  let userAvatar = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'); // URL por defecto si no tiene foto

  // URL de la imagen de fondo
  let backgroundImage = 'https://www.w3.org/2008/site/images/logo-w3c-mobile-lg'; // Imagen pública

  // Crear la imagen de seguridad con canvafy
  const security = await new canvafy.Security()
    .setAvatar(userAvatar) // Usamos la URL del avatar
    .setBackground("image", backgroundImage) // Imagen de fondo pública
    .setBorder("#f0f0f0")
    .setLocale("en")
    .setAvatarBorder("#f0f0f0")
    .setOverlayOpacity(0.9)
    .build();

  // Enviar la imagen junto con el mensaje del número de serie
  await conn.reply(
    m.chat,
    {
      content: `Número de serie: ${sn}`,
      files: [{
        attachment: security,
        name: `security-${m.sender}.png`
      }]
    },
    m
  );
}

handler.help = ['sn']
handler.tags = ['start']
handler.command = ['nserie', 'sn', 'mysn'] 
handler.register = true

export default handler