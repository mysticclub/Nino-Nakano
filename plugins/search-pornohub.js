import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) throw `*Formato incorrecto*\nEjemplo:\n\n${usedPrefix + command} con mi prima`;

  try {
    const apiKey = 'xenzpedo';
    const query = encodeURIComponent(args[0]);
    const url = `https://api.botcahx.eu.org/api/search/pornhub?query=${query}&apikey=${apiKey}`;
    const response = await fetch(url);

    // Verificamos que la respuesta sea válida
    if (!response.ok) throw `*Error en la conexión con la API: ${response.status}*`;

    const json = await response.json();

    // Validamos si la API devolvió datos
    if (!json.status || !json.result || json.result.length === 0) {
      throw '*No se encontraron resultados para tu búsqueda.*';
    }

    // Construimos el mensaje con los resultados
    let teks = json.result.map((v, i) => 
      `「 *P O R N H U B  - S E A R C H* 」
• *Título:* ${v.title}
• *Duración:* ${v.duration}
• *Vistas:* ${v.viewers}
• *Rating:* ${v.rating}
• *Publicado:* ${v.published}
• *Link:* ${v.url}
---------------------------------------------------\n`).join('\n\n');

    m.reply(teks);
  } catch (e) {
    console.error('Error al procesar la búsqueda:', e);
    m.reply(typeof e === 'string' ? e : '*Ocurrió un error al realizar la búsqueda. Inténtalo más tarde.*');
  }
};

handler.tags = ['search'];
handler.help = ['pornhubsearch *<texto>*'];
handler.command = /^(phsearch|pornhubsearch)$/i;

export default handler;








/* import cheerio from 'cheerio';
import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) throw `*Formato incorrecto*\nEjemplo:\n\n${usedPrefix + command} con mi prima`;
try {
let searchResults = await searchPornhub(args[0]);
let teks = searchResults.result.map((v, i) => 
`「 *P O R N H U B  - S E A R C H* 」
• *Título:* ${v.title}
• *Duración:* ${v.duration}
• *Vistas:* ${v.views}
• *Link:* ${v.url}
---------------------------------------------------\n`).join('\n\n');
if (searchResults.result.length === 0) {
teks = '*Sin resultados*';
}
m.reply(teks);
} catch (e) {
}};
handler.tags = ['search'] 
handler.help = ['pornhubsearch *<texto>*'] 
handler.command = /^(phsearch|pornhubsearch)$/i;
export default handler;
async function searchPornhub(search) {
  try {
    const response = await axios.get(`https://www.pornhub.com/video/search?search=${search}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const result = [];
    $('ul#videoSearchResult > li.pcVideoListItem').each(function(a, b) {
      const _title = $(b).find('a').attr('title');
      const _duration = $(b).find('var.duration').text().trim();
      const _views = $(b).find('var.views').text().trim();
      const _url = 'https://www.pornhub.com' + $(b).find('a').attr('href');
      const hasil = { title: _title, duration: _duration, views: _views, url: _url };
      result.push(hasil);
    });

    return { result };
  } catch (error) {
    console.error('Ocurrió un error al buscar en Pornhub:', error);
    return { result: [] };
  }
} */