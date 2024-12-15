import { createHash } from 'crypto';
import canvafy from 'canvafy'; // Asegúrate de instalar esta librería con `npm install canvafy`

let handler = async function (m, { conn }) {
  try {
    // Generar número de serie
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

    // Obtener el JID del usuario
    let who = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.fromMe 
        ? conn.user.jid 
        : m.sender;

    // Obtener la foto de perfil del usuario
    let txt = `–  *N U M E R O   D E   S E R I E*\n\n✩ ${sn}\n`;

    let userAvatar = await conn.profilePictureUrl(who, 'image').catch(() => 
      'https://telegra.ph/file/24fa902ead26340f3df2c.png'
    ); // Imagen predeterminada si falla obtener el avatar

    // Crear la imagen con Canvafy
    const securityImage = await new canvafy.Security()
      .setAvatar(userAvatar) // Avatar del usuario
      .setBackground("image", "https://pomf2.lain.la/f/ou87g8sr.jpg") // Fondo
      .setCreatedTimestamp(Date.now()) // Fecha de creación
      .setSuspectTimestamp(Date.now() + 604800000) // Periodo de sospecha: 1 semana
      .setBorder("#f0f0f0") // Color del borde
      .setLocale("en") // Idioma
      .setAvatarBorder("#f0f0f0") // Borde del avatar
      .setOverlayOpacity(0.9) // Opacidad de la superposición
      .build();

    // Verificar que la imagen se genere correctamente
    if (!securityImage) {
      throw new Error("Error al generar la imagen con Canvafy");
    }

    // Enviar la imagen junto con el texto del número de serie
    await conn.sendFile(
      m.chat,
      securityImage.toBuffer(), // Asegúrate de que sea un buffer válido
      'security.png', 
      txt, 
      m
    );

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ocurrió un error al generar el número de serie.', m);
  }
};

// Configuración del handler
handler.help = ['sn'];
handler.tags = ['start'];
handler.command = ['nserie', 'sn', 'mysn']; 
handler.register = true;

export default handler;