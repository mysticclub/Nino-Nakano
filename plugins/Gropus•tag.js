import MessageType from '@whiskeysockets/baileys'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
let users = participants.map(u => conn.decodeJid(u.id))
let q = m.quoted ? m.quoted : m
let c = m.quoted ? m.quoted : m.msg
const msg = conn.cMod(m.chat,
generateWAMessageFromContent(m.chat, {
[c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
text: c || ''
}
}, {
userJid: conn.user.id
}),
text || q.text, conn.user.jid, { mentions: users }
)
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}
handler.help = ['n *<mensaje>*']
handler.tags = ['grupo']
handler.command = ['n', 'notify', 'aviso', 'tag'] 
handler.group = true
handler.admin = true

export default handler
