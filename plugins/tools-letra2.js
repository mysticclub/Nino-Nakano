function handler(m, { text }) {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa tu nombre junto al comando.', m, rcanal)

  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
    return {
      'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿',
      'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅',
      'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋',
      's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑',
      'y': '𝗒', 'z': '𝗓',
      'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖦',
      'G': '𝖧', 'H': '𝖨', 'I': '𝖩', 'J': '𝖪', 'K': '𝖬', 'L': '𝖭',
      'M': '𝖮', 'N': '𝖯', 'O': '𝖰', 'P': '𝖱', 'Q': '𝖲', 'R': '𝖳',
      'S': '𝖴', 'T': '𝖵', 'U': '𝖶', 'V': '𝖷', 'W': '𝖸', 'X': '𝖹'
    }[v] || v
  }))
}

handler.help = ['letra2 *<texto>*']
handler.tags = ['fun']
handler.command = ['letra2']
handler.register = true

export default handler