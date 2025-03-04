import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, '⚠️ Proporciona un enlace de YouTube.', m);
    await m.react('🕒');
    
    let url = args[0];
    let api = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(url)}`;

    try {
        let res = await fetch(api);
        let json = await res.json();

        if (!json.status || !json.download) {
            return conn.reply(m.chat, '❌ No se pudo obtener el audio.', m);
        }

        let { title, download } = json;

        await conn.sendMessage(m.chat, { 
            audio: { url: download }, 
            mimetype: 'audio/mp4', 
            fileName: `${title}.mp3` 
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        await m.react('❌');
    }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = /^(ytmp3|yta)$/i;

export default handler;