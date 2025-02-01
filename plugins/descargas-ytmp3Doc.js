import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await m.react('✖️');
        return conn.reply(m.chat, `🌐 Ingresa un link de Threads`, m);
    }

    if (!args[0].match(/^https?:\/\/www\.threads\.net\/@[\w.]+\/post\/[\w-]+(\?xmt=[\w-]+)?$/)) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Verifica que sea un link válido de Threads`, m);
    }

    try {
        await m.react('🕑');
        let { data } = await axios.get(`https://api.agatz.xyz/api/threads?url=${args[0]}`);

        let processedUrls = new Set();

        if (data.data.image_urls.length > 0) {
            for (let imgUrl of data.data.image_urls) {
                if (!processedUrls.has(imgUrl)) {
                    processedUrls.add(imgUrl);
                    await conn.sendMessage(
                        m.chat,
                        { 
                            image: { url: imgUrl }, 
                            caption: '*✔️ Descarga de Threads.*' 
                        },
                        { quoted: m }
                    );
                }
            }
        }

        if (data.data.video_urls.length > 0) {
            for (let vid of data.data.video_urls) {
                if (!processedUrls.has(vid.download_url)) {
                    processedUrls.add(vid.download_url);
                    await conn.sendMessage(
                        m.chat,
                        { 
                            video: { url: vid.download_url }, 
                            caption: '*✔️ Descarga de Threads.*' 
                        },
                        { quoted: m }
                    );
                }
            }
        }

        if (processedUrls.size === 0) {
            await conn.reply(m.chat, `⚠️ No se encontraron medios en el enlace proporcionado.`, m);
        } else {
            await m.react('✅');
        }
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