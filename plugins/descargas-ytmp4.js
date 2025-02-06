import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa una URL válida de *Youtube*.', m);
    }

    try {
        await m.react('🕒');

        const apis = [
            `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(text)}`,
            `https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=xenzpedo`,
            `https://mahiru-shiina.vercel.app/download/ytmp4?url=${encodeURIComponent(text)}`
        ];

        let result;
        for (const api of apis) {
            try {
                const response = await fetch(api);
                result = await response.json();
                if (result.status && result.data && result.data.dl) {
                    const { title, dl } = result.data;

                    const videoFileResponse = await fetch(dl);
                    if (videoFileResponse.ok) {
                        const buffer = await videoFileResponse.buffer();
                        const size = parseInt(videoFileResponse.headers.get('content-length'), 10) || 0;

                        if (size > 10 * 1024 * 1024) {
                            await conn.sendMessage(
                                m.chat,
                                {
                                    document: buffer,
                                    mimetype: 'video/mp4',
                                    fileName: `${title}.mp4`,
                                },
                                { quoted: m }
                            );
                        } else {
                            await conn.sendMessage(
                                m.chat,
                                {
                                    video: buffer,
                                    mimetype: 'video/mp4',
                                },
                                { quoted: m }
                            );
                        }
                    }

                    await m.react('✅');
                    return;
                }
            } catch (err) {
                console.error(`Error con API: ${api}`, err.message);
            }
        }

        throw new Error('No se pudo obtener el enlace de descarga de ninguna API.');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
    }
};

handler.tags = ['dl'];
handler.command = /^ytmp4$/i;
handler.register = true;
handler.Monedas = 3;

export default handler;


/* 
- Downloader Ytmp4 By DarkCore
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
- Parchado por DarkCore... vip plus
*/

/* import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🍟 Ingresa un link de YouTube', m);

    try {
        await m.react('🕒');

        const apiKey = 'xenzpedo';
        const apiUrl = `https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.status || !result.result) {
            throw new Error('Error al obtener datos de la API.');
        }

        const { title, duration, mp3, mp4 } = result.result;

        const durationInSeconds = parseInt(duration);

        let HS = `🍃 *Título :* ${title}\n🍃 *Duración :* ${(durationInSeconds / 60).toFixed(2)} minutos`;

        if (durationInSeconds >= 2400) { 
            await conn.sendMessage(m.chat, { 
                document: { url: mp4 }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`, 
                caption: HS 
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: mp4 }, 
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
handler.command = ['ytmp4'];
handler.tags = ['dl'];

export default handler; */
