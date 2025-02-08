import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingrese un nombre de usuario para buscar en las redes sociales.', m)

  await m.react('🕓')

  // Definir las plataformas y sus URLs
  const platforms = {
    tiktok: `https://www.tiktok.com/@${text}`,
    youtube: `https://www.youtube.com/${text}`,
    twitter: `https://twitter.com/${text}`,
    instagram: `https://www.instagram.com/${text}`,
    facebook: `https://www.facebook.com/${text}`,
    linkedin: `https://www.linkedin.com/in/${text}`,
    snapchat: `https://www.snapchat.com/add/${text}`,
    reddit: `https://www.reddit.com/user/${text}`,
    github: `https://github.com/${text}`,
    soundcloud: `https://soundcloud.com/${text}`,
    twitch: `https://www.twitch.tv/${text}`,
    whatsapp: `https://wa.me/${text}`,
    telegram: `https://t.me/${text}`,
    spotify: `https://open.spotify.com/user/${text}`,
    discord: `https://discord.com/users/${text}`,
    // Puedes agregar más plataformas si lo deseas
  }

  // Función para verificar la disponibilidad en cada plataforma
  async function checkSocialMedia(username) {
    const results = []
    
    for (const [platform, url] of Object.entries(platforms)) {
      try {
        // Intentamos hacer una solicitud HEAD para verificar si la URL es válida
        await axios.head(url)
        results.push({ platform, available: true, link: url })
      } catch {
        results.push({ platform, available: false, link: url })
      }
    }

    return results
  }

  // Realizar la búsqueda de redes sociales
  try {
    const result = await checkSocialMedia(text)

    // Preparamos el mensaje de respuesta
    let message = `- Análisis de Redes Sociales para: ${text}\n\n`
    result.forEach(i => {
      message += `*Plataforma*: ${i.platform}\n*Disponible*: ${i.available ? 'Sí' : 'No'}\n*Enlace*: ${i.link}\n\n`
    })

    // Enviamos los resultados al usuario
    await conn.reply(m.chat, message, m)
    await m.react('✅')
  } catch (err) {
    await m.react('✖️')
    await conn.reply(m.chat, '❌ Hubo un error al verificar las redes sociales.', m)
  }
}

handler.help = ['userfinder *<username>*']
handler.tags = ['search']
handler.command = /^(userfinder)$/i
handler.register = true

export default handler