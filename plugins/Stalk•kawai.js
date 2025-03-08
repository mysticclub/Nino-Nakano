import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🚩 Por favor, ingrese un nombre de usuario para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* Vegeta_Sola`, m, rcanal);
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
    let txt = '`K W A I  -  S T A L K`\n\n';
    txt += `✩ *Nombre:* ${user.nome}\n`;
    txt += `✩ *Nombre de Usuario:* ${user.nome_usuario}\n`;
    txt += `✩ *Bio:* ${user.bio}\n`;
    txt += `✩ *Seguidores:* ${user.seguidores}\n`;
    txt += `✩ *Siguiendo:* ${user.seguindo}\n`;
    txt += `✩ *Total de Videos:* ${user.total_videos}\n`;
    txt += `✩ *Perfil:* ${user.url_perfil}\n\n`;

    txt += '`V I D E O S`\n\n';
    user.videos.forEach(video => {
      txt += `✩ *Título:* ${video.titulo}\n`;
      txt += `✩ *Descripción:* ${video.descripcion}\n`;
      txt += `✩ *URL:* ${video.url}\n`;
      txt += `✩ *Duración:* ${video.duracao}\n`;
      txt += `✩ *Likes:* ${video.curtidas}\n`;
      txt += `✩ *Comentarios:* ${video.comentarios}\n`;
      txt += `✩ *Compartidos:* ${video.compartilhamentos}\n\n`;
    });
    

    let imge = `https://qu.ax/HBdtn.jpg`;
        
    await conn.sendMessage(m.chat, { image: { url: imge }, caption: txt }, { quoted: m });
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