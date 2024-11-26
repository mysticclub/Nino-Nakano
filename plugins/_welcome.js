/* import {WAMessageStubType} from '@adiwajshing/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://pomf2.lain.la/f/b03w5p5.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let welcome = `*⭒─ׄ─ׅ─ׄ─⭒ \`ʙɪᴇɴᴠᴇɴɪᴅᴀ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ᴡᴇʟᴄᴏᴍᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥  ${groupMetadata.subject}\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`
await conn.sendMini(m.chat, titulowm2, titu, welcome, img, img, canal, estilo)
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥   *ꜱ ᴀ ʏ ᴏ ɴ ᴀ ʀ ᴀ 👋*\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`
await conn.sendMini(m.chat, titulowm2, titu, bye, img, img, canal, estilo)
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥   *ꜱ ᴀ ʏ ᴏ ɴ ᴀ ʀ ᴀ 👋*\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`
await conn.sendMini(m.chat, titulowm2, titu, kick, img, img, canal, estilo)
}} */

import { WAMessageStubType } from '@adiwajshing/baileys';
import canvafy from "canvafy";
import fs from "fs";
import fetch from "node-fetch";

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  const chat = global.db.data.chats[m.chat]; // Verifica si las bienvenidas/despedidas están activadas
  if (!chat.bienvenida) return true;

  const user = m.messageStubParameters[0]; // Usuario afectado
  const img = await conn.profilePictureUrl(user, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
  const groupName = groupMetadata.subject || "el grupo";

  const background = "./assets/background.jpg"; // Ruta local del fondo
  if (!fs.existsSync(background)) {
    console.error("Error: La imagen de fondo no existe.");
    return true;
  }

  let title, description;

  // Determina el tipo de acción: entrada, salida o expulsión
  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_PARTICIPANT_ADD:
      title = "BIENVENIDO";
      description = `¡Hola @${user.split('@')[0]}!\nLee las reglas de ${groupName}.`;
      break;

    case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
    case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
      title = "ADIÓS";
      description = `Adiós @${user.split('@')[0]}, esperamos verte de nuevo.`;
      break;

    default:
      return true;
  }

  try {
    // Genera la tarjeta de bienvenida/despedida
    const welcomeCard = await new canvafy.WelcomeLeave()
      .setAvatar(img) // Avatar del usuario
      .setBackground("image", background) // Fondo local
      .setTitle(title) // Título personalizado
      .setDescription(description) // Mensaje personalizado
      .setBorder("#2a2e35") // Borde
      .setAvatarBorder("#2a2e35") // Borde del avatar
      .setOverlayOpacity(0.3) // Opacidad del overlay
      .build();

    const filePath = `./output/welcome-${user.split('@')[0]}.png`;
    fs.writeFileSync(filePath, welcomeCard); // Guarda la tarjeta localmente

    // Envía la tarjeta al grupo
    await conn.sendFile(m.chat, filePath, `welcome-${user.split('@')[0]}.png`, description, null, {
      mentions: [user]
    });
  } catch (err) {
    console.error("Error al generar la tarjeta:", err);
    await conn.sendMessage(m.chat, `❌ Error al generar la tarjeta.\nDetalles: ${err.message}`, null);
  }
}
