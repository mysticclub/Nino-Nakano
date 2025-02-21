import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text }) => {
    if (!text) return conn.reply(message.chat, '*¿Qué quieres buscar en TikTok?*', message);

    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer });
        return videoMessage;
    }

    async function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    try {
        await message.react('🕓');
        conn.reply(message.chat, '*Descargando su video...*', message);

        let apiUrl = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(text)}`;
        let { data: response } = await axios.get(apiUrl);

        if (!response || response.status !== 200 || !response.meta || response.meta.length === 0) {
            return conn.reply(message.chat, '*No se encontraron resultados para tu búsqueda.*', message);
        }

        let results = response.meta.map(result => ({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '🔎 TikTok - Búsquedas' }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: result.title || "Sin título",
                hasMediaAttachment: true,
                videoMessage: await createVideoMessage(result.hd) // URL del video sin marca de agua
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
        }));

        const responseMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: `Resultados de: ${text}` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '🔎 TikTok - Búsquedas' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: results }) // SE USA results AQUÍ
                    })
                }
            }
        }, { quoted: message });

        await message.react('✅');
        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });

    } catch (error) {
        console.error('Error en la búsqueda de TikTok:', error);
    }
};

handler.help = ['tiktoksearch <texto>'];
handler.tags = ['search'];
handler.command = ['tiktoksearch'];
handler.register = true;
handler.corazones = 1;
export default handler;
