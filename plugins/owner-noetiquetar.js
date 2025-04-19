//COdigo por Zaphkiel Ender



let handler = async (m, {conn, text}) => {
  let name = await conn.getName(m.sender);

conn.reply(m.chat, `> [ 💖 ️] No etiquetes a mi owner, si es algo urgente contacta con el a su chat privado para mas informacion` ,m, { contextInfo:{ externalAdReply: {title: '❤️‍🔥 ༆ᴺᵉˣᵘˢ乂club숬', body: 'ᴇsᴄʀɪʙɪʀʟᴇ ᴀᴘʟᴀsᴛᴀɴᴛᴏ ᴀǫᴜɪ', sourceUrl: 'https://wa.me/51920227615'}}})
}
handler.customPrefix = /@51920227615/i;
handler.command = new RegExp();

export default handler;