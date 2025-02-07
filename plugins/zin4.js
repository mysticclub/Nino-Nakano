const { prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
const { randomBytes } = await import("crypto");

const handler = async (m, { conn }) => {
    try {
        let img = 'https://files.catbox.moe/iejoer.jpg'; // Imagen principal
        let thumbnail = 'https://cdn.arifzyn.site/f/sy6tjbzk.jpg'; // Imagen en el link superior
        let botname = global.botname || "MiBot"; // Asegurar que `global.botname` esté definido

        await m.react('🤍');

        // Crear mensaje con todo incluido
        const message = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: `Selamat datang kak *${m.pushName}*` }, // Mensaje de bienvenida
                        footer: `─ Waktu: *Selamat Subuh*\n─ Runtime: *3 hours, 7 minutes, 19 seconds*`,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            forwardingScore: 999,
                            isForwarded: true,
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `PokPok`,
                                body: "Thezy - Chan",
                                thumbnailUrl: thumbnail,
                                sourceUrl: "https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z",
                                mediaType: 1,
                                renderLargerThumbnail: false,
                            },
                        },
                        nativeFlowMessage: {
                            name: 'single_select',
                            paramsJson: JSON.stringify({
                                title: 'Klick Hare!!',
                                sections: [
                                    {
                                        title: 'Thezy X Fauzialifatah',
                                        highlight_label: '',
                                        rows: [
                                            {
                                                header: '⌬ Message Owner',
                                                title: '└ Menampilkan Menu Owner',
                                                description: botname,
                                                id: randomBytes(6).toString("hex"),
                                            },
                                            {
                                                header: '⌬ Message Group',
                                                title: '└ Menampilkan Menu Owner',
                                                description: botname,
                                                id: randomBytes(6).toString("hex"),
                                            },
                                        ],
                                    },
                                ],
                            }),
                        },
                        buttons: [
                            {
                                buttonId: '.tes',
                                buttonText: { displayText: 'Owner Botz' },
                                type: 1,
                            },
                            {
                                buttonId: '.thxto',
                                buttonText: { displayText: 'Supporter' },
                                type: 1,
                            },
                        ],
                        header: {
                            imageMessage: (await prepareWAMessageMedia({ image: { url: img } }, { upload: conn.waUploadToServer })).imageMessage,
                        },
                    },
                },
            },
        }, {});

        // Enviar mensaje con todo en un solo envío
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (e) {
        console.error(e);
    }
};

handler.command = ['test'];
export default handler;


/* let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `Hola`
  let img = 'https://i.ibb.co/YDGYRhx/file.jpg'

    await m.react('🤍')
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: txt,
      footer: dev,
      buttons: [
        {
          buttonId: `.ping`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ⍴іᥒg',
          },
        },
        {
          buttonId: `.owner`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥆ᥕᥒᥱr',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m })
}
handler.command = ['test']
export default handler */