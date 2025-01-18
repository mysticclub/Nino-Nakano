import db from '../lib/database.js'
import { createHash } from 'crypto';
let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6);
conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', `乂 N U M E R O - D E - S E R I E 乂`, 'status@broadcast')
}
handler.help = ['mysn']
handler.tags = ['start']
handler.command = /^(mysn|sn)$/i
handler.register = true
export default handler