import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, '⚠️ Proporciona un enlace de YouTube.', m);
    await m.react('⏳');
    let url = args[0];
    let api = `https://api.agungny.my.id/api/youtube-audio?url=${encodeURIComponent(url)}`;

    try {
        let res = await fetch(api);
        let json = await res.json();

        if (!json.status || !json.result) {
            return conn.reply(m.chat, '❌ No se pudo obtener el audio.', m);
        }

        let { title, url_audio } = json.result;

        await conn.sendMessage(m.chat, { 
            audio: { url: url_audio }, 
            mimetype: 'audio/mp4', 
            fileName: `${title}.mp3` 
        }, { quoted: m });
      await m.react('✅');
    } catch (e) {
     await m.react('❌');
    }
};
handler.help = ['ytmp3 *<url>*']
handler.tags = ['dl']
handler.command = /^(ytmp3|yta)$/i;
module.exports = handler;
