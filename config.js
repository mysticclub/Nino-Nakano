import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +573218138672
global.confirmCode = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
   ['51901930696', 'ᴬⁿᵍᵉˡⁱᵗʰᵒ ᵒᶠⁱᶜⁱᵃˡ', true],
   ['51928616320', 'DarkCore', true],
   [''],
   [''],
   [''],
   [''],
   ['']
]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//cambiar a true si el bot detecta sus propios comandos.
global.isBaileysFail = false
global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.7'
global.languaje = 'Español'
global.nameqr = '𝙽𝙸𝙽𝙾.𝙽𝙰𝙺𝙰𝙽𝙾'
global.namebot = '𝙽𝙸𝙽𝙾 𝙽𝙰𝙺𝙰𝙽𝙾'
global.sessions = 'GenesisSession'
global.jadi = 'GenesisJadiBot'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '⪛✰ 𝙽𝙸𝙽𝙾-𝙽𝙰𝙺𝙰𝙽𝙾✰⪜'
global.botname = '✦𝙽𝙸𝙽𝙾 𝙽𝙰𝙺𝙰𝙽𝙾♥︎'
global.wm = '𝖓ⅈ𝖓օ 𝖓ɑ𝚔ɑ𝖓օ'
global.author = 'mᥲძᥱ ᑲᥡ : 𝑙𝑜𝑙𝑖 𝑐𝑙𝑢𝑏'
global.dev = '© 𝑚𝑎𝑑𝑒 𝑤𝑖𝑡ℎ 𝑏𝑦 𝑙𝑜𝑙𝑖 𝑐𝑙𝑢𝑏'
global.textbot = '𝑁𝑖𝑛𝑜 𝑁𝑎𝑘𝑎𝑛𝑜 𝑀𝑎𝑑𝑒 𝑊𝑖𝑡ℎ 𝐵𝑦 𝐿𝑜𝑙𝑖 𝐶𝑙𝑢𝑏'
global.namebot = '𝑵𝒊𝒏𝒐 𝑵𝒂𝒌𝒂𝒏𝒐'
global.stickpack = `© 𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝙱𝚢 𝙻𝚘𝚕𝚒 𝙲𝚕𝚞𝚋`
global.titulowm = '-❀ᩙ̈͟༚̮ ⡞᪲=͟͟͞N̬̂î̬n̬̂ô̬-N̬̂â̬k̬̂â̬n̬̂ô̬≼᳞ׄ ᵎ ˚꙳꤬ꨪ'
global.titulowm2 = '.‧·ீ੭ ¡ ᗃᮢ፝֟͡Î̬n̬̂ô̬-B̬̂ô̬t̬̂ ᴍᴇᴊ꧔ʀ !˚̩̩̥͙°̩̥༅˚'
global.stickauth = `© 𝙽𝚒𝚗𝚘 𝙽𝚊𝚔𝚊𝚗𝚘 𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝙱𝚢 𝙻𝚘𝚕𝚒 𝙲𝚕𝚞𝚋`

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.png')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.group = 'https://chat.whatsapp.com/Hk7LRLL4uJP5pHYAaxusLn'
global.group2 = 'https://chat.whatsapp.com/ItBEef1YsmB4BH78UMIsfQ'
global.canal = 'https://whatsapp.com/channel/0029VapUpsT9mrGcypZy141s'
global.channel = 'https://whatsapp.com/channel/0029Vaz6RTR0LKZIKwudX32x'
global.github = 'https://github.com/Izumi-kzx/Genesis-AI' 
global.instagram = 'https://www.instagram.com/angel_dev_ofc' 
global.whatsApp = 'https://wa.me/51901930696'
global.correo = 'nexuscluboficial@gmail.com'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'ᰔᩚ 𝙽𝚒𝚗𝚘 ᥕһᥲ𝗍sᥲ⍴⍴ ᑲ᥆𝗍', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}};

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.esti = { key: {participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: {"videoMessage": { "title": dev, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `Ai Otho - MD`, 'jpegThumbnail': catalogo }}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69
global.maxwarn = '3'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
