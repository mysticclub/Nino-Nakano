import { createHash } from 'crypto';
import canvafy from 'canvafy'; // Asegúrate de importar la librería 'canvafy'

let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6); // Generar el número de serie (SN)

  try {
    // Crear el captcha con el número de serie
    const captcha = await new canvafy.Captcha()
      .setImage("https://pomf2.lain.la/f/k6uc5mt.jpg") // Establecer imagen de fondo
      .setCaptchaKey(canvafy.Util.captchaKey(15)) // Clave de captcha
      .build(); // Construir el captcha

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
  } catch (error) {
    console.error("Error al generar el captcha:", error);
    await conn.reply(m.chat, "Hubo un error al generar el captcha, por favor intenta nuevamente.", m);
  }
};

handler.help = ['sn']; // Comando para llamar al handler
handler.tags = ['start'];
handler.command = ['nserie', 'sn', 'mysn']; // Comandos disponibles
handler.register = true;

export default handler;