import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply('Ingresa el texto de lo que quieres buscar en APKPure.');
    await m.react('🕓');

    try {
        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent({image: { url }}, {upload: conn.waUploadToServer});
            return imageMessage;
        }

        let push = [];
        let api = await fetch(`https://api.siputzx.my.id/api/apk/apkpure?search=${encodeURIComponent(text)}`);
        let json = await api.json();

        let imageUrl = 'https://i.ibb.co/zH2tQMFJ/file.jpg';

        for (let item of json.data) {
            let image = await createImage(item.icon);

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `◦ *Título:* ${item.title} \n◦ *Desarrollador:* ${item.developer} \n◦ *Calificación:* ${item.rating.display} \n◦ *Enlace:* ${item.link}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: '' 
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: image 
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            "name": "cta_copy",
                            "buttonParamsJson": `{"display_text":"🎧 ¡Descargar APK! 🎧","id":"123456789","copy_code":".apk ${item.link}"}`
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
                        body: proto.Message.InteractiveMessage.Body.create({text: '*`\Resultados de:\`* ' + `${text}`}),
                        footer: proto.Message.InteractiveMessage.Footer.create({text: '_\`ꜱ\` \`ᴘ\`-\`ꜱ\` \`ᴇ\` \`ᴀ\` \`ʀ\` \`c\` \`ʜ\`_'}),
                        header: proto.Message.InteractiveMessage.Header.create({hasMediaAttachment: false}),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({cards: [...push]})
                    })
                }
            }
        }, {
            'quoted': m
        });

        await m.react('✅');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    } catch (error) {
        console.error(error);
    }
}

handler.help = ["apksearch *<texto>*"];
handler.tags = ["search"];
handler.command = /^(apksearch)$/i;

export default handler;