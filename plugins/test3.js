const Handler = async function (m, { conn, isAdmin }) {
    if (!m.isGroup) return m.reply('Perintah ini hanya dapat digunakan dalam grup.');
    if (!isAdmin) return m.reply('Perintah ini hanya dapat digunakan oleh admin grup.');
    let zand = m.mentionedJid && m.mentionedJid[0];
    if (!zand) return m.reply('Tag nomor pengguna yang ingin ditandai menggunakan @ atau balas pesan pengguna.');
    const zand1 = await conn.groupMetadata(m.chat);
    const zand2 = zand1.participants.find((p) => p.id === zand)?.admin;
    if (zand2) return m.reply('Tidak dapat menandai atau mengeluarkan admin grup.');
    global.zand3 = global.zand3 || {};
    global.zand3[m.chat] = global.zand3[m.chat] || {};

    let zand4 = global.zand3[m.chat][zand]?.marks || 0;
    zand4 += 1;
    global.zand3[m.chat][zand] = { marks: zand4, zand5: false };
    let zand6 = zand.split('@')[0];
    if (zand4 >= 5) {
        m.reply(`⚠️ Nomor *${zand6}* telah ditandai sebanyak 5 kali. Dalam 5 detik berikutnya, atau jika dia mengirim pesan, dia akan dikeluarkan😘.`);
        global.zand3[m.chat][zand].zand5 = true;
        setTimeout(() => {
            if (global.zand3[m.chat][zand]?.zand5) {
                delete global.zand3[m.chat][zand];
                conn.groupParticipantsUpdate(m.chat, [zand], 'remove');
                m.reply(`👋 Nomor *${zand6}* telah dikeluarkan dari grup setelah masa siap kick😘.`);
            }
        }, 5000);
    } else {
        m.reply(`🔖 Nomor *${zand6}* telah ditandai sebanyak ${zand4} kali. Jika mencapai 5 tanda, dia akan berada dalam masa siap kick.😘`);
    }
};

Handler.before = async function (m, { conn }) {
    if (!m.isGroup || !global.zand3 || !global.zand3[m.chat]) return;
    let zand7 = global.zand3[m.chat];
    let zand8 = zand7[m.sender];
    if (zand8 && zand8.zand5) {
        delete zand7[m.sender];
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        m.reply(`👋 Nomor *${m.sender.split('@')[0]}* telah dikeluarkan dari grup setelah mengirim pesan terakhir😘.`);
    }
};
handler.help = ['tandai @user'];
handler.tags = ['group'];
handler.command = /^(tandai)$/i;
handler.admin = true;
handler.group = true;
export default handler;