const { prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
const { randomBytes } = await import("crypto");

let texting = 'q pasa w'

conn.sendMessage(m.chat, {

image: { url: 'https://files.catbox.moe/brjxwz.jpg'},

caption: texting,

footer: 'la cosa es seria chavito\nte amo w',

contextInfo: {

mentionedJid: [m.sender],

forwardingScore: 999,

isForwarded: true,

externalAdReply: {

showAdAttribution: true,

title: Sock Ai,

body: "like your pussycat",

sourceUrl: "https://instagram.com/c4rl@s_9e",

thumbnailUrl: 'https://files.catbox.moe/brjxwz.jpg',

mediaType: 1,

renderLarger Thumbnail: false

}},

buttons: [

{

buttonId: '.ping',

buttonText: {

displayText: 'ping'

},

type: 1,

},

{

buttonId: '.tqto',

buttonText: {

displayText: 'tqto'

},

type: 1,

},

{

type: 4,

nativeFlowInfo: {

name: 'single_select',

params]son: JSON.stringify({

title: 'Dont click',

sections: [

{

title: 'my focking bicht',

highlight_label: "",

rows: [

{

header: Message',

title: 'love dog',

description: i like pussydog

id: ".

},

{

header: Message',

title: 'check ping',

description: i like pussycat",

id: ",

},

1,

},

1,

}),

},

},

1,

header Type: 1,

viewOnce: true

})

handler.command = ['test']
export default handler 


/* let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `Hola`
  let img = 'https://i.ibb.co/YDGYRhx/file.jpg'

    await m.react('🤍')
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: txt,
      footer: dev,
      buttons: [
        {
          buttonId: `.ping`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ⍴іᥒg',
          },
        },
        {
          buttonId: `.owner`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥆ᥕᥒᥱr',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m })
}
handler.command = ['test']
export default handler */