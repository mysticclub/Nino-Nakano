/* 
- Código Creado y modificado por Izumi-kzx
- Welcome con imagen Card
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import canvacard from 'canvacard';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let chat = global.db.data.chats[m.chat];
  let web = 'https://genesis-support.vercel.app/';
  let webb = 'https://izumikzx.vercel.app/';
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName = user ? user.name : await conn.getName(who);

  const getUserAvatar = async () => {
    try {
      return await conn.profilePictureUrl(m.messageStubParameters[0], 'image');
    } catch (err) {
      return 'https://i.ibb.co/cFzgdNw/file.jpg';
    }
  };

  const generateImage = async (title, subtitle, backgroundColor) => {
    const userAvatar = await getUserAvatar();

    const welcomer = new canvacard.WelcomeLeave()
      .setAvatar(userAvatar)
      .setBackground('COLOR', backgroundColor)
      .setTitulo(title, '#FFFFFF')
      .setSubtitulo(subtitle, '#FFFFFF')
      .setOpacityOverlay(1)
      .setColorCircle('#FFFFFF')
      .setColorOverlay('#5865F2')
      .setTypeOverlay('ROUNDED');

    try {
      const data = await welcomer.build('Cascadia Code PL, Noto Color Emoji');
      return data;
    } catch (err) {
      console.error("Error creating welcome card:", err);
      return null;
    }
  };

  let groupSize = participants.length;
  if (m.messageStubType === 27) {
    groupSize++;
  } else if (m.messageStubType === 28 || m.messageStubType === 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    let imgData = await generateImage(
      '¡BIENVENIDO/A!',
      `Disfruta de tu estadía. Ahora somos ${groupSize} miembros.`,
      '#000000'
    );

    if (imgData) {
      await conn.sendMessage(m.chat, { image: imgData, caption: bienvenida });
    }
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let imgData = await generateImage(
      '¡HASTA LUEGO!',
      `Nos vemos pronto. Ahora somos ${groupSize} miembros.`,
      '#000000'
    );

    if (imgData) {
      await conn.sendMessage(m.chat, { image: imgData, caption: bye });
    }
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let imgData = await generateImage(
      '¡HASTA LUEGO!',
      `Nos vemos pronto. Ahora somos ${groupSize} miembros.`,
      '#000000'
    );

    if (imgData) {
      await conn.sendMessage(m.chat, { image: imgData, caption: kick });
    }
  }
}