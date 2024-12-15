import { createHash } from 'crypto';
import canvafy from 'canvafy';
import fs from 'fs/promises';
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'; // Import necesario

let handler = async function (m, { conn }) {
  try {
    // Generar número de serie
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

    // Obtener el usuario
    let who = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.fromMe 
        ? conn.user.jid 
        : m.sender;

    // Texto del mensaje
    let txt = `–  *N U M E R O   D E   S E R I E*\n\n✩ ${sn}\n`;

    // Obtener la foto de perfil
    let userAvatar = await conn.profilePictureUrl(who, 'image').catch(() => 
      'https://telegra.ph/file/24fa902ead26340f3df2c.png'
    );

    // Generar la imagen con Canvafy
    const security = await new canvafy.Security()
      .setAvatar(userAvatar) // Avatar del usuario
      .setBackground("image", "https://pomf2.lain.la/f/ou87g8sr.jpg") // Fondo
      .setCreatedTimestamp(Date.now()) // Fecha de creación
      .setSuspectTimestamp(31536000000) // Periodo de sospecha: 1 año
      .setBorder("#f0f0f0") // Color del borde
      .setLocale("es") // Idioma/país
      .setAvatarBorder("#f0f0f0") // Borde del avatar
      .setOverlayOpacity(0.9) // Opacidad de la superposición
      .build();

    // Enviar la imagen generada
    if (Buffer.isBuffer(security)) {
      await conn.sendFile(m.chat, security, 'security.png', txt, m);
    } else {
      const securityImagePath = './temp/security-image.png';
      await fs.writeFile(securityImagePath, security);
      await conn.sendFile(m.chat, securityImagePath, 'security.png', txt, m);
    }

    // Texto del botón interactivo
    let textcaption = "`N U M E R O - S E R I A L`";
    let txtbutton = "Copiar Número De Serie";
    let txtcopy = sn;

    // Crear el mensaje con botón de copiar
    let buttonMessage = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: { text: textcaption },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "cta_copy",
                  buttonParamsJson: JSON.stringify({
                    display_text: `${txtbutton}`,
                    copy_code: `${txtcopy}`
                  })
                }
              ]
            }
          })
        }
      }
    }, { quoted: m });

    // Enviar el mensaje con el botón
    await conn.relayMessage(m.chat, buttonMessage.message, {});
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







/* import { createHash } from 'crypto';
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

export default handler; */