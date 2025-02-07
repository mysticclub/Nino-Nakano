const { prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
const { randomBytes } = await import("crypto");

const handler = async (m, { conn }) => {
    try {
        const owned = "owner@s.whatsapp.net"; // Define el propietario
        const pushname = m.pushName || "Usuario"; // Nombre del usuario
        const imageUrl = "https://files.catbox.moe/iejoer.jpg"; // Imagen principal
        const thumbnailUrl = "https://cdn.arifzyn.site/f/sy6tjbzk.jpg"; // Miniatura
        const sourceUrl = "https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z";

        let awal = `Selamat datang kak *${pushname}*`;

        // Prepara la imagen para WhatsApp
        const { imageMessage } = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

        const sections = [
            {
                title: 'Thezy X Fauzialifatah',
                highlight_label: '',
                rows: [
                    {
                        header: '⌬ Message Owner',
                        title: '└ Menampilkan Menu Owner',
                        description: `${global.namabot}`,
                        id: '',
                    },
                    {
                        header: '⌬ Message Group',
                        title: '└ Menampilkan Menu Group',
                        description: `${global.namabot}`,
                        id: '',
                    },
                ],
            },
        ];

        const messageContent = {
            interactiveMessage: {
                body: { text: awal },
                footer: { text: `─ Waktu: *${new Date().toLocaleTimeString()}*\n─ Runtime: *${process.uptime().toFixed(0)}s*` },
                header: {
                    title: "PokPok",
                    subtitle: "Thezy - Chan",
                    hasMediaAttachment: true,
                    documentMessage: {
                        ...imageMessage,
                        pageCount: 1,
                        fileLength: 99999999999,
                        fileName: 'example_file',
                        jpegThumbnail: imageMessage.jpegThumbnail
                    },
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            buttonParamsJson: JSON.stringify({ display_text: 'Owner Botz', id: '.tes' }),
                            name: "quick_reply"
                        },
                        {
                            buttonParamsJson: JSON.stringify({ display_text: 'Supporter', id: '.thxto' }),
                            name: "quick_reply"
                        },
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({ title: "Klick Hare!!", sections: sections })
                        }
                    ],
                    messageParamsJson: "{}",
                    messageVersion: 1
                }
            },
            messageContextInfo: {
                messageSecret: randomBytes(32)
            }
        };

        // Genera y envía el mensaje interactivo
        const message = generateWAMessageFromContent(m.chat, messageContent, { userJid: conn.user.id });
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (error) {
        console.error("Error al enviar el mensaje interactivo:", error);
    }
};

handler.command = ["testr"];

export default handler;