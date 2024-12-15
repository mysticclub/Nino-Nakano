import { createHash } from 'crypto';
import canvafy from 'canvafy';
import fs from 'fs/promises';

let handler = async function (m, { conn }) {
  try {
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

    let who = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.fromMe 
        ? conn.user.jid 
        : m.sender;

    let txt = `*\`N Ú M E R O - S E R I A L\`*\n\n🆔 *${sn}*\n`;

    let userAvatar = await conn.profilePictureUrl(who, 'image').catch(() => 
      'https://telegra.ph/file/24fa902ead26340f3df2c.png'
    );

    const security = await new canvafy.Security()
      .setAvatar(userAvatar) // Avatar del usuario
      .setBackground("image", "https://pomf2.lain.la/f/ou87g8sr.jpg") // Fondo
      .setCreatedTimestamp(Date.now()) // Fecha de creación
      .setSuspectTimestamp(31536000000) // Periodo de sospecha: 1 semana
      .setBorder("#f0f0f0") // Color del borde
      .setLocale("es") // Idioma/país
      .setAvatarBorder("#f0f0f0") // Borde del avatar
      .setOverlayOpacity(0.9) // Opacidad de la superposición
      .build();

    // Si security devuelve un buffer directamente
    if (Buffer.isBuffer(security)) {
      await conn.sendFile(m.chat, security, 'security.png', txt, m);
    } else {
      // Guardar en un archivo temporal
      const securityImagePath = './temp/security-image.png';
      await fs.writeFile(securityImagePath, security);

      await conn.sendFile(m.chat, securityImagePath, 'security.png', txt, m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ocurrió un error al generar el número de serie.', m);
  }
};

handler.help = ['sn'];
handler.tags = ['start'];
handler.command = ['nserie', 'sn', 'mysn']; 
handler.register = true;

export default handler;