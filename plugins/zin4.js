const { prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
const { randomBytes } = await import("crypto");

const handler = async (m, { conn }) => {
    try {
        const imageUrl = "https://files.catbox.moe/iejoer.jpg"; // Imagen principal
        const thumbnailUrl = "https://cdn.arifzyn.site/f/sy6tjbzk.jpg"; // Miniatura

        const { imageMessage } = await prepareWAMessageMedia({
            image: { url: imageUrl }
        }, { upload: conn.waUploadToServer });

        const sections = [
            {
                title: "Opciones Disponibles",
                rows: [
                    {
                        title: "⌬ Message Owner",
                        description: "└ Menú del propietario",
                        id: ".owner",
                    },
                    {
                        title: "⌬ Message Group",
                        description: "└ Menú de grupos",
                        id: ".group",
                    },
                ],
            },
        ];

        const messageContent = {
            interactiveMessage: {
                body: { text: `Hola *${m.pushName}*, bienvenido!` },
                footer: { text: `─ Waktu: *${new Date().toLocaleTimeString()}*\n─ Runtime: *${process.uptime().toFixed(0)}s*` },
                header: {
                    title: "PokPok",
                    subtitle: "Thezy - Chan",
                    hasMediaAttachment: true,
                    documentMessage: {
                        ...imageMessage,
                        pageCount: 1,
                        fileLength: 99999999999,
                        fileName: 'info',
                        jpegThumbnail: imageMessage.jpegThumbnail
                    },
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            buttonParamsJson: JSON.stringify({
                                display_text: "Owner Botz",
                                id: ".owner"
                            }),
                            name: "quick_reply"
                        },
                        {
                            buttonParamsJson: JSON.stringify({
                                display_text: "Supporter",
                                id: ".thxto"
                            }),
                            name: "quick_reply"
                        },
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Más opciones",
                                sections: sections,
                            }),
                        }
                    ],
                    messageParamsJson: "{}",
                    messageVersion: 1
                }
            },
            messageContextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    showAdAttribution: true,
                    title: "PokPok",
                    body: "Thezy - Chan",
                    thumbnailUrl: thumbnailUrl,
                    sourceUrl: "https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z",
                    mediaType: 1,
                    renderLargerThumbnail: false
                },
                messageSecret: randomBytes(32)
            }
        };

        const message = generateWAMessageFromContent(m.chat, messageContent, { userJid: conn.user.id });
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (error) {
        console.error("Error al enviar el mensaje interactivo:", error);
    }
};

handler.command = ["testr"];

export default handler;