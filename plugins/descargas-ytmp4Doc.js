import { proto, generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
    let footerText = `Your teks`; // Puedes cambiar el texto del footer aquí.

    let msgContent = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: '' },
                    footer: { text: footerText },
                    nativeFlowMessage: { buttons: [] },
                    contextInfo: {
                        mentionedJid: [m.sender]
                    }
                }
            }
        }
    };

    let msg = generateWAMessageFromContent(m.chat, msgContent, {});
    
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = ['sendfooter']; // Comando para ejecutar el plugin

export default handler;