import { sticker } from '../lib/sticker.js';
import axios from 'axios';

let handler = async (m, { conn, text }) => {
 
   let who = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.fromMe 
      ? conn.user.jid 
      : m.sender;

   let message = text.trim().split(' ').slice(1).join(' ');

   if (!m.mentionedJid || m.mentionedJid.length === 0) {
      return conn.reply(m.chat, '🤍 Debes etiquetar a alguien usando @usuario.', m);
   }

   if (!message) {
      return conn.reply(m.chat, '🤍 Ingresa un mensaje después de la etiqueta.', m);
   }

   if (message.length > 30) {
      return conn.reply(m.chat, '🤍 Solo se permiten 30 caracteres como máximo.', m);
   }

   await m.react('🕓');

   try {
      const pp = await conn.profilePictureUrl(who, 'image').catch(_ => global.imgbot.noprofileurl);
      const name = await conn.getName(who);

      const obj = {
         "type": "quote",
         "format": "png",
         "backgroundColor": "#000000",
         "width": 512,
         "height": 768,
         "scale": 2,
         "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
               "id": 1,
               "name": name || 'Usuario',
               "photo": {
                  "url": pp
               }
            },
            "text": message,
            "replyMessage": {}
         }]
      };

      // Enviar la solicitud para generar la imagen
      const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
         headers: {
            'Content-Type': 'application/json'
         }
      });

      // Convertir la imagen generada (base64) en un buffer
      const buffer = Buffer.from(json.data.result.image, 'base64');

      // Crear el sticker
      const stick = await sticker(buffer, false, packname, author);

      // Enviar el sticker generado
      await conn.sendFile(m.chat, stick, 'sticker.webp', '', m);
      await m.react('✅'); // Indicador de éxito
   } catch (e) {
      console.error(e);
      await m.react('✖️'); // Indicador de error
      conn.reply(m.chat, '❌ Ocurrió un error al generar el sticker.', m);
   }
};

handler.help = ['qcfake *@usuario <mensaje>*'];
handler.tags = ['sticker'];
handler.command = ['qcfake'];
handler.register = true;

export default handler;