let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Por favor, haz una pregunta.', m)

  const respuestas = [
    'Sí.',
    'Será mejor que no te lo diga ahora.',
    'Sí, definitivamente.',
    'Debes confiar en ello.',
    'Mis fuentes me dicen que no.',
    'No cuentes con ello.',
    'No puedo predecirlo ahora.',
    'Muy dudoso.',
    'Las perspectivas no son buenas.',
    'Concéntrate y vuelve a preguntar.',
    'En mi opinión, sí.',
    'Es cierto.',
    'Probablemente.',
    'Todo apunta a que sí.',
    'Mi respuesta es no.',
  ]

  const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]
  conn.reply(m.chat, `🎱 ${respuesta}`, m)
}

handler.tags = ['fun']
handler.help = ['8ball <pregunta>']
handler.command = ['8ball', 'bola8', 'pregunta']

export default handler