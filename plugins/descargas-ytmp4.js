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
            `https://mahiru-shiina.vercel.app/download/ytmp4?url=${encodeURIComponent(text)}`,
            `https://api.agungny.my.id/api/youtube-video?url=${encodeURIComponent(text)}`
        ];

        let result;
        for (const api of apis) {
            try {
                const response = await fetch(api);
                result = await response.json();
                if (result.status && result.result && result.result.downloadUrl) {
                    const { title, downloadUrl } = result.result;

                    const videoFileResponse = await fetch(downloadUrl);
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
