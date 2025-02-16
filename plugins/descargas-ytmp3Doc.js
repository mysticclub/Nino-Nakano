import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('✧ Ingresa un link de:\n- YouTube\n- Instagram\n- TikTok\n- Facebook\n- Twitter');

    await conn.sendMessage(m.chat, { react: { text: `🌟`, key: m.key } });

    try {
        let url = args[0];
        let apiUrl = `https://api.nasirxml.my.id/download/aio?{"url":"${encodeURIComponent(url)}"}`;

        let { data } = await axios.get(apiUrl);
        
        if (!data.result || data.result.length === 0) throw new Error('No se encontraron resultados.');

        let info = data.result[0];
        let caption = `*🎬 Título:* ${info.title}\n👤 *Dueño:* ${info.owner}\n⭐ *Fans:* ${info.fans}\n👀 *Vistas:* ${info.views}\n🔄 *Compartidos:* ${info.shares}\n\n📥 *Enlaces de descarga:*`;

        info.dlink.forEach((item, index) => {
            caption += `\n${index + 1}. *${item.title}* ➤ ${item.link}`;
        });

        await conn.sendMessage(m.chat, { 
            image: { url: info.image }, 
            caption: caption 
        }, { quoted: m });

    } catch (error) {
        await m.reply(`❌ Error: ${error.message}`);
    }
};

handler.help = ['aio'].map(v => v + ' <link>');
handler.tags = ['dl'];
handler.command = /^(aio)$/i;

handler.limit = true;
handler.register = true;

export default handler;