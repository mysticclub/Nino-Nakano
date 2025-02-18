import fetch from 'node-fetch' const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text }) => { if (!text) return m.reply('Ingresa el nombre de la app que quieres buscar en F-Droid 🤍'); await m.react('🕓');

try {
    let api = await fetch(`https://apikaizeljs.us.kg/fdroid?query=${encodeURIComponent(text)}&apiKey=kai`);
    let json = await api.json();

    if (!json.results || json.results.length === 0) {
        await m.reply('No se encontraron resultados para tu búsqueda. 😕');
        return;
    }

    async function createImage(url) {
        const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
        return imageMessage;
    }

    let push = [];
    for (let app of json.results.slice(0, 10)) { // Limita a 10 resultados para evitar sobrecarga
        let image = await createImage(app.LinkGambar);

        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `◦ *Nombre:* ${app.title}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: 'Selecciona una opción:'
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '',
                hasMediaAttachment: true,
                imageMessage: image
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        "name": "cta_url",
                        "buttonParamsJson": `{"display_text":"📥 Descargar","url":"${app.apkUrl}"}`
                    }
                ]
            })
        });
    }

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {},
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({ text: '*Resultados de:* ' + text }),
                    footer: proto.Message.InteractiveMessage.Footer.create({ text: '_Búsqueda en F-Droid_' }),
                    header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: push })
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
    await m.reply('Hubo un error al buscar la aplicación. Inténtalo de nuevo más tarde.');
}

}

handler.help = ["fdroidsearch <texto>"] handler.tags = ["search"]
handler.command = /^(fdroidsearch)$/i

export default handler;

