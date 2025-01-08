import axios from 'axios';

async function dansyaytdl(link) {
    try {
        const response = await axios.get('https://y2ts.us.kg/token');
        const token = response.data?.token;

        if (!token) {
            throw new Error('No se pudo obtener el token.');
        }

        const url = `https://y2ts.us.kg/youtube?url=${encodeURIComponent(link)}`;
        const headers = {
            'Authorization-Token': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Content-Type': 'application/json',
        };

        const videoResponse = await axios.get(url, { headers });

        if (videoResponse.data?.status) {
            return videoResponse.data.result || {};
        } else {
            throw new Error('La solicitud fue rechazada. Verifica el enlace.');
        }
    } catch (error) {
        throw new Error(error.message || 'Error al obtener datos del audio.');
    }
}

async function handler(m, { text, conn }) {
    if (!text) {
        await m.react('❌'); // Reacciona si falta el texto
        return conn.sendMessage(m.chat, { text: '[ Ejemplo ] :\n> *.ytmp3 <enlace de YouTube>*' }, { quoted: m });
    }

    await m.react('🕓'); // Reacciona indicando que está procesando

    try {
        const data = await dansyaytdl(text);

        if (!data.mp3) {
            await m.react('⚠️'); // Reacciona si no encuentra el MP3
            throw new Error('No se encontró un enlace MP3.');
        }

        await conn.sendMessage(m.chat, { audio: { url: data.mp3 }, mimetype: 'audio/mpeg' }, { quoted: m });
        await m.react('✅'); // Reacciona al completar con éxito
    } catch (e) {
        await m.react('❌'); // Reacciona si ocurre un error
        conn.sendMessage(m.chat, { text: '*Error:* ' + e.message }, { quoted: m });
    }
}

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp3'];

export default handler;