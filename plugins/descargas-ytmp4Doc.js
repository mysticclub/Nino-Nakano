/*
jan hapus yaa 🗿 
`tqto penyedia api`
  Author   : Aka (hanya pemula yg lagi belajar)
 Description: fitur furbrat
ch1
https://whatsapp.com/channel/0029VaRI1OB2P59cTdJKZh3q
ch2
https://whatsapp.com/channel/0029VajvdlI35fM4lM1fOT1d
ch tele
https://T.me/vortexsec
 */


import fetch from 'node-fetch';
import { sticker } from '../lib/sticker.js';

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) throw `[❗] Masukkan teks!\nContoh: ${usedPrefix + command} hai aku furbrat`;

  try {
    const randomStyle = Math.floor(Math.random() * 7);
    const API = `https://fastrestapis.fasturl.link/tool/furbrat?text=${encodeURIComponent(text)}&style=${randomStyle}&mode=center`;

    const url = await sticker(null, API, global.packname || "ғᴜʀɪɴᴀ ᴀɪ", global.author || "ɴᴀᴍᴀ ʙᴀᴘᴀᴋ ᴋᴀʟɪᴀɴ");

    await conn.sendFile(m.chat, url, 'sticker.webp', `${text}`, m);
  } catch (err) {
    m.reply(`[❗] Terjadi kesalahan: ${err.message || "Coba lagi nanti."}`);
  }
};

handler.help = ['furbrat <teks>'];
handler.tags = ['sticker'];
handler.command = /^(furbrat)$/i;
handler.limit = true;
handler.premium = false;

export default handler;