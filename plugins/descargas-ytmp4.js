import axios from 'axios';

const handler = async (m, {
    text,
    conn
}) => {
    if (!text) return m.reply('Kasih link YouTube-nya, biar gue bantu. 🎥');

    try {
        const response = await axios.get(`https://ytdl.axeel.my.id/api/download/video/?url=${text}`);

        if (!response.data || !response.data.metadata) {
            return m.reply('Gagal ambil data dari link YouTube itu, coba deh link-nya bener. 😕');
        }

        const {
            metadata,
            downloads
        } = response.data;

        const videoUrl = downloads.url;
        const thumbnailUrl = metadata.thumbnail.url;

        await conn.sendMessage(m.chat, {
            image: {
                url: thumbnailUrl
            },
            caption: `📺 *Judul*: ${metadata.title}\n⏳ *Durasi*: ${metadata.duration}s\n👀 *Views*: ${metadata.views}\n👍 *Likes*: ${metadata.likes}\n✍️ *Author*: ${metadata.author}\n📜 *Deskripsi*: ${metadata.description}`,
        }, {
            quoted: m
        });

        await conn.sendMessage(m.chat, {
            video: {
                url: videoUrl
            },
            caption: `🎬 *Video*: ${metadata.title}`,
        }, {
            quoted: m
        });

    } catch (error) {
        await m.reply('Ada error pas ambil data YouTube-nya, coba lagi nanti ya. ❌');
    }
};

handler.help = ['ytvideo'];
handler.tags = ['downloader'];
handler.command = /^yt|ytvideo$/i;
handler.limit = 3 //biar gak spam
export default handler;




/* import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de youtube', m);

    try {
        await m.react('🕒');
        let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`);
        let json = await api.json();
        let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json;
        
        let HS = `*Titulo :* ${title}\nDuración : ${duration}\nCalidad : ${quality}p`;

        let durationInSeconds = 0;
        if (duration.includes("min")) {
            let minutes = parseFloat(duration.replace(" min", ""));
            durationInSeconds = Math.round(minutes * 60); 
        }

        if (durationInSeconds >= 2400) {
            await conn.sendMessage(m.chat, { 
                document: { url: downloadUrl }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`, 
                caption: HS 
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
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
handler.tags = ['dl'];
handler.command = ['ytmp4'];

export default handler; */