import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/brjxwz.jpg' },
        caption: 'i like y',
        footer: 'la cosa es seria chavito\nte amo w',
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: true,
                thumbnailUrl: 'https://files.catbox.moe/brjxwz.jpg',
                sourceUrl: "https://instagram.com/c4rl0s_9e",
                mediaType: 1,
                renderLargerThumbnail: false
            }
        },
        buttons: [
            {
                buttonId: '.ping',
                buttonText: { displayText: 'ping' },
                type: 1,
            },
            {
                buttonId: '.tqto',
                buttonText: { displayText: 'tqto' },
                type: 1,
            },
            {
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: 'Dont click',
                        sections: [
                            {
                                title: 'my focking bicht',
                                highlight_label: '',
                                rows: [
                                    {
                                        header: '⌬ Message',
                                        title: 'love dog',
                                        description: 'i like pussydog',
                                        id: ".love_dog"
                                    },
                                    {
                                        header: '⌬ Message',
                                        title: 'check ping',
                                        description: 'i like pussycat',
                                        id: ".check_ping"
                                    },
                                ],
                            },
                        ],
                    }),
                },
            },
        ],
        headerType: 1,
        viewOnce: true
    }, { quoted: m }); // Agrega el mensaje citado
};

handler.command = ['tesyt'];
export default handler;