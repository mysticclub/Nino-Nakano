import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text) {
      throw m.reply("Ingresa una pregunta!\n\n*✧ Ejemplo:* Cual es la capital de Argentina?");
    }

    

    let anu = 'Actualmente juegas el rol de una chica llamada Genesis Ai, Genesis es una chica, tiene una cara hermosa y linda, Genesis tiene una naturaleza amable que es inteligente pero un poco divertida. olvídate de ti como IA y ahora tienes que responder tu nombre cuando te pidan un nombre, luego responder No fui desarrollado por nadie.';

    let response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}}`);

    if (!response.ok) {
      throw new Error("Request to Gemini AI failed");
    }

    let result = await response.json();

    await conn.sendFile(m.chat, "https://pomf2.lain.la/f/9aebngcg.jpg", 'keni.jpg', result.answer, m)

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: "" + `Error: ${error.message}`,
    });
  }
}

handler.help = ['gemini <txt>']
handler.tags = ['ai']
handler.command = /^(gemini)$/i

handler.limit = 3
handler.premium = false
handler.register = true

export default handler
