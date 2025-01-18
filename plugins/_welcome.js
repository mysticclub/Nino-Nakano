import {WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import canvafy from 'canvafy';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Base de datos y variables
  let chat = global.db.data.chats[m.chat];
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName = user ? user.name : await conn.getName(who);

  // Generador de imágenes dinámicas
  const generateImage = async (title, description) => {
    const img = await new canvafy.WelcomeLeave()
      .setAvatar(`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`) // Avatar predeterminado
      .setBackground(
        'image',
        'https://i.ibb.co/0cfqJLt/file.jpg'
      )
      .setTitle(title)
      .setDescription(description)
      .setBorder('#2a2e35')
      .setAvatarBorder('#2a2e35')
      .setOverlayOpacity(0.3)
      .build();

    return img;
  };

  // Mensajes personalizados
  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    let img = await generateImage(
      '¡Bienvenido!',
      `Hola ${userName}, bienvenido al grupo *${groupMetadata.subject.trim()}*!`
    );

    await conn.sendAi(m.chat, packname, dev, bienvenida, img, img, canal, estilo);
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let img = await generateImage(
      '¡Adiós!',
      `El usuario ${userName} dejó el grupo *${groupMetadata.subject.trim()}*. ¡Hasta pronto!`
    );

    await conn.sendAi(m.chat, packname, dev, bye, img, img, canal, estilo);
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Fue expulsado* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let img = await generateImage(
      'Expulsado',
      `El usuario ${userName} fue expulsado del grupo *${groupMetadata.subject.trim()}*.`
    );

    await conn.sendAi(m.chat, packname, dev, kick, img, img, canal, estilo);
  }
}