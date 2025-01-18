import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import canvacard from 'canvacard';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Obtener la foto de perfil del usuario
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/Tdxwk.jpg'); // Imagen por defecto si no tiene foto

  // URL del fondo (la imagen que quieres usar)
  const background = "https://i.ibb.co/cXqTMQ8/file.jpg"; // Imagen de fondo deseada

  // Verifica que la URL del fondo sea válida
  if (!background || !background.startsWith('http')) {
    console.error('La URL del fondo no es válida:', background);
    return;
  }

  // Convertir la URL de fondo a un Buffer si es necesario
  let backgroundImage;
  try {
    const response = await fetch(background);
    backgroundImage = await response.buffer();
  } catch (error) {
    console.error('Error al obtener la imagen de fondo:', error);
    return;
  }

  // Crear tarjeta de bienvenida
  const welcomer = new canvacard.WelcomeLeave()
    .setAvatar(pp)  // Usar la foto de perfil obtenida
    .setBackground(backgroundImage)  // Usar la imagen de fondo en Buffer
    .setTitulo("Bienvenido al grupo", '#FFFFFF')
    .setSubtitulo("¡Esperamos que tengas un excelente día!", '#FFFFFF')
    .setOpacityOverlay(1)
    .setColorCircle('#FFFFFF')
    .setColorOverlay('#5865F2')
    .setTypeOverlay('ROUNDED');

  const welcomeCard = await welcomer.build("Cascadia Code PL, Noto Color Emoji");

  // Crear tarjeta de despedida (se usará también para expulsión)
  const byeCard = new canvacard.WelcomeLeave()
    .setAvatar(pp)  // Usar la foto de perfil obtenida
    .setBackground(backgroundImage)  // Usar la imagen de fondo en Buffer
    .setTitulo("Adiós del grupo", '#FFFFFF')
    .setSubtitulo("¡Nos vemos pronto! ¡Que tengas un buen día!", '#FFFFFF')
    .setOpacityOverlay(1)
    .setColorCircle('#FFFFFF')
    .setColorOverlay('#5865F2')
    .setTypeOverlay('ROUNDED');

  const byeImage = await byeCard.build("Cascadia Code PL, Noto Color Emoji");

  let chat = global.db.data.chats[m.chat];
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    // Enviar la tarjeta de bienvenida
    await conn.sendMessage(m.chat, { image: welcomeCard, caption: bienvenida });
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;

    // Enviar la tarjeta de despedida
    await conn.sendMessage(m.chat, { image: byeImage, caption: bye });
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Se expulsó* del grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;

    // Enviar la tarjeta de expulsión (usando la misma imagen de despedida)
    await conn.sendMessage(m.chat, { image: byeImage, caption: kick });
  }
}