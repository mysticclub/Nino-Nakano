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

    let txt = `–  *N U M E R O   D E   S E R I E*\n\n✩ ${sn}\n`;

    let userAvatar = await conn.profilePictureUrl(who, 'image').catch(() => 
      'https://telegra.ph/file/24fa902ead26340f3df2c.png'
    );

    const securityImage = await new canvafy.Security()
      .setAvatar(userAvatar)
      .setBackground("image", "https://pomf2.lain.la/f/ou87g8sr.jpg")
      .build();

    // Si build() retorna un buffer directamente
    if (Buffer.isBuffer(securityImage)) {
      await conn.sendFile(m.chat, securityImage, 'security.png', txt, m);
    } else {
      // Alternativa: guardar en un archivo temporal si no es un buffer
      const securityImagePath = './temp/security-image.png';
      await fs.writeFile(securityImagePath, securityImage);

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