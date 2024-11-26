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

export async function before(m, { conn, groupMetadata }) {
  // Validaciones iniciales
  if (!m.messageStubType || !m.isGroup) return true;

  const chat = global.db?.data?.chats[m.chat]; // Configuración del grupo
  if (!chat?.bienvenida) return true;

  const user = m.messageStubParameters[0]; // Usuario afectado
  const groupName = groupMetadata.subject || "el grupo";

  // Obtiene la imagen del avatar o un respaldo predeterminado
  const avatarUrl = await conn.profilePictureUrl(user, 'image').catch(() => "https://telegra.ph/file/24fa902ead26340f3df2c.png");

  // Define el fondo (puede ser URL o local)
  const backgroundUrl = "./assets/background.jpg";
  if (!fs.existsSync(backgroundUrl)) {
    console.error("Fondo no encontrado, usando predeterminado.");
  }

  let title, description;

  // Detecta el evento (entrada, salida, expulsión)
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
      return true; // Ignorar otros eventos
  }

  try {
    // Genera la tarjeta con Canvafy
    const welcomeCard = await new canvafy.WelcomeLeave()
      .setAvatar(avatarUrl) // Imagen del usuario
      .setBackground("image", backgroundUrl) // Fondo
      .setTitle(title) // Título
      .setDescription(description) // Descripción
      .setBorder("#2a2e35") // Borde
      .setAvatarBorder("#2a2e35") // Borde del avatar
      .setOverlayOpacity(0.3) // Opacidad del overlay
      .build();

    // Define la ruta de salida
    const filePath = `./output/welcome-${user.split('@')[0]}.png`;
    fs.writeFileSync(filePath, welcomeCard); // Guarda la imagen localmente

    // Envía la imagen al grupo
    await conn.sendFile(m.chat, filePath, `welcome-${user.split('@')[0]}.png`, description, null, {
      mentions: [user],
    });

    console.log(`Tarjeta generada y enviada: ${filePath}`);
  } catch (err) {
    console.error("Error al generar la tarjeta:", err);
    await conn.sendMessage(m.chat, `❌ Error al generar la tarjeta.\nDetalles: ${err.message}`, null);
  }
}
