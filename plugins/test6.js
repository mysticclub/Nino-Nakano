import canvacard from "canvacard";
import fs from "fs";

  // Obtén la URL del avatar del usuario o usa una predeterminada
  const img = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
  const background = "https://pomf2.lain.la/f/ndkt6rw7.jpg"; // Fondo personalizado

  // Verifica o crea el directorio de salida
  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output', { recursive: true });
  }

  // Configura la tarjeta
  const welcomer = new canvacard.WelcomeLeave()
    .setAvatar(img)
    .setBackground('IMAGE', background)
    .setTitulo("NUEVO INGRESO", '#FFFFFF')
    .setSubtitulo("Por favor leer las reglas del grupo", '#FFFFFF')
    .setOpacityOverlay(0.5) // Ajusta la transparencia del overlay
    .setColorCircle('#FFFFFF')
    .setColorOverlay('rgba(255, 255, 255, 0.5)'); // Overlay blanco semitransparente

  // Genera la tarjeta
  try {
    const buffer = await welcomer.build("Arial Bold"); // Cambia la fuente si es necesario
    const filePath = './output/WelcomeCard.png';

    // Guarda la imagen localmente
    fs.writeFileSync(filePath, buffer);

    // Verifica que el archivo exista
    if (!fs.existsSync(filePath)) {
      throw new Error("La tarjeta no se generó correctamente.");
    }

    // Envía la imagen generada al chat
    await conn.sendFile(m.chat, filePath, 'WelcomeCard.png', '*@${m.sender.split`@`[0]} 🐕 BIENVENIDO  🐕*', m);
  } catch (err) {
    console.error("Error al generar la tarjeta:", err);
  }
};

handler.help = ['welcome'];
handler.tags = ['maker'];
handler.command = /^(welcome|ingreso)$/i;

export default handler;

/* import canvafy from "canvafy";
import fs from "fs";

const handler = async (m, { conn }) => {
  const who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
      ? conn.user.jid
      : m.sender;

  // Obtén la URL del avatar del usuario o usa una predeterminada
  const img = await conn.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");

  // Verifica o crea el directorio de salida
  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output', { recursive: true });
  }

  // Ruta de la imagen de fondo
  const background = "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0"; // Imagen local como fondo

  // Verifica que el archivo de fondo exista
  if (!fs.existsSync(background)) {
    return conn.sendMessage(m.chat, "❌ Error: La imagen de fondo no existe. Por favor, verifica el archivo.", m);
  }

  // Configura la tarjeta
  try {
    const welcomeCard = await new canvafy.WelcomeLeave()
      .setAvatar(img) // Avatar del usuario
      .setBackground("image", background) // Fondo desde un archivo local
      .setTitle("BIENVENIDO") // Título (menos de 20 caracteres)
      .setDescription("Lee las reglas del grupo.") // Descripción
      .setBorder("#2a2e35") // Borde de la tarjeta
      .setAvatarBorder("#2a2e35") // Borde del avatar
      .setOverlayOpacity(0.3) // Opacidad del overlay
      .build();

    const filePath = `./output/welcome-${who.split('@')[0]}.png`;

    // Guarda la tarjeta en un archivo local
    fs.writeFileSync(filePath, welcomeCard);

    // Verifica que el archivo exista
    if (!fs.existsSync(filePath)) {
      throw new Error("La tarjeta no se generó correctamente.");
    }

    // Envía la imagen generada al chat
    await conn.sendFile(m.chat, filePath, `welcome-${who.split('@')[0]}.png`, '*🐕 NUEVO INGRESO AL GRUPO 🐕*', m);
  } catch (err) {
    console.error("Error al generar la tarjeta:", err);
    await conn.sendMessage(m.chat, `❌ Error al generar la tarjeta de bienvenida.\nDetalles: ${err.message}`, m);
  }
};

handler.help = ['welcome'];
handler.tags = ['maker'];
handler.command = /^(welcome|ingreso)$/i;

export default handler; */
