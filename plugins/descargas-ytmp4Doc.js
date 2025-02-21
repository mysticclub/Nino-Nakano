import axios from 'axios';

let handler = async (m, { conn, text }) => { if (!text) return conn.reply(m.chat, Ingresa el enlace, m);

try {
    let api = await axios.get(`https://api-ghost-x.web.id/api/download/ytmp3?url=${text}`);
    let json = api.data;
    
    if (!json.status) throw new Error('Error al obtener los datos');

    let { title, thumbnails } = json.metadata;
    let dl_url = json.download.video;

    await conn.sendMessage(m.chat, {
        video: { url: dl_url },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: `🎵 *${title}*`,
        thumbnail: await axios.get(thumbnails.high.url, { responseType: 'arraybuffer' }).then(res => res.data)
    }, { quoted: m });
} catch (error) {
    console.error(error);
    conn.reply(m.chat, `Ocurrió un error al procesar tu solicitud.`, m);
}

};

handler.command = ['ytmp4v3', 'ytav3'];

export default handler;

