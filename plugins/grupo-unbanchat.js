let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = false

    m.reply('CHAT DESBANEADO')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^(unbanchat|ubnc)$/i
handler.command = ['banchat']
handler.botAdmin = true
handler.admin = true 
handler.group = true

export default handler