import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  const apiKey = 'xenzpedo'; // API Key de la nueva API

  if (!text) {
    return conn.reply(
      m.chat,
      '[ ᰔᩚ ] Ingresa el nombre o enlace para buscar en *Spotify*.\n\n' + 
      `Ejemplo:\n> *${usedPrefix + command}* https://open.spotify.com/track/123456789`,
      m
    );
  }

  await m.react('🕓'); // Reacción de espera

  try {
    // Llamada a la API con el enlace o texto proporcionado
    const response = await fetch(
      `https://api.botcahx.eu.org/api/download/spotify?url=${encodeURIComponent(text)}&apikey=${apiKey}`
    );
    const result = await response.json();

    // Verifica si la respuesta tiene éxito
    if (result.status && result.result?.data) {
      const { title, artist, thumbnail, url } = result.result.data;

      // Formato del mensaje con los datos obtenidos
      const mensaje = `🎵 *Título*: ${title}\n🎤 *Artista*: ${artist.name}\n🔗 *Spotify*: ${artist.external_urls.spotify}\n🕒 *Duración*: ${result.result.data.duration}`;

      // Enviar la imagen (thumbnail) y el mensaje con los detalles
      await conn.sendFile(m.chat, thumbnail, 'cover.jpg', mensaje, m);

      // Enviar el archivo de música
      await conn.sendFile(m.chat, url, 'music.mp3', null, m);

      await m.react('✅'); // Reacción de éxito
    } else {
      await m.react('❌'); // Reacción de error
      conn.reply(
        m.chat,
        '[ ᰔᩚ ] No se pudo obtener la música para este enlace o búsqueda.',
        m
      );
    }
  } catch (error) {
    console.error(error); // Log del error para depuración
    await m.react('❌');
    conn.reply(
      m.chat,
      '[ ᰔᩚ ] Ocurrió un error al procesar tu solicitud.',
      m
    );
  }
};

handler.command = /^(spotify|sp|Spotify)$/i;
handler.tags = ['search'];
handler.register = true;

export default handler;








/* import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el nombre o palabra clave para buscar en *Spotify*.\n\n' + `Ejemplo:\n> *${usedPrefix + command}* Ozuna`, m,rcanal);
  }

  await m.react('🕓');

  try {
    let apiSearch = await fetch(`https://api.vreden.web.id/api/spotifysearch?query=${encodeURIComponent(text)}`);
    let jsonSearch = await apiSearch.json();
    let selectedTrack = jsonSearch.result[0];
    let trackUrl = selectedTrack.url;

    let apiDL = await fetch(`https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(trackUrl)}`);
    let jsonDL = await apiDL.json();

    if (jsonDL.result) {
      let { title, artists, cover, music } = jsonDL.result;
      let titulo = `- Titulo: ${title}\n- Autor: ${artists}\n- Enlace: ${trackUrl}`;

      await conn.sendFile(m.chat, cover, 'cover.jpg', titulo, m,rcanal,fake);
      await conn.sendFile(m.chat, music, 'music.mp3', null, m);
      await m.react('✅');
    } else {
      let backupAPI = await fetch(`https://api.siputzx.my.id/api/d/spotify?url=${encodeURIComponent(trackUrl)}`);
      let backupJson = await backupAPI.json();

      if (backupJson.status && backupJson.download) {
        let { name, artist, cover_url } = backupJson.metadata;
        let downloadUrl = backupJson.download;
        let titulo = `- Titulo: ${name}\n- Autor: ${artist}\n- Enlace: ${trackUrl}`;

        await conn.sendFile(m.chat, cover_url, 'cover.jpg', titulo, m,rcanal,fake);
        await conn.sendFile(m.chat, downloadUrl, 'music.mp3', null, m);
        await m.react('✅');
      } else {
        await m.react('❌');
        conn.reply(m.chat, '[ ᰔᩚ ] No se pudo obtener la música para este enlace.', m,rcanal);
      }
    }
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '[ ᰔᩚ ] Ocurrió un error al procesar tu solicitud.', m,rcanal);
  }
};

handler.command = /^(spotify|sp|Spotify)$/i;
handler.tags = ["search"];
handler.register = true;

export default handler; */