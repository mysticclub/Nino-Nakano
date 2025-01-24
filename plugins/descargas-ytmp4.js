import axios from 'axios';

const handler = async (m, { text, conn }) => {
    if (!text) return m.reply('Proporcióname el enlace de YouTube para que pueda ayudarte. 🎥');

    try {
       await m.react('🕓');

        const response = await axios.get(`https://ytdl.axeel.my.id/api/download/video/?url=${text}`);

        if (!response.data || !response.data.metadata) {
            return m.reply('No se pudo obtener los datos del enlace de YouTube. Asegúrate de que el enlace sea correcto. 😕');
        }

        const { metadata, downloads } = response.data;

        const videoUrl = downloads.url;
        const thumbnailUrl = metadata.thumbnail.url;

        await conn.sendMessage(m.chat, {
            video: {
                url: videoUrl
            },
            caption: `*• Título*: ${metadata.title}`,
        }, { quoted: m });
        await m.react('✅');

    } catch (error) {
        await m.react('✖️');
    }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = ['ytmp4'];
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



/* import { spawn } from 'child_process';

let handler = async (m, { conn }) => {
    const imageUrl = 'https://i.ibb.co/cLMH26y/file.jpg'; 

    await conn.sendMessage(m.chat, { 
        image: { url: imageUrl },
        caption: '¡Bienvenido al bot! ¿Qué acción te gustaría realizar?',
        buttons: [
          { 
            buttonId: 'accion_1', 
            buttonText: { displayText: '⊹₊ ⋆ᯓᡣ𐭩 ᥲgrᥱgᥲmᥱ ᥲ 𝗍ᥙ grᥙ⍴᥆' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_2', 
            buttonText: { displayText: '⊹₊ ⋆ᯓᡣ𐭩 ᥲᥴ𝗍ᥙᥲᥣіzᥲᥴі᥆ᥒᥱs' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_3', 
            buttonText: { displayText: '⊹₊ ⋆ᯓᡣ𐭩 ⍴ᥲgіᥒᥲ ᥆𝖿іᥴіᥲᥣ' }, 
            type: 1 
          },
        ],
        viewOnce: true,
        headerType: 4 
      }, { quoted: m });
};

handler.help = ['start'];
handler.tags = ['general'];
handler.command = ['Start', 'start'];

export default handler; */