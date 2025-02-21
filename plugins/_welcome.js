/* 
- Código Creado y modificado por Izumi-kzx
- Welcome con imagen Card
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import { WAMessageStubType } from '@whiskeysockets/baileys'; 
import fetch from 'node-fetch'; 
import { welcomeImage } from 'ultrax';

export async function before(m, { conn, participants, groupMetadata }) { if (!m.messageStubType || !m.isGroup) return !0;

let chat = global.db.data.chats[m.chat]; let wel = 'ＷＥＬＣＯＭＥ － ＵＳＥＲ'; let bye = 'ＳＡＹＯＮＡＲＡ － ＵＳＥＲ'; let web = 'https://genesis-support.vercel.app/'; let webb = 'https://izumikzx.vercel.app/'; let who = m.messageStubParameters[0] + '@s.whatsapp.net'; let user = global.db.data.users[who]; let userName = user ? user.name : await conn.getName(who);

const getUserAvatar = async () => { try { return await conn.profilePictureUrl(m.messageStubParameters[0], 'image'); } catch (err) { return 'https://i.ibb.co/cFzgdNw/file.jpg'; } };

const generateImage = async (title, description) => { const userAvatar = await getUserAvatar(); const bg = 'https://i.ibb.co/0cfqJLt/file.jpg'; const footer = Eres el ${participants.length}° miembro; const color = '#ffffff'; const options = { font: 'sans-serif', attachmentName: welcome-${who}, title_fontSize: 80, subtitle_fontSize: 50, footer_fontSize: 30 };

return await welcomeImage(bg, userAvatar, title, description, footer, color, options);

};

if (chat.welcome && m.messageStubType == 27) { let bienvenida = ❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split@[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!;

let img = await generateImage(
  '¡BIENVENIDO!',
  `¡Hola Bienvenido al grupo!`
);

await conn.sendAi(m.chat, 'ＷＥＬＣＯＭＥ － ＵＳＥＲ', dev, bienvenida, img, img, web, null);

}

if (chat.welcome && m.messageStubType == 28) { let bye = ❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split@[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Adiós...;

let img = await generateImage(
  '¡ADIOS!',
  `¡Hasta pronto Usuario!`
);

await conn.sendAi(m.chat, 'ＳＡＹＯＮＡＲＡ － ＵＳＥＲ', dev, bye, img, img, webb, null);

}

if (chat.welcome && m.messageStubType == 32) { let kick = ❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split@[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Adiós...;

let img = await generateImage(
  '¡ADIOS!',
  `¡Hasta pronto Usuario!`
);

await conn.sendAi(m.chat, 'ＳＡＹＯＮＡＲＡ － ＵＳＥＲ', dev, kick, img, img, web, null);

} }

