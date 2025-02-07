const { generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;

const handler = async (m, { conn }) => {
    try {
        const pushname = m.pushName || "Usuario";
        const imageUrl = "https://files.catbox.moe/iejoer.jpg";
        const thumbnailUrl = "https://cdn.arifzyn.site/f/sy6tjbzk.jpg";
        const sourceUrl = "https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z";

        let awal = `Selamat datang kak *${pushname}*`;

        const messageContent = {
            viewOnceMessage: {
                message: {
                    imageMessage: {
                        url: imageUrl,
                        caption: awal,
                        footer: `─ Waktu: *${new Date().toLocaleTimeString()}*\n─ Runtime: *${process.uptime().toFixed(0)}s*`,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            forwardingScore: 999,
                            isForwarded: true,
                            externalAdReply: {
                                showAdAttribution: true,
                                title: "PokPok",
                                body: "Thezy - Chan",
                                thumbnailUrl: thumbnailUrl,
                                sourceUrl: sourceUrl,
                                mediaType: 1,
                                renderLargerThumbnail: false
                            }
                        }
                    }
                }
            }
        };

        const buttonsMessage = {
            buttonsMessage: {
                contentText: awal,
                footerText: `─ Waktu: *${new Date().toLocaleTimeString()}*\n─ Runtime: *${process.uptime().toFixed(0)}s*`,
                buttons: [
                    { buttonId: '.tes', buttonText: { displayText: 'Owner Botz' }, type: 1 },
                    { buttonId: '.thxto', buttonText: { displayText: 'Supporter' }, type: 1 }
                ],
                headerType: 4,
                contextInfo: {
                    externalAdReply: {
                        title: "PokPok",
                        body: "Thezy - Chan",
                        mediaType: 1,
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: sourceUrl
                    }
                }
            }
        };

        const menuMessage = {
            interactiveMessage: {
                body: { text: awal },
                footer: { text: `─ Waktu: *${new Date().toLocaleTimeString()}*\n─ Runtime: *${process.uptime().toFixed(0)}s*` },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Klick Hare!!",
                                sections: [
                                    {
                                        title: "Thezy X Fauzialifatah",
                                        highlight_label: '',
                                        rows: [
                                            {
                                                header: '⌬ Message Owner',
                                                title: '└ Menampilkan Menu Owner',
                                                description: "Bot Menu",
                                                id: ''
                                            },
                                            {
                                                header: '⌬ Message Group',
                                                title: '└ Menampilkan Menu Group',
                                                description: "Group Menu",
                                                id: ''
                                            }
                                        ]
                                    }
                                ]
                            })
                        }
                    ],
                    messageParamsJson: "{}",
                    messageVersion: 1
                }
            }
        };

        await conn.relayMessage(m.chat, generateWAMessageFromContent(m.chat, messageContent, {}), {});
        await conn.relayMessage(m.chat, generateWAMessageFromContent(m.chat, buttonsMessage, {}), {});
        await conn.relayMessage(m.chat, generateWAMessageFromContent(m.chat, menuMessage, {}), {});

    } catch (error) {
        console.error("❌ Error al enviar el mensaje interactivo:", error);
    }
};

handler.command = ["testr"];

export default handler;