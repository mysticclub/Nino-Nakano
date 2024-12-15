import { createHash } from 'crypto'
import canvafy from 'canvafy' // Asegúrate de instalar esta librería con `npm install canvafy`

let handler = async function (m, { conn }) {
  // Generar número de serie
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

  // Obtener el JID del usuario
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  // Obtener la foto de perfil del usuario
  let userAvatar = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'); // Imagen predeterminada

  // Crear la imagen con Canvafy según tus especificaciones
  const securityImage = await new canvafy.Security()
    .setAvatar(userAvatar) // Avatar del usuario
    .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp") // Fondo
    .setCreatedTimestamp(Date.now()) // Fecha de creación
    .setSuspectTimestamp(604800000) // Periodo de sospecha: 1 semana (en milisegundos)
    .setBorder("#f0f0f0") // Color del borde
    .setLocale("en") // Idioma/país
    .setAvatarBorder("#f0f0f0") // Borde del avatar
    .setOverlayOpacity(0.9) // Opacidad de la superposición
    .build();

  // Enviar la imagen junto con el texto del número de serie
  await conn.sendMessage(m.chat, { 
    text: `Número de serie: ${sn}`, 
    files: [{
      attachment: securityImage, // La imagen generada
      name: `security-${m.sender}.png`
    }] 
  });
}

handler.help = ['sn']
handler.tags = ['start']
handler.command = ['nserie', 'sn', 'mysn'] 
handler.register = true

export default handler;