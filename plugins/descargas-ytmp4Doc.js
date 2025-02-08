import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🚩 Debes proporcionar una consulta para buscar en Google usando el comando *${usedPrefix + command} <consulta>*`, m)

  await m.react('🕓')

  // Función de scraping de Google
  const Google = async (query, maxPages = 3) => {
    try {
      const results = [];
      const currentTime = new Date().toISOString();

      for (let i = 0; i < maxPages; i++) {
        const start = i * 10; // Índice de inicio para la paginación
        const response = await axios.get(`https://www.google.com/search?q=${query}&start=${start}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
          },
        });

        const $ = cheerio.load(response.data);
        const language = $('html').attr('lang') || 'id';

        // Parsear resultados de la página
        $('.g').each((_, element) => {
          const title = $(element).find('h3').text().trim() || '';
          const link = $(element).find('a').attr('href') || '';
          const description = $(element).find('.VwiC3b').text().trim() || '';

          if (title && link) {
            results.push({
              created_at: currentTime,
              modified_at: currentTime,
              link,
              is_expanded: true,
              title,
              description,
              description_tokens: description.split(/\s+/).length,
              expanded_tokens: Math.ceil(description.split(/\s+/).length * 1.5),
              accept_language: language,
              engine: 'Google Search',
              expanded_description: description.length > 100 
                ? `${description.substring(0, 100)}...` 
                : description,
              scraped_at: currentTime,
            });
          }
        });
      }

      return { success: true, totalResults: results.length, results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  try {
    const query = text; // La consulta proporcionada por el usuario
    const response = await Google(query);

    if (response.success && response.totalResults > 0) {
      let resultText = `*Resultados de búsqueda en Google para:* ${query}\n\n`;
      response.results.slice(0, 5).forEach((result, index) => {
        resultText += `\n*Resultado ${index + 1}:*\n*Titulo:* ${result.title}\n*Descripción:* ${result.expanded_description}\n*Enlace:* ${result.link}\n`;
      });
      conn.reply(m.chat, resultText, m);
    } else {
      conn.reply(m.chat, `🚩 No se encontraron resultados para "${query}"`, m);
    }
  } catch (error) {
    conn.reply(m.chat, `🚩 Ocurrió un error al realizar la búsqueda: ${error.message}`, m);
  }
};

handler.help = ['google <consulta>'];
handler.tags = ['tools'];
handler.command = /^(google)$/i;
handler.register = true;

export default handler;


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