import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {

let txt = `> *YouTube Play 🍧.*\n\n`;
txt += `hola\n\n`;
txt += `• *Duración:*\n`;
txt += `• *Autor:*\n`;
txt += `• *Publicado:*\n`;
txt += `• *Url:*\n\n`;
await conn.sendMessage(m.chat, {
    image: { url: 'https://i.ibb.co/Rpsxjb5t/file.jpg' },
    caption: txt,
    footer: 'la cosa es seria chavito\nte amo w',
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
    },
    buttons: [
        {
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '⊹₊ ⋆ᯓᡣ𐭩 rᥱsᥙᥣ𝗍ᥲძ᥆s ᥡ᥆ᥙ𝗍ᥙᑲᥱ',
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
        {
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: '⊹₊ ⋆ᯓᡣ𐭩 rᥱsᥙᥣ𝗍ᥲძ᥆s s⍴᥆𝗍і𝖿ᥡ',
                    sections: [
                        {
                            title: 'Options',
                            highlight_label: '',
                            rows: [
                                {
                                    header: '⌬ Tools',
                                    title: 'Tool 1',
                                    description: 'Use this tool',
                                    id: ".tool1"
                                },
                                {
                                    header: '⌬ Tools',
                                    title: 'Tool 2',
                                    description: 'Use this another tool',
                                    id: ".tool2"
                                },
                            ],
                        },
                    ],
                }),
            },
        },
        {
            buttonId: '.ping',
            buttonText: { displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆' },
            type: 1,
        },
        {
            buttonId: '.tqto',
            buttonText: { displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆' },
            type: 1,
        },
    ],
    headerType: 1,
    viewOnce: true
}, { quoted: m });

};

handler.command = ['tesyt']; 
export default handler;

