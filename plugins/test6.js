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
    .setOpacityOverlay(0.5) // Ajusta la transparencia del overlay
    .setColorCircle('#FFFFFF')
    .setColorOverlay('rgba(255, 255, 255, 0.5)'); // Overlay blanco semitransparente

  // Genera la tarjeta
  try {
    const buffer = await welcomer.build("Arial Bold"); // Cambia la fuente si es necesario
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

export default handler; */

import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

const handler = async (m, { conn }) => {
  const who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
      ? conn.user.jid
      : m.sender;

  // Obtén la URL del avatar del usuario o usa una predeterminada
  const img = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
  const background = "https://pomf2.lain.la/f/j4lz7ccu.jpg"; // Fondo personalizado

  // Crea el canvas y su contexto
  const canvas = createCanvas(800, 600); // Ajusta el tamaño según necesites
  const ctx = canvas.getContext('2d');

  // Cargar el fondo
  const bgImage = await loadImage(background);
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // Cargar el avatar
  const avatar = await loadImage(img);
  const avatarX = 50; // Ajusta la posición del avatar
  const avatarY = 50;
  const avatarSize = 100; // Tamaño del avatar
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);

  // Establece el color del texto y la fuente para el título
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '40px Arial'; // Título con Arial Regular (puedes cambiar a Arial Bold)
  ctx.textAlign = 'center';
  ctx.fillText("NUEVO INGRESO AL GRUPO", canvas.width / 2, 180); // Posición del título

  // Establece el color del texto y la fuente para el subtítulo
  ctx.font = '30px Arial'; // Subtítulo con Arial Regular
  ctx.fillText("Por favor leer las reglas del grupo", canvas.width / 2, 250); // Posición del subtítulo

  // Guarda la imagen generada
  const filePath = './output/WelcomeCard.png';
  const buffer = canvas.toBuffer('image/png');
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
};

handler.help = ['welcome'];
handler.tags = ['maker'];
handler.command = /^(welcome|ingreso)$/i;

export default handler;


