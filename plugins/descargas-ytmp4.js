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
        throw new Error(error.message || 'Error al obtener datos del video.');
    }
}

async function handler(m, { text, conn, botname }) {
    if (!text) {
        await m.react('❌');
        return conn.sendMessage(m.chat, { text: '[ Ejemplo ] :\n> *.ytmp4 <enlace de YouTube>*' }, { quoted: m });
    }

    await m.react('🕓');

    try {
        const data = await dansyaytdl(text);

        if (!data.mp4) {
            await m.react('⚠️');
            throw new Error('No se encontró un enlace MP4.');
        }

        const ytc = `*Título:* ${data.title || 'Desconocido'}
*Vistas:* ${data.views || 'No disponible'}`;

        await conn.sendMessage(m.chat, { video: { url: data.mp4 }, caption: ytc }, { quoted: m });
        await m.react('✅');
    } catch (e) {
        await m.react('❌');
        conn.sendMessage(m.chat, { text: '*Error:* ' + e.message }, { quoted: m });
    }
}

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp4'];

export default handler;