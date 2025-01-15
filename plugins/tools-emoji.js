import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("☁️ Ingresa una consulta\nEjemplo: /${command} coche");

  let emot = await simbol(text);
  const p = emot.symbols;
  shuffleArray(p);
  let pus = p.slice(0, 50);
  let woi = [];
  pus.forEach(pus => {
      woi.push(pus);
  });
  conn.reply(m.chat, woi.join(' '), m);
};

handler.help = ['emoji', 'emot'];
handler.command = /^(emoji|emot)$/i;
handler.tags = ['tools'];

export default handler;

async function simbol(query) {
  try {
    const r = await axios.get(
      `https://emojidb.org/${query.toLowerCase().trim().split(" ").join("-")}-emojis`,
      {
        headers: {
          pragma: "no-cache",
          priority: "u=0, i",
          "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        },
      }
    );
    const $ = cheerio.load(r.data);
    const d = $("div.emoji-list > div.emoji-ctn")
      .map((i, el) => $(el).find("div.emoji").text().trim())
      .get();
    if (!d.length) throw new Error(`¡Símbolos vacíos!`);
    return { query, total: d.length, symbols: d };
  } catch (e) {
    throw new Error(`Error en la función simbol: ${e}`);
  }
}

async function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}