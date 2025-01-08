import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('🎉');

    // Información de contacto (vCard)
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;  ૈANGELITO 🍃\nNICKNAME:👤 іzᥙmі.kz᥊\nORG: ૈіzᥙmі.kz᥊ ᰔᩚ\nTITLE:soft\nitem1.TEL;waid=59897246324:+598 97 246 324\nitem1.X-ABLabel:📞 WhatsApp Owner\nitem2.URL:https://github.com/Angelito-OFC\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: agasistencia2@gmail.com\nitem3.X-ABLabel:💌 Correo soporte\nitem4.ADR:;;🇦🇷 Argentina;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel: Localización 🫧\nBDAY;value=date:🤍 09-12-2007\nEND:VCARD`;

    // Definir las variables 'dev' y 'channels'
    let dev = "Soy el creador de este bot";
    let channels = "https://github.com/Angelito-OFC"; // Enlace del canal o fuente

    // Asegurarnos de que 'm.mentionedJid' no sea undefined ni null
    let who = (m.mentionedJid && m.mentionedJid[0]) || m.sender;
    let username = await conn.getName(who);

    // Asegurarnos de que el nombre esté correctamente definido
    if (!username) {
        username = "Usuario desconocido";
    }

    // Enviar mensaje con el vCard del creador y detalles adicionales
    await conn.sendMessage(m.chat, {
        contextInfo: {
            externalAdReply: {
                title: 'ᥣᥣᥲmᥲ - ᥲі ⍴᥆ᥕᥱr ᑲᥡ mᥱ𝗍ᥲ',
                body: dev,
                thumbnailUrl: 'https://files.catbox.moe/j791b7.jpeg',
                sourceUrl: channels,
                mediaType: 1,
                renderLargerThumbnail: true
            },
            contacts: { 
                displayName: "Creador",
                contacts: [{ vcard }] 
            }
        }
    }, { quoted: m });

    // Texto que se enviará junto con el mensaje
    let txt = `👋 *Hola \`${username}\` este es*\n*el contacto de mi creador*`;

    // Enviar mensaje con botones y pie de página
    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '© ᥴrᥱᥲძ᥆r ᥆𝖿іᥴіᥲᥣ іzᥙmі.kz᥊',
        buttons: [
            {
                buttonId: ".menu",
                buttonText: {
                    displayText: 'MENU BOT'
                },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 1
    }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;