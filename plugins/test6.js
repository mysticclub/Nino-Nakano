/* import canvacard from "canvacard";
import fs from "fs";

const handler = async (m, { conn }) => {
  const who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
      ? conn.user.jid
      : m.sender;

  // Obtén la URL del avatar del usuario o usa una predeterminada
  const img = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
  const background = "https://pomf2.lain.la/f/j4lz7ccu.jpg"; // Fondo personalizado

  // Verifica o crea el directorio de salida
  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output', { recursive: true });
  }

  // Configura la tarjeta
  const welcomer = new canvacard.WelcomeLeave()
    .setAvatar(img)
    .setBackground('IMAGE', background)
    .setTitulo("NUEVO INGRESO AL GRUPO", '#FFFFFF')
    .setSubtitulo("Por favor leer las reglas del grupo", '#FFFFFF')
    .setOpacityOverlay(1)
    .setColorCircle('#FFFFFF')
    .setColorOverlay('#ffffff')
    .setTypeOverlay('ROUNDED');

  // Genera la tarjeta
  try {
    const buffer = await welcomer.build("Arial"); // Cambia la fuente si es necesario
    const filePath = './output/GayCard.png';

    // Guarda la imagen localmente
    fs.writeFileSync(filePath, buffer);

    // Verifica que el archivo exista
    if (!fs.existsSync(filePath)) {
      throw new Error("La tarjeta no se generó correctamente.");
    }

    // Envía la imagen generada al chat
    await conn.sendFile(m.chat, filePath, 'GayCard.png', '*🏳️‍🌈 MIREN A ESTE GAY*', m);

    // Envía un audio adicional (opcional)
    const vn = './src/mp3/gay2.mp3';
    await conn.sendMessage(m.chat, { audio: { url: vn }, fileName: `gay2.mp3`, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
  } catch (err) {
    console.error("Error al generar la tarjeta:", err);
    await conn.sendMessage(m.chat, { text: "Ocurrió un error al generar la tarjeta." }, { quoted: m });
  }
};

handler.help = ['gay'];
handler.tags = ['maker'];
handler.command = /^(gay)$/i;

export default handler; */

import canvacard from "canvacard";
import fs from "fs";

const handler = async (m, { conn }) => {
  const who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
      ? conn.user.jid
      : m.sender;

  // Obtén la URL del avatar del usuario o usa una predeterminada
  const img = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
  const background = "https://pomf2.lain.la/f/j4lz7ccu.jpg"; // Fondo personalizado

  // Verifica o crea el directorio de salida
  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output', { recursive: true });
  }

  // Configura la tarjeta
  const welcomer = new canvacard.WelcomeLeave()
    .setAvatar(img)
    .setBackground('IMAGE', background)
    .setTitulo("NUEVO INGRESO AL GRUPO", '#FFFFFF')
    .setSubtitulo("Por favor leer las reglas del grupo", '#FFFFFF')
    .setOpacityOverlay(0.5) // Ajusta la transparencia del overlay
    .setColorCircle('#FFFFFF')
    .setColorOverlay('rgba(255, 255, 255, 0.5)') // Overlay blanco semitransparente
    .setTypeOverlay('GRADIENT'); // Configura el tipo de overlay como degradado (si lo soporta)

  // Genera la tarjeta
  try {
    const buffer = await welcomer.build("Arial"); // Cambia la fuente si es necesario
    const filePath = './output/WelcomeCard.png';

    // Guarda la imagen localmente
    fs.writeFileSync(filePath, buffer);

    // Verifica que el archivo exista
    if (!fs.existsSync(filePath)) {
      throw new Error("La tarjeta no se generó correctamente.");
    }

    // Envía la imagen generada al chat
    await conn.sendFile(m.chat, filePath, 'WelcomeCard.png', '*🎉 NUEVO INGRESO AL GRUPO 🎉*', m);

    // Envía un audio adicional (opcional)
    const vn = './src/mp3/welcome.mp3'; // Cambia el archivo de audio si es necesario
    await conn.sendMessage(m.chat, { audio: { url: vn }, fileName: `welcome.mp3`, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
  } catch (err) {
    console.error("Error al generar la tarjeta:", err);
    await conn.sendMessage(m.chat, { text: "Ocurrió un error al generar la tarjeta." }, { quoted: m });
  }
};

handler.help = ['welcome'];
handler.tags = ['maker'];
handler.command = /^(welcome|ingreso)$/i;

export default handler;

