import ws from 'ws'

let handler = async (m, { conn, usedPrefix, isRowner }) => {
    let totalreg = Object.keys(global.db.data.users).length
    let totalchats = Object.keys(global.db.data.chats).length
    let pp = 'https://i.ibb.co/CKggFFc/file.jpg'

    // Inicializar `_muptime` con `process.uptime()`
    let _muptime = process.uptime() * 1000 

    if (process.send) {
        process.send('uptime')
        _muptime = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(() => resolve(process.uptime()), 1000) // Backup en caso de error
        }) * 1000
    }

    // Asegurar que `_muptime` es un número válido
    if (isNaN(_muptime)) {
        console.log('Error: _muptime es NaN. Usando process.uptime()');
        _muptime = process.uptime() * 1000
    }

    let muptime = clockString(_muptime)

    // SubBots Activos (Conexiones WebSocket activas)
    let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
    const totalUsers = users.length

    // Chats y Grupos
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))

    // Calcular velocidad
    let old = performance.now()
    let neww = performance.now()
    let speed = (neww - old).toFixed(3) // Redondeado a 3 decimales

    let txt = `☁️ \`\`\`Información - Genesis\`\`\` ☁️\n\n`
    txt += `☁️꙰᠁❥ *◜Creador◞* ⇢ Izumi.kzx\n`
    txt += `☁️꙰᠁❥ *◜Prefijo◞* ⇢ [ ${usedPrefix} ]\n`
    txt += `☁️꙰᠁❥ *◜Versión◞* ⇢ ${vs}\n`
    txt += `☁️꙰᠁❥ *◜Chats Privados◞* ⇢ ${chats.length - groupsIn.length}\n`
    txt += `☁️꙰᠁❥ *◜Total De Chats◞* ⇢ ${chats.length}\n`
    txt += `☁️꙰᠁❥ *◜Usuarios◞* ⇢ ${totalreg}\n`
    txt += `☁️꙰᠁❥ *◜Grupos◞* ⇢ ${groupsIn.length}\n`
    txt += `☁️꙰᠁❥ *◜Actividad◞* ⇢ ${muptime}\n`
    txt += `☁️꙰᠁❥ *◜Velocidad◞* ⇢ ${speed} segundos\n`
    txt += `☁️꙰᠁❥ *◜SubBots Activos◞* ⇢ ${totalUsers || '0'}`

    await conn.sendFile(m.chat, pp, 'image.jpg', txt, fkontak, null, fake)
}

handler.help = ['status']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = true
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ ms, h, m, s }) // Debug para revisar valores en la consola
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}










/* import ws from 'ws'

let handler = async (m, { conn, usedPrefix, isRowner }) => {
    let _muptime
    let totalreg = Object.keys(global.db.data.users).length
    let totalchats = Object.keys(global.db.data.chats).length
    let pp = 'https://i.ibb.co/CKggFFc/file.jpg'
    
    if (process.send) {
        process.send('uptime')
        _muptime = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(resolve, 1000)
        }) * 1000
    }

    let muptime = clockString(_muptime)
    let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
    const totalUsers = users.length
    let old = performance.now()
    let neww = performance.now()
    let speed = neww - old
    const used = process.memoryUsage()

    let txt = `☁️ \`\`\`Información - Genesis\`\`\` ☁️\n\n`
    txt += `☁️꙰᠁❥ *◜Creador◞* ⇢ Izumi.kzx\n`
    txt += `☁️꙰᠁❥ *◜Prefijo◞* ⇢ [ ${usedPrefix} ]\n`
    txt += `☁️꙰᠁❥ *◜Versión◞* ⇢ ${vs}\n`
    txt += `☁️꙰᠁❥ *◜Chats Privados◞* ⇢ ${chats.length - groupsIn.length}\n`
    txt += `☁️꙰᠁❥ *◜Total De Chats◞* ⇢ ${chats.length}\n`
    txt += `☁️꙰᠁❥ *◜Usuarios◞* ⇢ ${totalreg}\n`
    txt += `☁️꙰᠁❥ *◜Chats Privados◞* ⇢ ${chats.length - groupsIn.length}\n`
    txt += `☁️꙰᠁❥ *◜Grupos◞* ⇢ ${groupsIn.length}\n`
    txt += `☁️꙰᠁❥ *◜Actividad◞* ⇢ ${muptime}\n`
    txt += `☁️꙰᠁❥ *◜Velocidad◞* ⇢ ${(speed * 1000).toFixed(0) / 1000}\n`
    txt += `☁️꙰᠁❥ *◜SubBots Activos◞* ⇢ ${totalUsers || '0'}`

    await conn.sendFile(m.chat, pp, 'image.jpg', txt, fkontak, null, fake)
}

handler.help = ['status']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = true
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ ms, h, m, s })
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
} */