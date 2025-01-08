import axios from 'axios';

async function dansyaytdl(link) {
    try {
        const response = await axios.get('https://y2ts.us.kg/token');
        const token = response.data.token;
        const url = `https://y2ts.us.kg/youtube?url=${link}`;
        const headers = {
            'Authorization-Token': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Content-Type': 'application/json',
        };

        const videoResponse = await axios.get(url, { headers });

        if (videoResponse.data.status) {
            return videoResponse.data.result || '';
        } else {
            throw new Error('Status is false, no result found.');
        }
    } catch (error) {
        throw new Error(error.message || 'Error occurred while fetching video data.');
    }
}

async function handler(m, { text, conn, botname }) {
    if (!text) {
        return conn.sendMessage(m.chat, { text: ' [ Example ] :*\n> *.ytmp4 <link youtube>*' }, { quoted: m });
    }
    conn.sendMessage(m.chat, { text: 'tunggu sebentar ya...' }, { quoted: m });

    try {
        const data = await dansyaytdl(text);
        const hasilnya = data.mp4;
        const ytc = `*[ YOUTUBE DOWNLOADER ]*
🔥 *Title*: ${data.title || ''}
🔥 *Description*: ${data.description || ''}
🔥 *Views*: ${data.views || ''}
© ${botname}`;

        await conn.sendMessage(m.chat, { video: { url: hasilnya }, caption: ytc }, { quoted: m });
    } catch (e) {
        conn.sendMessage(m.chat, { text: '*Terjadi error :* ' + e.message }, { quoted: m });
    }
}

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = ['tes'];

export default handler;