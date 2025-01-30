import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply('Ingresa el texto de lo que quieres buscar en Bing 🤍');
    await m.react('🕓');

    try {
        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
            return imageMessage;
        }

        let push = [];
        let api = await fetch(`https://vapis.my.id/api/bingimg?q=${encodeURIComponent(text)}`);
        let json = await api.json();

        for (let img of json.data) {
            // Usa la URL de la imagen (campo 'photo' de la respuesta API)
            let image = await createImage(img.photo);

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `🌍 *Imagen encontrada en Bing*`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: ''
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: image // Asigna la imagen aquí
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            "name": "cta_copy",
                            "buttonParamsJson": `{"display_text":"🔗 Ver Imagen","id":"123456789","copy_code":"${img.photo}"}`
                        }
                    ]
                })
            });
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: '*`\Resultados de:\`* ' + `${text}` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '_\`B\` \`I\` \`N\` \`G\`_' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
                    })
                }
            }
        }, { 'quoted': m });

        await m.react('✅');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    } catch (error) {
        console.error(error);
    }
};

handler.help = ["bingimg *<texto>*"];
handler.tags = ["search"];
handler.command = /^(bingimg)$/i;

export default handler;