import { WAMessageStubType } from '@adiwajshing/baileys';
import fetch from 'node-fetch';
import canvacard from "canvacard";
import fs from "fs";

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  const chat = global.db.data.chats[m.chat];
  if (!chat.bienvenida) return true;

  const who = m.messageStubParameters[0];
  const pp = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
  const background = "https://pomf2.lain.la/f/ndkt6rw7.jpg"; // Fondo personalizado

  // Verifica o crea el directorio de salida
  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output', { recursive: true });
  }

  // Configura la tarjeta
  const welcomer = new canvacard.WelcomeLeave()
    .setAvatar(pp)
    .setBackground('IMAGE', background)
    .setTitulo("NUEVO INGRESO AL GRUPO", '#FFFFFF')
    .setSubtitulo("Por favor leer las reglas del grupo", '#FFFFFF')
    .setOpacityOverlay(0.5)
    .setColorCircle('#FFFFFF')
    .setColorOverlay('rgba(255, 255, 255, 0.5)');

  try {
    // Genera la tarjeta
    const buffer = await welcomer.build("Arial Bold");
    const filePath = './output/WelcomeCard.png';

    // Guarda la imagen generada
    fs.writeFileSync(filePath, buffer);

    // Verifica que el archivo exista
    if (!fs.existsSync(filePath)) {
      throw new Error("La tarjeta no se generó correctamente.");
    }

    // Mensaje de bienvenida
    if (m.messageStubType == 27) {
      const welcome = `*⭒─ׄ─ׅ─ׄ─⭒ \`ʙɪᴇɴᴠᴇɴɪᴅᴀ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ᴡᴇʟᴄᴏᴍᴇ* :: @${who.split`@`[0]}\n┊:⁖֟⊱┈֟፝❥  ${groupMetadata.subject}\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
      await conn.sendMini(m.chat, "BIENVENIDO", "Nuevo miembro", welcome, filePath, filePath, "Canal", "Estilo");
    }

    // Mensaje de despedida
    if (m.messageStubType == 28 || m.messageStubType == 32) {
      const bye = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${who.split`@`[0]}\n┊:⁖֟⊱┈֟፝❥   *ꜱ ᴀ ʏ ᴏ ɴ ᴀ ʀ ᴀ 👋*\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
      await conn.sendMini(m.chat, "DESPEDIDA", "Miembro removido", bye, filePath, filePath, "Canal", "Estilo");
    }
  } catch (err) {
    console.error("Error al generar la tarjeta:", err);
  }
}
