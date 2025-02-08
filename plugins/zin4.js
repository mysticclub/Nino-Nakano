import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, {
        image: { url: 'https://i.ibb.co/JDswhPq/file.jpg' },
        caption: 'i like y',
        footer: 'la cosa es seria chavito\nte amo w',
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
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
                                        title: 'menu all',
                                        description: 'i like pussydog',
                                        id: ".menu"
                                    },
                                    {
                                        header: '⌬ Message',
                                        title: 'check ping',
                                        description: 'i like pussycat',
                                        id: ".ping"
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
    }, { quoted: m });
};

handler.command = ['tesyt'];
export default handler;