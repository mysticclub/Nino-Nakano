/*
  * ©kyzryzz.t.me
  * Creado por 𝘒𝘺𝘻𝘙𝘺𝘻𝘻 𝘟𝘋
  * Modelo de IA Furina

https://whatsapp.com/channel/0029VaRI1OB2P59cTdJKZh3q

# TITENONO LEK KO HAPUS😂
*/
let handler = async (m, { conn, args, text, command }) => {
    let [chat, teks] = text.split('|');
    const aiList = {
        'furina': "62856586301697@s.whatsapp.net"
    };

    let result = aiList[chat];
    if (!result) {
        return m.reply(`[❗] Uso correcto: /${command} furina|halo`);
    }

    try {
        if (!teks) {
            return m.reply("[❗] Por favor, ingrese el mensaje que desea enviar.");
        }

        let aiThumb = await conn.profilePictureUrl(result, "image");
        await conn.sendMessage(result, { text: teks });
        m.reply("[✅] El mensaje se ha enviado correctamente. Espere la respuesta.");

        if (global.responseListener) {
            conn.ev.off('messages.upsert', global.responseListener);
        }

        global.responseListener = async (msg) => {
            if (msg.messages[0].key.remoteJid === result && msg.messages[0].message?.conversation) {
                const response = msg.messages[0].message.conversation;
                await conn.sendMessage(
                    m.chat,
                    {
                        text: `> Respuesta de la IA - ${chat.toUpperCase()}:\n\n${response}`,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForrwarded: true, 
                            businessMessageForwardInfo: { businessOwnerJid: result },
                            externalAdReply: {
                                title: chat.toUpperCase(),
                                body: "Desarrollado por Kyzryzz",
                                thumbnailUrl: aiThumb,
                                renderLargerThumbnail: false
                            }
                        }
                    },
                    { quoted: m }
                );
            }
        };

        conn.ev.on('messages.upsert', global.responseListener);
    } catch (e) {
        return m.reply(`[❗] Ocurrió un error: ${e.message}`);
    }
};

handler.help = ['aimodel', 'ai-model'];
handler.command = /^(aimodel|model|ai-model)$/i;
handler.tags = ['ai'];

export default handler;