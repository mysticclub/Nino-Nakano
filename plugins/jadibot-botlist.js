/* import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ws from 'ws'

async function handler(m, { conn, usedPrefix, command }) {
  // carpetas creadas
  const __filename = fileURLToPath(import.meta?.url)
  const __dirname = path?.dirname(__filename)
  const carpetaBase = path?.resolve(__dirname, '..', 'GenesisJadiBot')
  const cantidadCarpetas = (fs?.readdirSync(carpetaBase, { withFileTypes: true }).filter(item => item?.isDirectory())?.length) || 0

  // servidor
  let _uptime = process.uptime() * 1000
  let uptime = convertirMs(_uptime)
  // imágenes
  let img = [ 
    'https://i.ibb.co/VYMKmbM/file.jpg',
    'https://i.ibb.co/Zf4YQqC/file.jpg',
    'https://i.ibb.co/10QK4kb/file.jpg'
  ].getRandom()

  const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]

  const message = users.map((v, index) => `👤 \`[${index + 1}]\` *${v.user.name || global.db.data.users[v.user.jid]?.name || 'Anónimo' }*
⏱️ \`\`\`${v.uptime ? convertirMs(Date.now() - v.uptime) : "Desconocido"}\`\`\`
☁️ wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot+code`).join('\n\n∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵\n\n')
  const replyMessage = message.length === 0 ? `*NO HAY SUB BOTS DISPONIBLE. VERIFIQUE MÁS TARDE.*\n🍧 wa.me/${conn.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot%20code` : message
  const totalUsers = users.length
  const responseMessage = `🍥 *LISTA DE SUB-BOTS V${vsJB}*\n
\`¡Conviértete en sub bot desde otros sub bots!\`\n
🔄 *Auto conexión automática*

${totalUsers ? `🍧 *Sub Bots conectados:* ${totalUsers || 0}\n` : ''}${cantidadCarpetas ? `📁 *Sesiones creadas:* ${cantidadCarpetas}\n` : ''}${totalUsers ? `📁 *Sesiones activas:* ${totalUsers || 0}\n` : ''}💻 *Servidor:* \`\`\`${uptime}\`\`\`\n\n${replyMessage.trim()}`.trim()

  if (m.isWABusiness) {
    await conn.sendFile(m.chat, img, 'error.jpg', responseMessage + `\n ¿Quieres ser subbot?\n *.serbot code*\n *.serbot*`, m, null, fake)
  } else {
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: responseMessage,
      footer: '¡Hazte Subbot con la opción que desees!',
      buttons: [
        {
          buttonId: `.serbot code`,
          buttonText: {
            displayText: 'CODE',
          },
        },
        {
          buttonId: `.serbot`,
          buttonText: {
            displayText: 'QR',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m })
  }
}
handler.command = /^(listjadibots|bots|subsbots)$/i
export default handler

function convertirMs(ms) {
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000) % 24;
  const d = Math.floor(ms / 86400000);
  return [ d > 0 ? `${d}d` : "", `${h}h`, `${m}m`, `${s}s` ].filter(Boolean).join(" ")
} */



/* import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ws from 'ws'

async function handler(m, { conn, usedPrefix, command }) {
// carpetas creadas
const __filename = fileURLToPath(import.meta?.url)
const __dirname = path?.dirname(__filename)
const carpetaBase = path?.resolve(__dirname, '..', 'GenesisJadiBot')
const cantidadCarpetas = (fs?.readdirSync(carpetaBase, { withFileTypes: true }).filter(item => item?.isDirectory())?.length) || 0

// servidor
let _uptime = process.uptime() * 1000
let uptime = convertirMs(_uptime)
// imagenes
let img = [ 
'https://i.ibb.co/VYMKmbM/file.jpg',
'https://i.ibb.co/Zf4YQqC/file.jpg',
'https://i.ibb.co/10QK4kb/file.jpg'
].getRandom()

const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]

const message = users.map((v, index) => `👤 \`[${index + 1}]\` *${v.user.name || global.db.data.users[v.user.jid]?.name || 'Anónimo' }*
⏱️ \`\`\`${v.uptime ? convertirMs(Date.now() - v.uptime) : "Desconocido"}\`\`\`
☁️ wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot+code`).join('\n\n∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵\n\n')
const replyMessage = message.length === 0 ? `*NO HAY SUB BOTS DISPONIBLE. VERIFIQUE MÁS TARDE.*\n🍧 wa.me/${conn.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot%20code` : message
const totalUsers = users.length
const responseMessage = `🍥 *LISTA DE SUB-BOTS V${vsJB}*\n
\`¡Conviértete en sub bot desde otros sub bots!\`\n
🔄 *Auto conexión automática*

${totalUsers ? `🍧 *Sub Bots conectados:* ${totalUsers || 0}\n` : ''}${cantidadCarpetas ? `📁 *Sesiones creadas:* ${cantidadCarpetas}\n` : ''}${totalUsers ? `📁 *Sesiones activas:* ${totalUsers || 0}\n` : ''}💻 *Servidor:* \`\`\`${uptime}\`\`\`\n\n${replyMessage.trim()}`.trim()

if (m.isWABusiness) {
await conn.sendFile(m.chat, img, 'error.jpg', responseMessage + `\n quieres ser subbot\n *.serbot code*\n *.serbot*`, m, null, fake)
} else {
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: responseMessage,
      footer: '¡Hazte Subbot Con la opcion que desees!',
      buttons: [
        {
          buttonId: `.serbot code`,
          buttonText: {
            displayText: 'CODE',
          },
        },
        {
          buttonId: `.serbot`,
          buttonText: {
            displayText: 'QR',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m })
}
handler.command = /^(listjadibots|bots|subsbots)$/i
export default handler

function convertirMs(ms) {
const s = Math.floor(ms / 1000) % 60;
const m = Math.floor(ms / 60000) % 60;
const h = Math.floor(ms / 3600000) % 24;
const d = Math.floor(ms / 86400000);
return [ d > 0 ? `${d}d` : "", `${h}h`, `${m}m`, `${s}s` ].filter(Boolean).join(" ")
}*/