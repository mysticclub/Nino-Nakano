import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Ingresa el nombre de la APK que quieres buscar.');
    await m.react('⏳');

    try {
        async function createImage(url) {
            try {
                const { imageMessage } = await generateWAMessageContent(
                    { image: { url } },
                    { upload: conn.waUploadToServer }
                );
                return imageMessage;
            } catch (err) {
                console.error('Error al generar la imagen:', err);
                return null;
            }
        }

        let apiResponse = await fetch(`https://dark-core-api.vercel.app/api/search/APKDetails?key=777izumi&query=${encodeURIComponent(text)}`);
        let json = await apiResponse.json();

        if (!json.success || !Array.isArray(json.data) || json.data.length === 0) {
            return m.reply('⚠️ No se encontraron resultados.');
        }

        let carouselItems = [];

        for (let apk of json.data) {
            let image = await createImage(apk.imageUrl);
            
            let card = proto.Message.InteractiveMessage.CarouselMessage.Card.fromObject({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `📌 *Nombre:* ${apk.title}\n📥 *Versión:* ${apk.version}\n👨‍💻 *Desarrollador:* ${apk.developer}\n🔗 *Enlace:* ${apk.link}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: ''
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: apk.title,
                    hasMediaAttachment: !!image,
                    imageMessage: image || null
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: "cta_copy",
                            buttonParamsJson: JSON.stringify({
                                display_text: "📥 Descargar APK",
                                id: "123456789",
                                copy_code: `.apkdroid ${apk.link}`
                            })
                        }
                    ]
                })
            });

            carouselItems.push(card);
        }

        const messageContent = generateWAMessageFromContent(m.chat, {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                    text: `🔍 *Resultados de búsqueda:* ${text}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "_`APK Search`_\n• Pulsa el botón para copiar el enlace y descargar."
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                    hasMediaAttachment: false
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                    cards: carouselItems
                })
            })
        }, { quoted: m });

        await conn.relayMessage(m.chat, messageContent.message, { messageId: messageContent.key.id });
        await m.react('✅');

    } catch (error) {
        console.error('Error en el handler:', error);
        m.reply('❌ Ocurrió un error al buscar la APK.');
    }
};

handler.help = ["apkdroidsearch *<texto>*"];
handler.tags = ["search"];
handler.command = ["apkdroidsearch"];

export default handler;