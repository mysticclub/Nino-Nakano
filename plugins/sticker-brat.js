import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
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

    try {
        // Generar imagen usando Canvas
        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        // Fondo blanco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Texto en negro
        ctx.fillStyle = '#000000';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(ps, canvas.width / 2, canvas.height / 2);

        // Convertir el canvas en un buffer
        const imageBuffer = canvas.toBuffer();

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