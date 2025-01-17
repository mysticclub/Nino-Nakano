import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fetch from 'node-fetch'
const { generateWAMessageFromContent, proto, getDevice } = (await import('@whiskeysockets/baileys')).default

let estilo = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

const emojis = {
  "main": "☁️",
  "info": "✨",
  "search": "🎋",
  "rpg": "🌵",
  "nable": "🌀",
  "start": "🌱",
  "sticker": "🖼️",
  "dl": "🍄",
  "ai": "🍘",
  "serbot": "👾",
  "tools": "🍧",
  "anonymous": "🎭",
  "confesar": "📝",
  "internet": "🌐",
  "anime": "🦋",
  "group": "🌼",
  "owner": "🪐",
};

const defaultMenu = {
  before: `*Hola \`%name\` soy Genesis*

➫ _\`Lugar\`_ :: %place
➫ _\`Ciudad\`_ :: %city

➫ _\`ᴀᴄᴛɪᴠᴏ\`_ :: %muptime
➫ _\`ᴜꜱᴜᴀʀɪᴏꜱ\`_ :: _%rtotalreg de %totalreg_
➫ _\`ᴄᴏʀᴀᴢᴏɴᴇꜱ\`_ :: _%corazones_
➫ _\`ᴘʀᴇꜰɪᴊᴏ\`_ :: _< . >_
➫ _\`ᴛᴏᴛᴀʟ ᴄᴏᴍᴀɴᴅᴏꜱ\`_ :: _%totalf_

▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
%readmore
  `.trimStart(),
  header: '✧*̥˚ ︶︶︶︶︶︶︶︶︶  ✧*̥˚\n┊ %category \n✧*̥˚ ︶︶︶︶︶︶︶︶︶  ✧*̥˚',
  body: '*┊* %emoji %cmd %iscorazones %isPremium',
  footer: '  ︶︶︶︶︶︶︶︶︶︶︶︶\n\n',
  after: ``,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  let tags = {
    "main": "PRINCIPAL",
    "info": "INFORMACION",
    "search": "SEARCH",
    "rpg": "RPG",
    "nable": "ON - OFF",
    "start": "START",
    "sticker": "STICKER",
    "dl": "DOWNLOADER",
    "ai": "INTELIGENCIAS",
    "serbot": "JADI-BOT",
    "tools": "TOOLS",
    "anonymous": "ANONYMOUS",
    "confesar": "CONFESIONES",
    "internet": "INTERNET",
    "anime": "ANIME",
    "group": "GROUP",
    "owner": "OWNER",
  };

  try {
    let dash = global.dashmenu;
    let tag = `@${m.sender.split('@')[0]}`;
    let device = await getDevice(m.id);

    let d = new Date(new Date + 3600000);
    let locale = 'es';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    let place = 'Argentina'; // Reemplazar con datos dinámicos
    let city = 'Buenos Aires'; // Reemplazar con datos dinámicos

    let _uptime = process.uptime() * 1000;
    let muptime = clockString(_uptime);

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        corazones: plugin.corazones,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    });

    let replace = {
      '%': '%',
      p: muptime,
      name: await conn.getName(m.sender),
      place,
      city,
      muptime,
      readmore: readMore,
    };

    let text = defaultMenu.before.replace(/%(\w+)/g, (_, name) => '' + replace[name]);

    let img = 'https://i.ibb.co/6mvk6Xn/1a35aec3-8ce2-4e46-97ad-cf080ab4ee69.png';
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: estilo(text),
      buttons: [
        {
          buttonId: `.ping`,
          buttonText: { displayText: 'PING' },
        },
        {
          buttonId: `.owner`,
          buttonText: { displayText: 'OWNER' },
        },
      ],
      headerType: 4,
    }, { quoted: m });
  } catch (e) {
    conn.reply(m.chat, 'error', m);
    throw e;
  }
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(allmenu|menu|menú|\?)$/i;
handler.register = true;
handler.exp = 3;

export default handler;

//----------- FUNCIÓN -------

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('');
}