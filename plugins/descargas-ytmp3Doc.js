import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, text }) => {
  if (!text) throw conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m);

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/getapk?key=user1&url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.success) throw '*[❗] Error, no se encontraron resultados para su búsqueda.*';

    const { title, version, category, downloadLink } = json.data;

    const caption = `📲 *Descargador de APK/ZIP* 📲\n\n📌 *Nombre:* ${title}\n🔢 *Versión:* ${version}\n📂 *Categoría:* ${category}`;

    // Ruta donde se guardará el archivo temporalmente
    const tempFilePath = `/tmp/${title}`;
    
    // Descargar el archivo
    const response = await fetch(downloadLink);
    const buffer = await response.arrayBuffer();
    await fs.promises.writeFile(tempFilePath, Buffer.from(buffer));

    // Detectar si es ZIP o APK basándonos en el contenido del archivo
    let fileExtension = 'apk';
    const fileSignature = buffer.slice(0, 4).toString('hex');

    if (fileSignature === '504b0304') { // Firma de ZIP
      fileExtension = 'zip';
    }

    const mimetype = fileExtension === 'zip' ? 'application/zip' : 'application/vnd.android.package-archive';
    const finalFilePath = `${tempFilePath}.${fileExtension}`;
    
    // Renombrar el archivo con su extensión correcta
    await fs.promises.rename(tempFilePath, finalFilePath);

    await conn.sendMessage(m.chat, {
      document: { url: finalFilePath },
      mimetype,
      fileName: `${title}.${fileExtension}`,
      caption
    }, { quoted: m });

    // Eliminar el archivo temporal después de enviarlo
    setTimeout(() => fs.unlinkSync(finalFilePath), 60000);

  } catch (e) {
    console.error(e);
    throw '*[❗] Error al procesar la solicitud.*';
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk2)$/i;

export default handler;