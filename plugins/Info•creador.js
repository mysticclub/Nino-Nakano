import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('☁️');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);

    // VCARD
    let list = [{
        displayName: "Izumi.kzx ☁️",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: Izumi-kzx\nitem1.TEL;waid=59897246324:59897246324\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: izumipluss@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://genesis-support.vercel.app/\nitem3.X-ABLabel:Internet\nitem4.ADR:;; Argentina;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'һ᥆ᥣᥲ s᥆ᥡ іzᥙmі-kz᥊ ᥱᥣ mᥱȷ᥆r',
                body: '© ᥴrᥱᥲძ᥆r ᥆𝖿іᥴіᥲᥣ іzᥙmі.kz᥊',
                thumbnailUrl: 'https://i.ibb.co/44XMFDQ/file.jpg',
                sourceUrl: canal,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    });

    let txt = `👋 *Hola \`${username}\` este es*\n*el contacto de mi creador*`;

  /*  await conn.sendMessage(m.chat, {
        text: txt,
        footer: '© ᥴrᥱᥲძ᥆r ᥆𝖿іᥴіᥲᥣ іzᥙmі.kz᥊',
        buttons: [
            {
                buttonId: ".menu",
                buttonText: {
                    displayText: '⊹₊ ⋆ᯓᡣ𐭩 mᥱᥒᥙ ᥴ᥆m⍴ᥣᥱ𝗍᥆'
                },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 1
    }, { quoted: m }); */
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;