const { prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
const { randomBytes } = await import("crypto");

const handler = async (m, { conn }) => {
    try {
        let txt = `Hola`;
        let img = 'https://i.ibb.co/YDGYRhx/file.jpg';

        await m.react('🤍');

        // Crear mensaje con botones normales
        const message = {
            image: { url: img },
            caption: txt,
            footer: dev,
            buttons: [
                {
                    buttonId: `.ping`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ⍴іᥒg' },
                },
                {
                    buttonId: `.owner`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥆ᥕᥒᥱr' },
                },
            ],
            viewOnce: true,
            headerType: 4,
        };

        // Enviar el primer mensaje con botones normales
        await conn.sendMessage(m.chat, message, { quoted: m });

        // Generar mensaje con nativeFlowInfo
        const nativeFlowMessage = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: {
                            text: 'Klick Hare!!',
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
                                                description: `${global.botname}`,
                                                id: randomBytes(6).toString("hex"),
                                            },
                                            {
                                                header: '⌬ Message Group',
                                                title: '└ Menampilkan Menu Owner',
                                                description: `${global.botname}`,
                                                id: randomBytes(6).toString("hex"),
                                            },
                                        ],
                                    },
                                ],
                            }),
                        },
                    },
                },
            },
        }, {});

        // Enviar mensaje con nativeFlowInfo
        await conn.relayMessage(m.chat, nativeFlowMessage.message, { messageId: nativeFlowMessage.key.id });

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