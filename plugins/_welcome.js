import fetch from 'node-fetch';
import canvacard from "canvacard";
import fs from "fs";

export async function before(m, { conn, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  const chat = global.db.data.chats[m.chat];
  if (!chat.bienvenida) return true;

  const who = m.messageStubParameters[0];
  const avatarUrl = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
  const background = "https://pomf2.lain.la/f/ndkt6rw7.jpg"; // Fondo personalizado

  try {
    // Configuración de la tarjeta
    const welcomer = new canvacard.WelcomeLeave()
      .setAvatar(avatarUrl)
      .setBackground('IMAGE', background)
      .setTitulo("NUEVO INGRESO AL GRUPO", '#FFFFFF')
      .setSubtitulo("Por favor leer las reglas del grupo", '#FFFFFF')
      .setOpacityOverlay(0.5)
      .setColorCircle('#FFFFFF')
      .setColorOverlay('rgba(255, 255, 255, 0.5)');

    // Genera la tarjeta
    const buffer = await welcomer.build("Arial Bold");
    const filePath = './output/WelcomeCard.png';

    // Guarda la tarjeta en un archivo temporal
    if (!fs.existsSync('./output')) {
      fs.mkdirSync('./output', { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);

      if (chat.bienvenida && m.messageStubType == 27) {
    let welcome = `*⭒─ׄ─ׅ─ׄ─⭒ \`ʙɪᴇɴᴠᴇɴɪᴅᴀ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ᴡᴇʟᴄᴏᴍᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥  ${groupMetadata.subject}\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`
await conn.sendMini(m.chat, titulowm2, titu, welcome, filePath, filePath, canal, estilo)
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥   *ꜱ ᴀ ʏ ᴏ ɴ ᴀ ʀ ᴀ 👋*\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`
await conn.sendMini(m.chat, titulowm2, titu, bye, filePath, filePath, canal, estilo)
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥   *ꜱ ᴀ ʏ ᴏ ɴ ᴀ ʀ ᴀ 👋*\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`
await conn.sendMini(m.chat, titulowm2, titu, kick, filePath, filePath, canal, estilo)
}}