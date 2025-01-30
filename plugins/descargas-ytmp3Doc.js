import fetch from 'node-fetch';
const handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '*Ingrese la url de la APK que quiera descargar.*', m);
try {
const apiUrl = `https://dark-core-api.vercel.app/api/download/getapk?key=user1&url=${encodeURIComponent(text)}`;
const res = await fetch(apiUrl);
const json = await res.json();
if (!json.success) return conn.reply(m.chat, '*[❗] Error, no se encontraron resultados para su búsqueda.*', m);
const { title, version, category, downloadLink } = json.data;
const caption = `🍟 *Descargador de APK* 🍟\n\n• *Nombre:* ${title}\n• *Versión:* ${version}\n• *Categoría:* ${category}`;
await conn.sendMessage(m.chat, {
document: { url: downloadLink },
mimetype: 'application/vnd.android.package-archive',
fileName: `${title}.apk`,
caption
}, { quoted: m });
} catch (e) {
return conn.reply(m.chat, '*[❗] Error al procesar la solicitud.*', m);
}
};
handler.command = /^(apkdroid)$/i;
export default handler;