import { createHash } from 'crypto';
import canvafy from 'canvafy'; // Asegúrate de importar el paquete 'canvafy'

let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

  // Crear el captcha con el número de serie
  const captcha = await new canvafy.Captcha()
    .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp")
    .setCaptchaKey(canvafy.Util.captchaKey(15)) // Usamos una clave de captcha generada
    .setText(sn) // Agregar el número de serie como texto del captcha
    .setBorder("#f0f0f0")
    .setOverlayOpacity(0.7)
    .setBottomText("Número de serie solicitado") // Mensaje de texto debajo del captcha
    .build();

  // Enviar el captcha generado al chat
  await conn.reply(m.chat, `Aquí está tu número de serie: ${sn}`, m);
  await conn.sendMessage(m.chat, {
    caption: `Aquí está tu captcha con el SN: ${sn}`, // Mensaje opcional adicional
    files: [{
      attachment: captcha,
      name: `captcha-${m.sender}.png`
    }]
  });
};

handler.help = ['sn'];
handler.tags = ['start'];
handler.command = ['nserie', 'sn', 'mysn'];
handler.register = true;

export default handler;

/* import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
await conn.reply(m.chat, `${sn}`, m, rcanal)
}
handler.help = ['sn']
handler.tags = ['start']
handler.command = ['nserie', 'sn', 'mysn'] 
handler.register = true
export default handler */
