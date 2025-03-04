/* 
- Código Creado y modificado por Izumi-kzx
- Welcome con imagen Card
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import canvafy from 'canvafy';

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

  const generateImage = async (title, description, backgroundImage) => {
    const userAvatar = await getUserAvatar();
    const img = await new canvafy.WelcomeLeave()
      .setAvatar(userAvatar)
      .setBackground('image', backgroundImage)
      .setTitle(title)
      .setDescription(description)
      .setBorder('#2a2e35')
      .setAvatarBorder('#2a2e35')
      .setOverlayOpacity(0.1)
      .build();

    return img;
  };

  let groupSize = participants.length;
  if (m.messageStubType === 27) {
    groupSize++;
  } else if (m.messageStubType === 28 || m.messageStubType === 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    let img = await generateImage(
      '¡BIENVENIDO/A!',
      `Disfruta de tu estadía. Ahora somos ${groupSize} miembros.`,
      'https://i.ibb.co/1fVJfvxk/file.jpg'
    );

    await conn.sendAi(m.chat, botname, dev, bienvenida, img, img, web, null);
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let img = await generateImage(
      '¡HASTA LUEGO!',
      `Nos vemos pronto. Ahora somos ${groupSize} miembros.`,
      'https://i.ibb.co/Kcf0xdrQ/file.jpg'
    );

    await conn.sendAi(m.chat, botname, dev, bye, img, img, webb, null);
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let img = await generateImage(
      '¡HASTA LUEGO!',
      `Nos vemos pronto. Ahora somos ${groupSize} miembros.`,
      'https://i.ibb.co/Kcf0xdrQ/file.jpg'
    );

    await conn.sendAi(m.chat, botname, dev, kick, img, img, web, null);
  }
}