import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import { welcomeImage } from 'ultrax';  // Importa la librería ultrax

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Obtener la foto de perfil del usuario
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/Tdxwk.jpg'); // Imagen por defecto si no tiene foto

  // Definir fondos y otros parámetros
  const bgWelcome = 'https://imgur.com/okIR1iY.png'; // Fondo para bienvenida
  const bgBye = 'https://imgur.com/byeImage.png'; // Fondo para despedida
  const avatar = pp;  // Foto de perfil del usuario
  const titleWelcome = 'Bienvenido al grupo';
  const subtitleWelcome = `¡Esperamos que tengas un excelente día!`;
  const footerWelcome = `¡Nos alegra tenerte en el grupo!`;
  const titleBye = 'Adiós del grupo';
  const subtitleBye = `Te extrañaremos`;
  const footerBye = `¡Que tengas un buen día!`;
  const color = '#FFFFFF';
  const options = {
    font: 'sans-serif',
    attachmentName: `welcome-${m.messageStubParameters[0]}`,
    title_fontSize: 80,
    subtitle_fontSize: 50,
    footer_fontSize: 30
  };

  // Crear la imagen de bienvenida
  const welcomeCard = await welcomeImage(bgWelcome, avatar, titleWelcome, subtitleWelcome, footerWelcome, color, options);

  // Crear la imagen de despedida
  const byeCard = await welcomeImage(bgBye, avatar, titleBye, subtitleBye, footerBye, color, options);

  let chat = global.db.data.chats[m.chat];
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  // Enviar la imagen de bienvenida
  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    // Enviar la tarjeta de bienvenida
    await conn.sendMessage(m.chat, { image: welcomeCard, caption: bienvenida });
  }

  // Enviar la imagen de despedida
  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;

    // Enviar la tarjeta de despedida
    await conn.sendMessage(m.chat, { image: byeCard, caption: bye });
  }

  // Enviar la imagen de expulsión (kick)
  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Se expulsó* del grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;

    // Enviar la tarjeta de expulsión (usando la imagen de despedida)
    await conn.sendMessage(m.chat, { image: byeCard, caption: kick });
  }
}