import db from '../lib/database.js';
import { createHash } from 'crypto';
import fetch from 'node-fetch';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender);

  if (user.registered === true) {
    return m.reply(`🥞 Ya estás registrado.`);
  }
  if (!Reg.test(text)) {
    return m.reply(
      `*[ ✰ ] Por favor, ingresa tu nombre de usuario para proceder con el registro.*\n\n*🧇 Ejemplo de Uso* :\n*${usedPrefix + command}* Angel.19`
    );
  }

  let [_, name, splitter, age] = text.match(Reg);
  if (!name) return conn.reply(m.chat, '[ ✰ ] El nombre no puede estar vacío.', m);
  if (!age) return conn.reply(m.chat, '[ ✰ ] La edad no puede estar vacía.', m);

  age = parseInt(age);
  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);

  // Descargar imagen como Buffer
  let imgUrl = [ 
    'https://i.ibb.co/XVq2V0P/file.jpg',
    'https://i.ibb.co/93wxrXV/file.jpg',
    'https://i.ibb.co/NTrX3Hz/file.jpg',
    'https://i.ibb.co/PQnRDFh/file.jpg'
  ].getRandom()
  let imgBuffer;
  try {
    imgBuffer = await (await fetch(imgUrl)).buffer();
  } catch (error) {
    console.error('[ERROR] No se pudo descargar la imagen:', error);
    return m.reply('[ERROR] No se pudo cargar la imagen. Inténtalo más tarde.');
  }

  let now = new Date();
  let date = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  let time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  let txt = '*`📄 R E G I S T R O 📄`*\n';
  txt += `\`━━━━━━━━━━━━━━━━━━━━\`\n`;
  txt += `*\`⁘ NOMBRE:\`* ${name}\n`;
  txt += `*\`⁘ EDAD:\`* ${age} años\n`;
  txt += `*\`⁘ FECHA:\`* ${fecha}\n`;
  txt += `*\`⁘ N° SERIAL:\`* ${sn}\n`;
  txt += `\`━━━━━━━━━━━━━━━━━━━━\``;
//  txt += `> Escribe *${usedPrefix}perfil* para ver tu perfil.`;

  let dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ іzᥙmі.kz᥊';

await conn.sendMessage(m.chat, {
  image: imgBuffer,
  caption: txt,
  footer: dev,
  buttons: [
    {
      buttonId: `.perfil`,
      buttonText: { displayText: '👤 Perfil' },
    },
    {
      buttonId: `.menu`,
      buttonText: { displayText: '🧇 Menu' },
    },
  ],
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
    },
  },
  viewOnce: true,
  headerType: 4,
}, { quoted: m });

  await m.react('✅');
};

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*');
handler.tags = ['start'];
handler.command = ['verify', 'reg', 'register', 'registrar'];

export default handler;