import { proto, generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
    let Teksnya = `hola`;

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: ''
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: Teksnya
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: []
                    }),
                    contextInfo: {
                        mentionedJid: [m.sender]
                    }
                })
            }
        }
    }, {});

    await conn.relayMessage(m.chat, msg.message, {
        messageId: msg.key.id
    });
};

handler.command = ['sendfooter']; // Puedes cambiar el nombre del comando si lo deseas

export default handler;