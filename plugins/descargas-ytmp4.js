import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `🦁 Ingresa un enlace de YouTube.`, m);
  }

  try {
    await m.react('⏳'); // Reacción de "procesando"

    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json || !json.data || !json.data.download || !json.data.download.url) {
      await m.react('❌'); // Reacción de error
      return conn.reply(
        m.chat,
        `❌ No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`,
        m
      );
    }

    let title = json.data.metadata.title || "Sin título";
    let dl_url = json.data.download.url;
    let fileName = json.data.filename || "video";

    await conn.sendMessage(
      m.chat,
      {
        video: { url: dl_url },
        caption: `🎥 *Título*: ${title}`,
        fileName: `${fileName}.mp4`,
        mimetype: "video/mp4",
      },
      { quoted: m }
    );

    await m.react('✅'); // Reacción de éxito

  } catch (error) {
    console.error(error);
    await m.react('❌'); // Reacción de error general
    await conn.reply(
      m.chat,
      `❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.`,
      m
    );
  }
};

handler.command = ['ytmp4'];
export default handler;