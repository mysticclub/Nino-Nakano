let handler = async (m, { conn, isBotAdmin, isGroup, botname }) => {
    if (!isGroup) return m.reply('❌ Este comando solo puede usarse en grupos.');
    if (!isBotAdmin) return m.reply('🤖 Necesito ser administrador para obtener el enlace del grupo.');

    let response = await conn.groupInviteCode(m.chat);
    let groupLink = `https://chat.whatsapp.com/${response}`;

    await conn.sendMessage(m.chat, { 
        location: { 
            degreesLatitude: 0, 
            degreesLongitude: 0, 
            name: "Klik/Salin Link Grup", 
            address: `© ${botname}`, 
            url: groupLink
        }
    }, { quoted: m });
};

handler.command = ['linkgct', 'linkgroup', 'linkgrup'];

export default handler;