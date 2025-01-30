let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempo = 5 * 60
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
    let tiempo2 = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
    m.reply(`🍟 Ya has cometido un Crimen recientemente, espera ⏱️ *${tiempo2}* para cometer tu próximo Crimen y evitar ser atrapado.`)
    return
  }
  cooldowns[senderId] = Date.now()

  let senderCorazones = users[senderId].corazones || 0
  let randomUserId = Object.keys(users).filter(id => id !== senderId)[Math.floor(Math.random() * (Object.keys(users).length - 1))]
  let randomUserCorazones = users[randomUserId]?.corazones || 0

  let minAmount = 15
  let maxAmount = 50
  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
    case 0:
      if (randomUserCorazones >= amountTaken) {
        users[senderId].corazones += amountTaken
        users[randomUserId].corazones -= amountTaken
      } else {
        amountTaken = randomUserCorazones
        users[senderId].corazones += amountTaken
        users[randomUserId].corazones = 0
      }
      conn.sendMessage(m.chat, {
        text: `🚩 ¡Lograste cometer tu crimen con éxito! Acabas de robar *${amountTaken} 🤍 corazones* a @${randomUserId.split("@")[0]}\n\nSe suman *+${amountTaken} 🤍 corazones* a ${senderName}.`,
        contextInfo: { mentionedJid: [randomUserId] }
      }, { quoted: m })
      break

    case 1:
      if (senderCorazones >= minAmount) {
        let amountSubtracted = Math.min(Math.floor(Math.random() * (senderCorazones - minAmount + 1)) + minAmount, maxAmount)
        users[senderId].corazones -= amountSubtracted
        conn.reply(m.chat, `🚩 No fuiste cuidadoso y te atraparon mientras cometías tu crimen. Se restaron *-${amountSubtracted} 🤍 corazones* a ${senderName}.`, m)
      } else {
        conn.reply(m.chat, `🚨 Intentaste cometer un crimen, pero no tienes suficientes corazones para perder. ¡Mejor ten cuidado la próxima vez!`, m)
      }
      break

    case 2:
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCorazones / 2 - minAmount + 1)) + minAmount, maxAmount)
      if (randomUserCorazones >= smallAmountTaken) {
        users[senderId].corazones += smallAmountTaken
        users[randomUserId].corazones -= smallAmountTaken
        conn.sendMessage(m.chat, {
          text: `🚩 Lograste cometer tu crimen con éxito, pero te descubrieron y solo lograste tomar *${smallAmountTaken} 🤍 corazones* de @${randomUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} 🤍 corazones* a ${senderName}.`,
          contextInfo: { mentionedJid: [randomUserId] }
        }, { quoted: m })
      } else {
        conn.reply(m.chat, `🚨 Intentaste robar, pero el objetivo tenía pocos corazones. No lograste obtener nada significativo.`, m)
      }
      break
  }
  
  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
