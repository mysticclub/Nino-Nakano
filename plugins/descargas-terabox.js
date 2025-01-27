/* 
- Downloader Terabox By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `🍟 Ingresa un link de TeraBox`, m);
    await m.react('🕓');

    try {
        let api = await fetch(`https://dark-core-api.vercel.app/api/terabox?key=TWIzumi&url=${text}`);
        let json = await api.json();
        if (!json.success) return m.reply('❌ Error al obtener los detalles del enlace, por favor intenta nuevamente.');

        let { fileName, type, thumb, url } = json.result;
        let caption = `*「✐」${fileName}*

> ❒ Tipo » *${type}*
> 🖼️ Vista previa » *${thumb}*`;

        // Enviar el archivo con el caption y el thumbnail
        await conn.sendFile(m.chat, url, fileName, caption, m, false, {
            thumbnail: thumb ? await getBuffer(thumb) : null
        });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
}

handler.help = ['terabox *<url>*']
handler.tags = ['dl']
handler.command = ['terabox']

export default handler;

async function getBuffer(url) {
    try {
        const res = await axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}













/* import axios from 'axios';
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Ejemplo:\n${usedPrefix + command} https://terabox.com/s/1kReYr_2pyxLZ2c2kEAHF3A`);
await m.react('🕓')
  try {
    const result = await terabox(text);
    if (!result.length) return m.reply('ingresa un url válido.');

    for (let i = 0; i < result.length; i++) {
      const { fileName, type, thumb, url } = result[i];
      const caption = `📄 *Nombre File:* ${fileName}\n📂 *Formato:* ${type}`;

      await m.react('✅')      
      await conn.sendFile(m.chat, url, fileName, caption, m, false, {
        thumbnail: thumb ? await getBuffer(thumb) : null
      });
    }
  } catch (err) {
    console.error(err);
    m.reply('error al descargar el archivo.');
  }
};
handler.help = ["terabox *<url>*"];
handler.tags = ["dl"];
handler.command = ["terabox"];

export default handler;

async function terabox(url) {
  return new Promise(async (resolve, reject) => {
    await axios
      .post('https://teradl-api.dapuntaratya.com/generate_file', {
        mode: 1,
        url: url
      })
      .then(async (a) => {
        const array = [];
        for (let x of a.data.list) {
          let dl = await axios
            .post('https://teradl-api.dapuntaratya.com/generate_link', {
              js_token: a.data.js_token,
              cookie: a.data.cookie,
              sign: a.data.sign,
              timestamp: a.data.timestamp,
              shareid: a.data.shareid,
              uk: a.data.uk,
              fs_id: x.fs_id
            })
            .then((i) => i.data)
            .catch((e) => e.response);

          if (!dl.download_link) continue;

          array.push({
            fileName: x.name,
            type: x.type,
            thumb: x.image,
            url: dl.download_link.url_1
          });
        }
        resolve(array);
      })
      .catch((e) => reject(e.response.data));
  });
}


async function getBuffer(url) {
  try {
    const res = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
} */
