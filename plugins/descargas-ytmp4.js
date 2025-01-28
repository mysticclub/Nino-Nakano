/* 
- Downloader Ytmp4 By DarkCore
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
- Parchado por DarkCore... vip plus
*/

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de YouTube', m);

    try {
        await m.react('🕒');

        const apiKey = 'xenzpedo';
        const apiUrl = `https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.status || !result.result) {
            throw new Error('Error al obtener datos de la API.');
        }

        const { title, duration, mp3, mp4 } = result.result;

        const durationInSeconds = parseInt(duration);

        let HS = `*Título :* ${title}\n*Duración :* ${(durationInSeconds / 60).toFixed(2)} minutos`;

        if (durationInSeconds >= 2400) { 
            await conn.sendMessage(m.chat, { 
                document: { url: mp4 }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`, 
                caption: HS 
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: mp4 }, 
                caption: HS 
            }, { quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖'); 
    }
};

handler.command = ['ytmp4'];
handler.tags = ['dl'];

export default handler;
