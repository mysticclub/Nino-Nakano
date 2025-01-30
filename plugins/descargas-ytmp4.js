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

        const response1 = await fetch(`https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(text)}`);
        const result1 = await response1.json();

        if (result1.status === 200 && result1.success && result1.result && result1.result.download_url) {
            await conn.sendMessage(m.chat, { 
                video: { url: result1.result.download_url }, 
                caption: '🎥 Aquí está tu video' 
            }, { quoted: m });
            await m.react('✅');
            return;
        }

        const response2 = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4?url=${encodeURIComponent(text)}&type=video&quality=hdHigh&key=api`);
        const result2 = await response2.json();

        if (result2.success && result2.downloadLink) {
            await conn.sendMessage(m.chat, { 
                video: { url: result2.downloadLink }, 
                caption: '🎥 Aquí está tu video' 
            }, { quoted: m });
            await m.react('✅');
            return;
        }

        throw new Error('No se pudo obtener el enlace de descarga de ninguna API');

    } catch (error) {
        console.error(error);
        await m.react('❌');
        m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
    }
};

handler.help = ['ytmp4 *<url>*']; 
handler.command = ['ytmp4'];
handler.tags = ['dl'];

export default handler;





/* import fetch from 'node-fetch';

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

        let HS = `🍃 *Título :* ${title}\n🍃 *Duración :* ${(durationInSeconds / 60).toFixed(2)} minutos`;

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

handler.help = ['ytmp4 *<url>*']; 
handler.command = ['ytmp4'];
handler.tags = ['dl'];

export default handler; */
