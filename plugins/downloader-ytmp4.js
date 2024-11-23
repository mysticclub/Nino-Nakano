/* 
- YTMP4 By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import { ytmp4 } from 'ruhend-scraper';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args || !args[0]) return conn.reply(m.chat, '*\`Ingresa El link Del video a descargar 🤍\`*', m, fake)
    await m.react('🕓');
    try {
        const { title, video, author, description, duration, views, upload, thumbnail } = await ytmp4(args[0]);

        let caption = `🎬 *Título:* ${title}\n`;
        caption += `👤 *Autor:* ${author}\n`;
        caption += `📝 *Descripción:* ${description}\n`;
        caption += `⏳ *Duración:* ${duration}\n`;
        caption += `👁️ *Vistas:* ${views}\n`;
        caption += `📅 *Subido:* ${upload}`;

        await conn.sendMessage(m.chat, { 
            video: { url: video }, 
            caption: caption, 
            mimetype: 'video/mp4' 
        }, { quoted: m });
        await m.react('✅'); 

    } catch (error) {
        console.error(error);
        await m.react('✖️');
    }
};

handler.help = ['video *<link yt>*'];
handler.tags = ['dl'];
handler.command = ['ytmp4', 'video', 'vídeo'];
handler.register = true;

export default handler;