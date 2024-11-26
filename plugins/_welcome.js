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

    // Mensaje de bienvenida
    if (m.messageStubType === 27) {
      const welcomeMessage = `🎉 *¡Bienvenido!* 🎉\n👤 @${who.split`@`[0]} se unió al grupo *${groupMetadata.subject}*. 🎊`;
      await conn.sendMessage(
        m.chat,
        { image: buffer, caption: welcomeMessage, mentions: [who] },
        { quoted: m }
      );
    }

    // Mensaje de despedida
    if (m.messageStubType === 28 || m.messageStubType === 32) {
      const byeMessage = `👋 *¡Adiós!* 👋\nEl usuario @${who.split`@`[0]} ha salido del grupo. 😢`;
      await conn.sendMessage(
        m.chat,
        { image: buffer, caption: byeMessage, mentions: [who] },
        { quoted: m }
      );
    }
  } catch (err) {
    console.error("Error al generar o enviar la tarjeta:", err);
  }
}
