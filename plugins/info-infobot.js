import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import { cpus as _cpus, totalmem, freemem } from "os";
import { performance } from "perf_hooks";
import { sizeFormatter } from "human-readable";

// Formateador de tamaños de memoria
let format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

// Función principal
let handler = async (m, { conn, usedPrefix, command }) => {
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let totalreg = Object.keys(global.db.data.users).length;

  const chats = Object.entries(conn.chats).filter(
    ([id, data]) => id && data.isChats
  );
  const groupsIn = chats.filter(([id]) => id.endsWith("@g.us"));
  const used = process.memoryUsage();

  // Procesamiento de CPU
  const cpus = _cpus().map((cpu) => {
    cpu.total = Object.keys(cpu.times).reduce(
      (last, type) => last + cpu.times[type],
      0
    );
    return cpu;
  });

  const cpu = cpus.reduce(
    (last, cpu, _, { length }) => {
      last.total += cpu.total;
      last.speed += cpu.speed / length;
      last.times.user += cpu.times.user;
      last.times.nice += cpu.times.nice;
      last.times.sys += cpu.times.sys;
      last.times.idle += cpu.times.idle;
      last.times.irq += cpu.times.irq;
      return last;
    },
    {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0,
      },
    }
  );

  let old = performance.now();
  let neww = performance.now();
  let speed = neww - old;

  // Mensaje de información del bot
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

  // Imagen Base64 (asegúrate de convertir tu imagen a este formato previamente)
  const thumbnailBase64 = "data:image/jpeg;base64,<TU_IMAGEN_BASE64>";

  // Generación del mensaje
  const prep = generateWAMessageFromContent(
    m.chat,
    {
      orderMessage: {
        orderId: "6288215463787",
        itemCount: 2022,
        message: infobt,
        orderTitle: "Genesis Bot",
        footerText: "Yaemori Bot - MD",
        token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA==",
        thumbnail: thumbnailBase64,
        surface: "CATALOG",
      },
    },
    { quoted: fkontak }
  );

  await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });
};

// Configuración del comando
handler.help = ["info"];
handler.tags = ["info"];
handler.command = ["info", "infobot", "botinfo"];

export default handler;

// Función para convertir milisegundos a formato hh:mm:ss
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}