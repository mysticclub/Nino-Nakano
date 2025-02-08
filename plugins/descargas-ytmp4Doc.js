import axios from 'axios'

let handler = async (m, { conn, text, args }) => {
  if (!text) return conn.reply(m.chat, '🚩 Debes enviar un mensaje de estado o una URL para procesarlo.', m)

  await m.react('🕓')

  // Función para obtener los participantes de los grupos
  async function fetchParticipants(...jids) {
    let results = []
    for (const jid of jids) {
      let { participants } = await conn.groupMetadata(jid)
      participants = participants.map(({ id }) => id)
      results = results.concat(participants)
    }
    return results
  }

  // Función para crear un mensaje con menciones de estado
  async function mentionStatus(jids, content) {
    const msg = await baileys.generateWAMessage(baileys.STORIES_JID, content, {
      upload: conn.waUploadToServer
    })

    let statusJidList = []
    for (const _jid of jids) {
      if (_jid.endsWith("@g.us")) {
        for (const jid of await fetchParticipants(_jid)) {
          statusJidList.push(jid)
        }
      } else {
        statusJidList.push(_jid)
      }
    }
    statusJidList = [...new Set(statusJidList)]

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
      statusJidList,
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: jids.map((jid) => ({
                tag: "to",
                attrs: { jid },
                content: undefined
              }))
            }
          ]
        }
      ]
    })

    for (const jid of jids) {
      let type = jid.endsWith("@g.us") ? "groupStatusMentionMessage" : "statusMentionMessage"
      await conn.relayMessage(jid, {
        [type]: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25
            }
          }
        }
      }, {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "true" },
            content: undefined
          }
        ]
      })
    }

    return msg
  }

  // Obtener el contenido multimedia o texto
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  let content = {}

  if (mime) {
    let media = await q.download()

    if (/image/.test(mime)) {
      content.image = media
    } else if (/video/.test(mime)) {
      content.video = media
    } else if (/audio/.test(mime)) {
      content.audio = media
    } else {
      return m.reply("¡Tipo de archivo no soportado!")
    }

    if (q.text) content.caption = q.text
  } else if (args[0]) {
    let url = args[0]
    let type = args[1] || 'text'

    if (type === 'image') {
      content.image = { url }
    } else if (type === 'video') {
      content.video = { url }
    } else if (type === 'audio') {
      content.audio = { url }
    } else {
      content.text = args.slice(1).join(" ") || url
    }
  } else {
    return m.reply("¡Responde a un archivo multimedia o ingresa una URL en el formato:\n.status <url> <image/video/audio/text>!")
  }

  // Enviar el mensaje de estado con menciones
  mentionStatus([m.chat], content).catch(console.error)
}

handler.help = ['status *<url>*']
handler.tags = ['media']
handler.command = /^(status)$/i
handler.register = true

export default handler




/* import axios from 'axios'

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

    // Filtrar solo las plataformas donde el usuario está disponible
    const availablePlatforms = result.filter(i => i.available)

    // Si hay plataformas disponibles, las agregamos al mensaje
    if (availablePlatforms.length > 0) {
      let message = `- Análisis de Redes Sociales para: ${text}\n\n`
      availablePlatforms.forEach(i => {
        message += `*Plataforma*: ${i.platform}\n*Disponible*: Sí\n*Enlace*: ${i.link}\n\n`
      })

      // Enviamos los resultados al usuario
      await conn.reply(m.chat, message, m)
      await m.react('✅')
    } else {
      await conn.reply(m.chat, `❌ No se encontró el usuario "${text}" en ninguna de las plataformas verificadas.`, m)
      await m.react('✖️')
    }

  } catch (err) {
    await m.react('✖️')
    await conn.reply(m.chat, '❌ Hubo un error al verificar las redes sociales.', m)
  }
}

handler.help = ['userfinder *<username>*']
handler.tags = ['search']
handler.command = /^(userfinder)$/i
handler.register = true

export default handler */