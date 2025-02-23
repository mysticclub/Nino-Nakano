> *YouTube Play 🧇.*

JISOO - Hugs & Kisses (Official Audio)

• *Duración:* 3:10
• *Autor:* JISOO
• *Publicado:* 3:10
• *Enlace:* https://youtube.com/watch?v=lI-ocK5wWMQ

Presiona el botón para el tipo de descarga.



import yts from 'yt-search';
import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0]) return conn.reply(m.chat, '*`Por favor ingresa un término de búsqueda`*', m);

    await m.react('🕓');
    try {
        let searchResults = await searchVideos(args.join(" "));
        if (!searchResults.length) throw new Error('No se encontraron resultados.');

        let video = searchResults[0];
        let thumbnail = await (await fetch(video.miniatura)).buffer();

    let messageText = `> *YouTube Play 🧇.*\n\n`;
        messageText += `${video.titulo}\n\n`;
        messageText += `• *Duración:* ${video.duracion || 'No disponible'}\n`;
        messageText += `• *Autor:* ${video.canal || 'Desconocido'}\n`;
        messageText += `• *Publicado:* ${convertTimeToSpanish(video.publicado)}\n`;
        messageText += `• *Enlace:* ${video.url}\n`;

        let sections = searchResults.slice(1, 11).map((v, index) => ({
            title: `${index + 1}┃ ${v.titulo}`,
            rows: [
                {
                    title: `🎶 Descargar MP3`,
                    description: `Duración: ${v.duracion || 'No disponible'}`, 
                    id: `${usedPrefix}ytmp3 ${v.url}`
                },
                {
                    title: `🎥 Descargar MP4`,
                    description: `Duración: ${v.duracion || 'No disponible'}`, 
                    id: `${usedPrefix}ytmp4 ${v.url}`
                }
            ]
        }));

        await conn.sendMessage(m.chat, {
            image: thumbnail,
            caption: messageText,
            footer: 'ᴘʀᴇꜱɪᴏɴᴀ ᴇʟ ʙᴏᴛᴏɴ ᴘᴀʀᴀ ᴇʟ ᴛɪᴘᴏ ᴅᴇ ᴅᴇꜱᴄᴀʀɢᴀ.',
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            },
            buttons: [
                {
                    buttonId: `${usedPrefix}ytmp3 ${video.url}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆' },
                    type: 1,
                },
                {
                    buttonId: `${usedPrefix}ytmp4 ${video.url}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆' },
                    type: 1,
                },
                {
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'Más resultados',
                            sections: sections,
                        }),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*`Error al buscar el video.`*', m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];
export default handler;

async function searchVideos(query) {
    try {
        const res = await yts(query);
        return res.videos.slice(0, 10).map(video => ({
            titulo: video.title,
            url: video.url,
            miniatura: video.thumbnail,
            canal: video.author.name,
            publicado: video.timestamp || 'No disponible',
            vistas: video.views || 'No disponible',
            duracion: video.duration.timestamp || 'No disponible'
        }));
    } catch (error) {
        console.error('Error en yt-search:', error.message);
        return [];
    }
}

function convertTimeToSpanish(timeText) {
    return timeText
        .replace(/year/, 'año').replace(/years/, 'años')
        .replace(/month/, 'mes').replace(/months/, 'meses')
        .replace(/day/, 'día').replace(/days/, 'días')
        .replace(/hour/, 'hora').replace(/hours/, 'horas')
        .replace(/minute/, 'minuto').replace(/minutes/, 'minutos');
}
