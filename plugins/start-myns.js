import { createHash } from 'crypto'
import canvafy from 'canvafy' // Asegúrate de que tienes esta librería instalada

let handler = async function (m, { conn, text, usedPrefix }) {
  // Generación del número de serie
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);
  
  // Crear la imagen de seguridad con canvafy
  const security = await new canvafy.Security()
    .setAvatar(m.sender)
    .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp")
    .setCreatedTimestamp(m.sender.createdTimestamp)
    .setSuspectTimestamp(604800000) // 1 semana en milisegundos
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