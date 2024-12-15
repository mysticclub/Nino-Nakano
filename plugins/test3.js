const handler = async function (m, { conn, isAdmin }) {
    if (!m.isGroup) return m.reply('Perintah ini hanya dapat digunakan dalam grup.');
    if (!isAdmin) return m.reply('Perintah ini hanya dapat digunakan oleh admin grup.');
    let zand = m.mentionedJid && m.mentionedJid[0];
    if (!zand) return m.reply('Etiqueta el número de usuario que deseas etiquetar usando @ o responde al mensaje del usuario.');
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
        m.reply(`⚠️ El número *${zand6}* ha sido etiquetado 5 veces. En los próximos 5 segundos, o si envía un mensaje, será expulsado😘.`);
        global.zand3[m.chat][zand].zand5 = true;
        setTimeout(() => {
            if (global.zand3[m.chat][zand]?.zand5) {
                delete global.zand3[m.chat][zand];
                conn.groupParticipantsUpdate(m.chat, [zand], 'remove');
                m.reply(`👋 El número *${zand6}* ha sido eliminado del grupo después del período de inicio😘.`);
            }
        }, 5000);
    } else {
        m.reply(`🔖 El número *${zand6}* ha sido etiquetado ${zand4} veces. Si alcanza las 5 marcas, estará en el período de patada lista.😘`);
    }
};

handler.before = async function (m, { conn }) {
    if (!m.isGroup || !global.zand3 || !global.zand3[m.chat]) return;
    let zand7 = global.zand3[m.chat];
    let zand8 = zand7[m.sender];
    if (zand8 && zand8.zand5) {
        delete zand7[m.sender];
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        m.reply(`👋 El número *${m.sender.split('@')[0]}* ha sido eliminado del grupo después de enviar el último mensaje😘.`);
    }
};
handler.help = ['tandai @user'];
handler.tags = ['group'];
handler.command = /^(tandai)$/i;
handler.admin = true;
handler.group = true;
export default handler;