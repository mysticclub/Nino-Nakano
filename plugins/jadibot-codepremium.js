const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion} = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util' 
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
import { fileURLToPath } from 'url'
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""
let rtx = "*⪛✰ ↫ Nino Nakano ↬ ✰⪜*\n\n✐ Cσɳҽxισɳ SυႦ-Bσƚ Mσԃҽ QR\n\n✰ Con otro celular o en la PC escanea este QR para convertirte en un *Sub-Bot* Temporal.\n\n\`1\` » Haga clic en los tres puntos en la esquina superior derecha\n\n\`2\` » Toque dispositivos vinculados\n\n\`3\` » Escanee este codigo QR para iniciar sesion con el bot\n\n✧ ¡Este código QR expira en 45 segundos!."
let rtx2 = "*⪛✰ ↫ Nino Nakano ↬ ✰⪜*\n\n✐ Cσɳҽxισɳ SυႦ-Bσƚ Mσԃҽ Cσԃҽ\n\n✰ Usa este Código para convertirte en un *Sub-Bot* Temporal.\n\n\`1\` » Haga clic en los tres puntos en la esquina superior derecha\n\n\`2\` » Toque dispositivos vinculados\n\n\`3\` » Selecciona Vincular con el número de teléfono\n\n\`4\` » Escriba el Código para iniciar sesion con el bot\n\n✧ No es recomendable usar tu cuenta principal."

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const sumiJBOptions = {}
if (global.conns instanceof Array) console.log()
else global.conns = []
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
let time = global.db.data.users[m.sender].Subs + 120000
if (new Date - global.db.data.users[m.sender].Subs < 120000) return conn.reply(m.chat, `《✧》 Debes esperar ${msToTime(time - new Date())} para volver a vincular un *Sub-Bot.*`, m)
const subBots = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
const subBotsCount = subBots.length
if (subBotsCount === 52) {
return m.reply(`《✧》 No se han encontrado espacios para *Sub-Bots* disponibles.`)
}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let id = `${who.split`@`[0]}`
let pathSumiJadiBot = path.join(`./${jadi}/`, id)
if (!fs.existsSync(pathSumiJadiBot)){
fs.mkdirSync(pathSumiJadiBot, { recursive: true })
}
sumiJBOptions.pathSumiJadiBot = pathSumiJadiBot
sumiJBOptions.m = m
sumiJBOptions.conn = conn
sumiJBOptions.args = args
sumiJBOptions.usedPrefix = usedPrefix
sumiJBOptions.command = command
sumiJBOptions.fromCommand = true
sumiJadiBot(sumiJBOptions)
global.db.data.users[m.sender].Subs = new Date * 1
} 
handler.help = ['qr', 'code']
handler.tags = ['serbot']
handler.command = ['qrprem', 'codeprem']
handler.mods = true;
export default handler 

export async function sumiJadiBot(options) {
let { pathSumiJadiBot, m, conn, args, usedPrefix, command } = options
if (command === 'code') {
command = 'qr'; 
args.unshift('code')}
const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false
let txtCode, codeBot, txtQR
if (mcode) {
args[0] = args[0].replace(/^--code$|^code$/, "").trim()
if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim()
if (args[0] == "") args[0] = undefined
}
const pathCreds = path.join(pathSumiJadiBot, "creds.json")
if (!fs.existsSync(pathSumiJadiBot)){
fs.mkdirSync(pathSumiJadiBot, { recursive: true })}
try {
args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
} catch {
conn.reply(m.chat, `《✧》 Use correctamente el comando » ${usedPrefix + command} code`, m)
return
}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathSumiJadiBot)

// Configuración mejorada para conexiones duraderas
const connectionOptions = {
    logger: pino({ level: "fatal" }),
    printQRInTerminal: false,
    auth: { 
        creds: state.creds, 
        keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) 
    },
    msgRetry,
    msgRetryCache,
    browser: mcode ? ['Ubuntu', 'Chrome', '110.0.5585.95'] : ['Sumi (Sub Bot)', 'Chrome','2.0.0'],
    version: version,
    generateHighQualityLinkPreview: true,
    // Nuevas opciones para mejorar la estabilidad
    keepAliveIntervalMs: 10000, // Envía un ping cada 10 segundos
    emitOwnEvents: false, // Reduce el procesamiento de eventos innecesarios
    connectTimeoutMs: 60000, // Mayor tiempo de espera para conexión
    defaultQueryTimeoutMs: 60000, // Mayor tiempo de espera para consultas
    syncFullHistory: false, // No sincroniza todo el historial para ahorrar recursos
    markOnlineOnConnect: true, // Marca como en línea al conectar
    fireInitQueries: true, // Ejecuta consultas iniciales para mejor estabilidad
    retryRequestDelayMs: 2000 // Reintenta solicitudes fallidas después de 2 segundos
};

let sock = makeWASocket(connectionOptions)
sock.isInit = false
sock.reconnectAttempts = 0 // Contador de intentos de reconexión
let isInit = true

// Función para guardar credenciales periódicamente
function setupPeriodicCredentialSaving() {
    setInterval(async () => {
        try {
            await saveCreds();
            console.log(chalk.green(`Credenciales guardadas para +${path.basename(pathSumiJadiBot)}`));
        } catch (error) {
            console.log(chalk.red(`Error al guardar credenciales: ${error.message}`));
        }
    }, 3600000); // Guarda cada hora
}

// Función para enviar señales de presencia periódicamente
function setupPresenceUpdates() {
    setInterval(async () => {
        try {
            if (sock.user) {
                await sock.sendPresenceUpdate('available');
                console.log(chalk.blue(`Señal de presencia enviada para +${path.basename(pathSumiJadiBot)}`));
            }
        } catch (error) {
            console.log(chalk.yellow(`Error al enviar señal de presencia: ${error.message}`));
        }
    }, 1800000); // Cada 30 minutos
}

async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update

    if (isNewLogin) sock.isInit = false

    if (qr && !mcode) {
        if (m?.chat) {
            txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim()}, { quoted: m})
        } else {
            return 
        }
        if (txtQR && txtQR.key) {
            setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 30000)
        }
        return
    } 

    if (qr && mcode) {
        let secret = await sock.requestPairingCode((m.sender.split`@`[0]))
        secret = secret.match(/.{1,4}/g)?.join("-")
        txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
        codeBot = await m.reply(secret)
        console.log(secret)
    }

    if (txtCode && txtCode.key) {
        setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key })}, 30000)
    }

    if (codeBot && codeBot.key) {
        setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key })}, 30000)
    }

    const endSesion = async (loaded) => {
        if (!loaded) {
            try {
                sock.ws.close()
            } catch {
            }
            sock.ev.removeAllListeners()
            let i = global.conns.indexOf(sock)                
            if (i < 0) return 
            delete global.conns[i]
            global.conns.splice(i, 1)
        }
    }

    // Manejo mejorado de desconexiones
    if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
        console.log(chalk.yellow(`Conexión cerrada con código: ${statusCode} para +${path.basename(pathSumiJadiBot)}`))

        // Códigos que deberían intentar reconectar
        const shouldReconnect = [408, 428, 500, 515].includes(statusCode)

        if (shouldReconnect) {
            // Retroceso exponencial para intentos de reconexión
            const backoffTime = Math.min(Math.pow(2, sock.reconnectAttempts) * 1000, 300000) // Máximo 5 minutos

            console.log(chalk.blue(`Reconectando en ${backoffTime/1000} segundos...`))
            await delay(backoffTime)

            sock.reconnectAttempts += 1
            await creloadHandler(true).catch(console.error)
            return
        }

        if (statusCode === 428) {
            console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathSumiJadiBot)}) fue cerrada inesperadamente. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            await creloadHandler(true).catch(console.error)
        }

        if (statusCode === 408) {
            console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathSumiJadiBot)}) se perdió o expiró. Razón: ${statusCode}. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            await creloadHandler(true).catch(console.error)
        }

        if (statusCode === 440) {
            console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathSumiJadiBot)}) fue reemplazada por otra sesión activa.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            try {
                if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathSumiJadiBot)}@s.whatsapp.net`, {text : '*HEMOS DETECTADO UNA NUEVA SESIÓN, BORRE LA NUEVA SESIÓN PARA CONTINUAR*\n\n> *SI HAY ALGÚN PROBLEMA VUELVA A CONECTARSE*' }, { quoted: m || null }) : ""
            } catch (error) {
                console.error(chalk.bold.yellow(`Error 440 no se pudo enviar mensaje a: +${path.basename(pathSumiJadiBot)}`))
            }
        }

        if (statusCode == 405 || statusCode == 401) {
            console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La sesión (+${path.basename(pathSumiJadiBot)}) fue cerrada. Credenciales no válidas o dispositivo desconectado manualmente.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            try {
                if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathSumiJadiBot)}@s.whatsapp.net`, {text : '*SESIÓN PENDIENTE*\n\n> *INTENTÉ NUEVAMENTE VOLVER A SER SUB-BOT*' }, { quoted: m || null }) : ""
            } catch (error) {
                console.error(chalk.bold.yellow(`Error 405 no se pudo enviar mensaje a: +${path.basename(pathSumiJadiBot)}`))
            }
            fs.rmdirSync(pathSumiJadiBot, { recursive: true })
        }

        if (statusCode === 500) {
            console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Conexión perdida en la sesión (+${path.basename(pathSumiJadiBot)}). Borrando datos...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathSumiJadiBot)}@s.whatsapp.net`, {text : '*CONEXIÓN PÉRDIDA*\n\n> *INTENTÉ MANUALMENTE VOLVER A SER SUB-BOT*' }, { quoted: m || null }) : ""
            return creloadHandler(true).catch(console.error)
        }

        if (statusCode === 515) {
            console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Reinicio automático para la sesión (+${path.basename(pathSumiJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            await creloadHandler(true).catch(console.error)
        }

        if (statusCode === 403) {
            console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Sesión cerrada o cuenta en soporte para la sesión (+${path.basename(pathSumiJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
            fs.rmdirSync(pathSumiJadiBot, { recursive: true })
        }
    }

    if (global.db.data == null) loadDatabase()

    if (connection == `open`) {
        if (!global.db.data?.users) loadDatabase()
        let userName, userJid 
        userName = sock.authState.creds.me.name || 'Anónimo'
        userJid = sock.authState.creds.me.jid || `${path.basename(pathSumiJadiBot)}@s.whatsapp.net`
        console.log(chalk.bold.cyanBright(`\n❒⸺⸺⸺⸺【• SUB-BOT •】⸺⸺⸺⸺❒\n│\n│ 🟢 ${userName} (+${path.basename(pathSumiJadiBot)}) conectado exitosamente.\n│\n❒⸺⸺⸺【• CONECTADO •】⸺⸺⸺❒`))
        sock.isInit = true
        global.conns.push(sock)


        sock.reconnectAttempts = 0


        setupPresenceUpdates()


        setupPeriodicCredentialSaving()

        m?.chat ? await conn.sendMessage(m.chat, {text: args[0] ? `@${m.sender.split('@')[0]}, ya estás conectado, leyendo mensajes entrantes...` : `@${m.sender.split('@')[0]}, genial ya eres parte de nuestra familia de Sub-Bots.`, mentions: [m.sender]}, { quoted: m }) : ''
    }
}


setInterval(async () => {
    if (!sock.user) {

        console.log(chalk.yellow(`Verificación de conexión: No se encontró usuario para +${path.basename(pathSumiJadiBot)}. Intentando reconectar...`))


        let reconnectAttempts = 0;
        const maxReconnectAttempts = 3;

        while (reconnectAttempts < maxReconnectAttempts) {
            try {
                await creloadHandler(true);
                console.log(chalk.green(`Reconexión exitosa para +${path.basename(pathSumiJadiBot)}`));
                return; // Salir si la reconexión fue exitosa
            } catch (error) {
                reconnectAttempts++;
                console.log(chalk.yellow(`Intento de reconexión ${reconnectAttempts}/${maxReconnectAttempts} fallido`));
                await delay(5000); // Esperar 5 segundos entre intentos
            }
        }


        try { sock.ws.close() } catch (e) {}
        sock.ev.removeAllListeners()
        let i = global.conns.indexOf(sock)                
        if (i < 0) return
        delete global.conns[i]
        global.conns.splice(i, 1)
    } else {

        try {
            await sock.sendPresenceUpdate('available');
        } catch (error) {
            console.log(chalk.yellow(`Error al enviar señal de presencia para +${path.basename(pathSumiJadiBot)}`));
        }
    }
}, 3600000) 

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
    try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) handler = Handler
    } catch (e) {
        console.error('⚠️ Nuevo error: ', e)
    }

    if (restatConn) {
        const oldChats = sock.chats
        try { sock.ws.close() } catch { }
        sock.ev.removeAllListeners()
        sock = makeWASocket(connectionOptions, { chats: oldChats })
        isInit = true
    }

    if (!isInit) {
        sock.ev.off("messages.upsert", sock.handler)
        sock.ev.off("connection.update", sock.connectionUpdate)
        sock.ev.off('creds.update', sock.credsUpdate)
    }

    sock.handler = handler.handler.bind(sock)
    sock.connectionUpdate = connectionUpdate.bind(sock)
    sock.credsUpdate = saveCreds.bind(sock, true)
    sock.ev.on("messages.upsert", sock.handler)
    sock.ev.on("connection.update", sock.connectionUpdate)
    sock.ev.on("creds.update", sock.credsUpdate)
    isInit = false
    return true
}
creloadHandler(false)
})
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? '0' + hours : hours
    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds
    return minutes + ' m y ' + seconds + ' s '
}