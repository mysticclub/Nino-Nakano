import { WAMessageStubType } from '@adiwajshing/baileys'
import fetch from 'node-fetch'
import canvacard from "canvacard";
import fs from "fs";

// Función de bienvenida o despedida
export async function before(m, { conn, participants, groupMetadata }) {
  // Verificamos si es un mensaje de tipo grupo y si el tipo de mensaje es válido
  if (!m.messageStubType || !m.isGroup) return true;

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://pomf2.lain.la/f/b03w5p5.jpg');
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];
  let text = '';
  
  try {
    // Si se activa la bienvenida
    if (chat.bienvenida && m.messageStubType == 27) {
      text = `*⭒─ׄ─ׅ─ׄ─⭒ \`ʙɪᴇɴᴠᴇɴɪᴅᴀ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒ ⭒ ⭒ ⭒ ⭒ ⭒*\n┊:⁖֟⊱┈֟፝❥ *ᴡᴇʟᴄᴏᴍᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥  ${groupMetadata.subject}\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
      await conn.sendMini(m.chat, 'titulowm2', 'titu', text, img, img, 'canal', 'estilo');
    }

    // Si se activa la despedida
    if (chat.bienvenida && m.messageStubType == 28) {
      text = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒ ⭒ ⭒ ⭒ ⭒ ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥   *ꜱ ᴀ ʏ ᴏ ɴ ᴀ ʀ ᴀ 👋*\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
      await conn.sendMini(m.chat, 'titulowm2', 'titu', text, img, img, 'canal', 'estilo');
    }

    // Si el tipo de mensaje es expulsión
    if (chat.bienvenida && m.messageStubType == 32) {
      text = `*⭒─ׄ─ׅ─ׄ─⭒ \`ᴀ ᴅ ɪ ᴏ ꜱ\` ⭒─ׄ─ׅ─ׄ─⭒*\n\n╭── ︿︿︿︿︿ *⭒ ⭒ ⭒ ⭒ ⭒ ⭒*\n┊:⁖֟⊱┈֟፝❥ *ʙ ʏ ᴇ* :: @${m.messageStubParameters[0].split`@`[0]}\n┊:⁖֟⊱┈֟፝❥   *ꜱ ᴀ ʏ ᴏ ɴ ᴀ ʀ ᴀ 👋*\n╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
      await conn.sendMini(m.chat, 'titulowm2', 'titu', text, img, img, 'canal', 'estilo');
    }

    // Generamos la tarjeta de bienvenida usando canvacard
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    const avatarUrl = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2f.png");
    const background = "https://pomf2.lain.la/f/ndkt6rw7.jpg";  // Fondo personalizado

    // Verificamos que el directorio de salida exista
    if (!fs.existsSync('./output')) {
      fs.mkdirSync('./output', { recursive: true });
    }

    // Configuramos la tarjeta de bienvenida
    const welcomer = new canvacard.WelcomeLeave()
      .setAvatar(avatarUrl)
      .setBackground('IMAGE', background)
      .setTitulo("NUEVO INGRESO AL GRUPO", '#FFFFFF')
      .setSubtitulo("Por favor leer las reglas del grupo", '#FFFFFF')
      .setOpacityOverlay(0.5)  // Transparencia del overlay
      .setColorCircle('#FFFFFF')
      .setColorOverlay('rgba(255, 255, 255, 0.5)');  // Overlay semitransparente

    // Generamos la tarjeta
    const buffer = await welcomer.build("Arial Bold");  // Fuente personalizada
    const filePath = './output/WelcomeCard.png';

    // Guardamos la imagen generada
    fs.writeFileSync(filePath, buffer);

    // Verificamos que la imagen fue generada correctamente
    if (!fs.existsSync(filePath)) {
      throw new Error("La tarjeta no se generó correctamente.");
    }

    // Enviamos la imagen generada
    await conn.sendFile(m.chat, filePath, 'WelcomeCard.png', '*🐕 NUEVO INGRESO AL GRUPO 🐕*', m);

  } catch (err) {
    // Capturamos cualquier error y lo mostramos al usuario
    console.error("Error al procesar el mensaje:", err);
    await conn.sendMessage(m.chat, `¡Hubo un error al procesar el mensaje de bienvenida/despedida!\nError: ${err.message}`, m);
  }
}

