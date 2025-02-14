import fs from 'fs'
import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Por favor, haz una pregunta.', m)

  // Lista de respuestas como la Bola 8 Mágica
  const respuestas = [
    'Sí.',
    'No cuentes con ello.',
    'Las perspectivas no son buenas.',
    'Sin duda.',
    'Pregunta de nuevo más tarde.',
    'Es cierto.',
    'Probablemente.',
    'Todo apunta a que sí.',
    'Mi respuesta es no.',
    'Muy dudoso.',
    'No puedo predecirlo ahora.',
  ]

  let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]

  // Crear imagen con la respuesta
  const stickerPath = '/mnt/data/bola8.png'
  await generarImagenBola8(respuesta, stickerPath)

  // Enviar como sticker
  await conn.sendMessage(m.chat, { sticker: fs.readFileSync(stickerPath) }, { quoted: m })
}

// Función para generar imagen con la respuesta en la Bola 8 Mágica
async function generarImagenBola8(texto, path) {
  const canvas = createCanvas(500, 500)
  const ctx = canvas.getContext('2d')

  const bola8 = await loadImage('https://i.imgur.com/6pO1hHz.png') // Imagen base de la bola
  ctx.drawImage(bola8, 0, 0, 500, 500)

  // Configurar texto en la bola
  ctx.font = 'bold 30px Arial'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.fillText(texto, 250, 270)

  // Guardar la imagen generada
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(path, buffer)
}

handler.tags = ['fun']
handler.help = ['8ball <pregunta>']
handler.command = ['8ball', 'bola8', 'pregunta']

export default handler