import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    await m.react('✖️');
    return conn.reply(m.chat, `☁️ Ingresa un enlace de YouTube.`, m, fake);
  }

  try {
    await m.react('🕒');

    let api = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=Izumi22&url=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json || !json.download || !json.download.url) {
      await m.react('❌');
      return conn.reply(
        m.chat,
        `❌ No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`,
        m
      );
    }

    let title = json.title || "Sin título";
    let quality = json.quality || "Desconocida";
    let dl_url = json.download;
    let fileName = title.replace(/[^a-zA-Z0-9]/g, '_');

    await conn.sendMessage(
      m.chat,
      {
        video: { url: dl_url },
        caption: `🎥 *Título*: ${title}\n📊 *Calidad*: ${quality}`,
        fileName: `${fileName}.mp4`,
        mimetype: "video/mp4",
      },
      { quoted: m }
    );

    await m.react('✅');

  } catch (error) {
    console.error(error);
    await m.react('❌');
    await conn.reply(
      m.chat,
      `❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.`,
      m
    );
  }
};

handler.help = ['ytmp4 *<url>*']
handler.tags = ['dl']
handler.command = ['ytmp4'];
export default handler;