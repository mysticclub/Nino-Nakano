import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { randomBytes } from 'crypto';

const handler = async (m, { conn }) => {
    let texting = 'q pasa w';

    await conn.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/brjxwz.jpg' },
        caption: texting,
        footer: 'la cosa es seria chavito\nte amo w',
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                showAdAttribution: true,
                title: 'Sock Ai',
                body: "like your pussycat",
                sourceUrl: "https://instagram.com/c4rl@s_9e",
                thumbnailUrl: 'https://files.catbox.moe/brjxwz.jpg',
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
                                highlight_label: "",
                                rows: [
                                    {
                                        header: 'Message',
                                        title: 'love dog',
                                        description: 'i like pussydog',
                                        id: ".love_dog"
                                    },
                                    {
                                        header: 'Message',
                                        title: 'check ping',
                                        description: 'i like pussycat',
                                        id: ".check_ping"
                                    }
                                ]
                            }
                        ]
                    })
                }
            }
        ],
        viewOnce: true,
        headerType: 1,
    }, { quoted: m });
};

handler.command = ['tesyt'];
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