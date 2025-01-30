import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m);

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/getapk?key=user1&url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.success) throw '*[❗] Error, no se encontraron resultados para su búsqueda.*';

    const { title, version, category, downloadLink } = json.data;

    // Hacer una petición HEAD para obtener la información del archivo
    const headRes = await fetch(downloadLink, { method: 'HEAD' });
    const contentType = headRes.headers.get('content-type');
    const contentDisposition = headRes.headers.get('content-disposition');

    let fileExtension = 'apk';
    if (contentType?.includes('zip') || contentDisposition?.includes('.zip')) {
      fileExtension = 'zip';
    }

    const mimetype = fileExtension === 'zip' ? 'application/zip' : 'application/vnd.android.package-archive';

    const caption = `📲 *Descargador de APK/ZIP* 📲\n\n📌 *Nombre:* ${title}\n🔢 *Versión:* ${version}\n📂 *Categoría:* ${category}`;

    await conn.sendMessage(m.chat, {
      document: { url: downloadLink },
      mimetype,
      fileName: `${title}.${fileExtension}`,
      caption
    }, { quoted: m });

  } catch (e) {
    throw '*[❗] Error al procesar la solicitud.*';
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;