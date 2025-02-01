import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await m.react('✖️');
        return conn.reply(m.chat, `🌐 Ingresa un link de Threads`, m);
    }

    if (!args[0].match(/^https?:\/\/www\.threads\.net\/t\/([a-zA-Z0-9_-]+)/)) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Verifica que sea un link válido de Threads`, m);
    }

    try {
        await m.react('🕑');
        let { data } = await axios.get(`https://api.agatz.xyz/api/threads?url=${args[0]}`);

        let processedUrls = new Set();

        for (let media of data.media) {
            if (!processedUrls.has(media.url)) {
                processedUrls.add(media.url);

                if (media.type === 'image') {
                    await conn.sendMessage(
                        m.chat,
                        { 
                            image: { url: media.url }, 
                            caption: '*✔️ Descarga de Threads.*' 
                        },
                        { quoted: m }
                    );
                } else if (media.type === 'video') {
                    await conn.sendMessage(
                        m.chat,
                        { 
                            video: { url: media.url }, 
                            caption: '*✔️ Descarga de Threads.*' 
                        },
                        { quoted: m }
                    );
                }
            }
        }
        await m.react('✅'); 
    } catch (error) {
        console.log(error);
        await m.react('❌');
        return conn.reply(m.chat, `❌ Ocurrió un error al descargar el contenido.`, m);
    }
};

handler.help = ['threads *<link>*'];
handler.tags = ['dl'];
handler.command = /^(threads|thdl)$/i;

export default handler;