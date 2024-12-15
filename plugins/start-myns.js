import { createHash } from 'crypto';
import { createCanvas, loadImage } from 'canvas'; // Importa la librería canvas

let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6); // Generar el número de serie (SN)

  // Cargar la imagen de fondo
  const background = await loadImage('https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp');

  // Crear un canvas de las dimensiones de la imagen
  const canvas = createCanvas(background.width, background.height);
  const ctx = canvas.getContext('2d');

  // Dibujar la imagen de fondo en el canvas
  ctx.drawImage(background, 0, 0, background.width, background.height);

  // Configurar el estilo de texto para el captcha
  ctx.font = '40px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';

  // Dibujar el texto (número de serie) sobre la imagen
  ctx.fillText(sn, canvas.width / 2, canvas.height / 2); // Centrado en el canvas

  // Enviar el número de serie al usuario
  await conn.reply(m.chat, `Tu número de serie es: ${sn}`, m);

  // Enviar el captcha generado como imagen adjunta
  await conn.sendMessage(m.chat, {
    caption: `Aquí está tu captcha con el SN: ${sn}`,
    files: [{
      attachment: canvas.toBuffer(),
      name: `captcha-${m.sender}.png`
    }]
  });
};

handler.help = ['sn']; // Comando para llamar al handler
handler.tags = ['start'];
handler.command = ['nserie', 'sn', 'mysn']; // Comandos disponibles
handler.register = true;

export default handler;