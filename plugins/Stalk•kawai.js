import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🚩 Por favor, ingrese un nombre de usuario para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* Vegeta_Sola`,
      m
    );
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://api.nexfuture.com.br/api/outros/kwstalk?query=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.resultado) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    const user = json.resultado;
    let txt = `*K W A I  -  S T A L K*\n\n`;
    txt += `✩ *Nombre:* ${user.nome}\n`;
    txt += `✩ *Usuario:* ${user.nome_usuario}\n`;
    txt += `✩ *Bio:* ${user.bio || 'No disponible'}\n`;
    txt += `✩ *Seguidores:* ${user.seguidores.toLocaleString()}\n`;
    txt += `✩ *Siguiendo:* ${user.seguindo.toLocaleString()}\n`;
    txt += `✩ *Total de Videos:* ${user.total_videos}\n`;
    txt += `✩ *Perfil:* ${user.url_perfil}\n\n`;

    if (user.videos.length > 0) {
      txt += '*🎥 Últimos videos:*\n\n';
      user.videos.slice(0, 3).forEach((video, i) => {
        txt += `📹 *Video ${i + 1}:*\n`;
        txt += `✩ *Título:* ${video.titulo}\n`;
        txt += `✩ *Descripción:* ${video.descricao}\n`;
        txt += `✩ *Duración:* ${video.duracao.replace('PT', '').toLowerCase()}\n`;
        txt += `✩ *Likes:* ${video.curtidas.toLocaleString()}\n`;
        txt += `✩ *Comentarios:* ${video.comentarios.toLocaleString()}\n`;
        txt += `✩ *Compartidos:* ${video.compartilhamentos.toLocaleString()}\n`;
        txt += `✩ *🔗 [Ver Video]( ${video.url} )*\n\n`;
      });
    } else {
      txt += '❌ No hay videos disponibles.\n\n';
    }

    await conn.sendMessage(m.chat, {
      image: { url: user.foto_perfil },
      caption: txt
    }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['kwaistalk *<nombre>*'];
handler.tags = ['stalk'];
handler.command = ['kwaistalk', 'kwstalk'];
handler.register = true;

export default handler;