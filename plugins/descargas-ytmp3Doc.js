import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply('Ingresa el texto de lo que quieres buscar en HappyMod 🤍');
  await m.react('🕓');

  try {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({image: { url }}, {upload: conn.waUploadToServer})
      return imageMessage
    }

    let push = [];
    let api = await fetch(`https://dark-core-api.vercel.app/api/happymodsearch?key=TWIzumi&text=${encodeURIComponent(text)}`);
    let json = await api.json();

    for (let app of json.results) {
      let image = await createImage(app.image)

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `◦ *Nombre:* ${app.name} \n◦ *Valoración:* ${app.stars} ⭐ \n◦ *Enlace:* ${app.link}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: null
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
              "buttonParamsJson": "{\"display_text\":\"🔗 Descargar APK\",\"id\":\"123456789\",\"copy_code\":\".download " + app.link + "\"}"
            },
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
            footer: proto.Message.InteractiveMessage.Footer.create({text: '_\`ꜱ\` \`ᴘ\` \`-\` \`ꜱ\` \`ᴇ\` \`ᴀ\` \`ʀ\` \`c\`h\`_'}),
            header: proto.Message.InteractiveMessage.Header.create({hasMediaAttachment: false}),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({cards: [...push]})
          })
        }
      }
    }, {
      'quoted': m
    });

    await m.react('✅');
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  } catch (error) {
    console.error(error)
  }
}

handler.help = ["happymodsearch *<texto>*"]
handler.tags = ["search"]
handler.command = /^(happymodsearch)$/i

export default handler