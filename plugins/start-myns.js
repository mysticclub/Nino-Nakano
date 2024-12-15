import { createHash } from 'crypto';
import canvafy from 'canvafy'; // Asegúrate de importar la librería 'canvafy'

let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6); // Generar el número de serie (SN)

  // Crear el captcha con el número de serie
  const captcha = await new canvafy.Captcha()
    .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp") // Fondo personalizado
    .setCaptchaKey(canvafy.Util.captchaKey(15)) // Generador de clave de captcha
    .setBorder("#f0f0f0") // Color de borde
    .setOverlayOpacity(0.7) // Opacidad de la capa superpuesta
    .setBottomText("Número de serie solicitado") // Texto debajo del captcha
    .build(); // Construir el captcha

  // Ahora, agregamos el número de serie (sn) como parte del mensaje del captcha, no dentro de `setText()`

  // Enviar el número de serie al usuario
  await conn.reply(m.chat, `Tu número de serie es: ${sn}`, m);

  // Enviar el captcha generado como imagen adjunta
  await conn.sendMessage(m.chat, {
    caption: `Aquí está tu captcha con el SN: ${sn}`, // Mensaje de la imagen
    files: [{
      attachment: captcha,
      name: `captcha-${m.sender}.png`
    }]
  });
};

handler.help = ['sn']; // Comando para llamar al handler
handler.tags = ['start'];
handler.command = ['nserie', 'sn', 'mysn']; // Comandos disponibles
handler.register = true;

export default handler;