import fs from 'fs';
import axios from 'axios';
import WSF from "wa-sticker-formatter";

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let ps = text 
        ? text 
        : m.quoted && m.quoted.text 
        ? m.quoted.text 
        : m.quoted && m.quoted.caption 
        ? m.quoted.caption 
        : m.quoted && m.quoted.description 
        ? m.quoted.description 
        : '';

    if (!ps) {
        return m.reply(`*• Ejemplo :* ${usedPrefix + command} *[texto]*`);
    }

    let res = `https://mxmxk-helper.hf.space/brat?text=${encodeURIComponent(ps)}`;

    try {
        // Descargar el archivo desde la URL
        const response = await axios.get(res, { responseType: 'arraybuffer' });
        
        // Validar el tipo de archivo
        const contentType = response.headers['content-type'];
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(contentType)) {
            throw new Error('La URL no devolvió un archivo de imagen válido.');
        }

        // Crear un buffer de imagen
        const imageBuffer = Buffer.from(response.data);

        // Crear el sticker
        const sticker = new WSF.Sticker(imageBuffer, {
            type: "full",
            pack: "Mi Pack",
            author: "Autor",
        });
        const stickerBuffer = await sticker.build();

        // Enviar el sticker al chat
        await conn.sendFile(m.chat, stickerBuffer, 'sticker.webp', '', m);
    } catch (e) {
        console.error(e);
        await m.reply(`Ocurrió un error: ${e.message}`);
    }
};

// Configuración del handler
handler.help = ['brat'];
handler.tags = ['sticker'];
handler.command = /^(brat)$/i;

export default handler;





/* import fs from 'fs'
import WSF from "wa-sticker-formatter";
var handler = async (m, {
    conn, 
    args, 
    text, 
    usedPrefix, 
    command
}) => {
    let ps = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
    if (!ps) throw m.reply(`*• Ejemplo :* ${usedPrefix + command} *[texto]*`)

    let res = `https://mxmxk-helper.hf.space/brat?text=${ps}`

    try {
async function sticker(img, url, packname, author, categories = [""]) {

  const stickerMetadata = {
    type: "full",
    pack: packname,
    author,
    categories,
  };
  return await new WSF.Sticker(img ? img : url, stickerMetadata).build();
}

        var stikerp = await sticker(res, { ps })
        await conn.sendFile(m.chat, stikerp, 'atmin.webp', '', m)
    } catch (e) {
        console.log(e)
        await m.reply(eror)
    }
}

handler.help = ['brat'];
handler.tags = ['sticker'];
handler.command = /^(brat)$/i;

export default handler; */