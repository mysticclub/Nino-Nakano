/*
  * ©kyzryzz.t.me
  * Created by 𝘒𝘺𝘻𝘙𝘺𝘻𝘻 𝘟𝘋
  * ai model furina

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
        return m.reply(`[❗] Penggunaan: /${command} furina|halo`);
    }

    try {
        if (!teks) {
            return m.reply("[❗] Silakan masukkan pesan yang ingin dikirim.");
        }

        let aiThumb = await conn.profilePictureUrl(result, "image");
        await conn.sendMessage(result, { text: teks });
        m.reply("[✅] Pesan berhasil diteruskan. Mohon tunggu balasan.");

        if (global.responseListener) {
            conn.ev.off('messages.upsert', global.responseListener);
        }

        global.responseListener = async (msg) => {
            if (msg.messages[0].key.remoteJid === result && msg.messages[0].message?.conversation) {
                const response = msg.messages[0].message.conversation;
                await conn.sendMessage(
                    m.chat,
                    {
                        text: `> Balasan dari AI - ${chat.toUpperCase()}:\n\n${response}`,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForrwarded: true, 
                            businessMessageForwardInfo: { businessOwnerJid: result },
                            externalAdReply: {
                                title: chat.toUpperCase(),
                                body: "Powered By Kyzryzz",
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
        return m.reply(`[❗] Terjadi kesalahan: ${e.message}`);
    }
};

handler.help = ['aimodel', 'ai-model'];
handler.command = /^(aimodel|model|ai-model)$/i;
handler.tags = ['ai'];

export default handler;