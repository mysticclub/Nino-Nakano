/* import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import { cpus as _cpus, totalmem, freemem } from "os";
import { performance } from "perf_hooks";
import { sizeFormatter } from "human-readable";

// Formateador de tamaños de memoria
let format = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

let handler = async (m, { conn, usedPrefix, command }) => {
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let totalreg = Object.keys(global.db.data.users).length;

  const chats = Object.entries(conn.chats).filter(
    ([id, data]) => id && data.isChats
  );
  const groupsIn = chats.filter(([id]) => id.endsWith("@g.us"));
  const used = process.memoryUsage();

  let infobt = `🍭 *I N F O - G E N E S I S*
  
*_ESTADO_*
🐢͜͡ޮ ⋄ Chats de grupo: *${groupsIn.length}*
🌺͜͡ޮ ⋄ Grupos unidos: *${groupsIn.length}*
🐢͜͡ޮ ⋄ Grupos abandonados: *${groupsIn.length - groupsIn.length}*
🌺͜͡ޮ ⋄ Chats privados: *${chats.length - groupsIn.length}*
🐢͜͡ޮ ⋄ Total Chats: *${chats.length}*
🌺͜͡ޮ ⋄ Registrados: *${totalreg}*
🐢͜͡ޮ ⋄ Tiempo Activo: *${uptime}*

🚩 *NodeJS Uso de memoria*
${"```" + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), " ")}: ${format(used[key])}`).join("\n") + "```"}
`;

  // Imagen Base64
  const thumbnailBase64 = "data:image/jpeg;base64,<TU_IMAGEN_BASE64>";

  // Generación del mensaje
  const prep = generateWAMessageFromContent(
    m.chat,
    {
      orderMessage: {
        orderId: "123456789",
        itemCount: 1,
        message: infobt,
        orderTitle: "Genesis Bot",
        footerText: "Powered by Yaemori Bot - MD",
        token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA==",
        thumbnail: thumbnailBase64,
        surface: "CATALOG",
      },
    },
    { quoted: fkontak }
  );

  await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });
};

handler.help = ["info"];
handler.tags = ["info"];
handler.command = ["info", "infobot", "botinfo"];

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => */