import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text || !text.trim()) throw '⚠️ Ingresa un número de teléfono válido.';

  try {
    let url = `https://api.ryzendesu.vip/api/stalk/get-contact?number=${encodeURIComponent(text.trim())}`;
    let res = await fetch(url);
    if (!res.ok) throw `❌ ¡Error al obtener datos de la API! Estado: ${res.status}`;

    let json = await res.json();
    if (!json.result) throw '❌ No se encontraron datos para ese número.';

    let { name, phone, provider } = json.result.userData;
    let tags = json.result.tags || [];
    let message = `
📞 *Información de Contacto* 📞
━━━━━━━━━━━━━━━━━━━
👤 *Nombre*: ${name}
📱 *Número*: ${phone}
🌐 *Proveedor*: ${provider}

🏷️ *Etiquetas*:
${tags.length ? tags.map(tag => `- ${tag}`).join('\n') : 'No hay etiquetas disponibles.'}
    `.trim();

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });
  } catch (err) {
    await conn.sendMessage(m.chat, { text: `❌ Error: ${err.message || 'No se pudo obtener la información.'}` }, { quoted: m });
  }
};

handler.help = ['getcontact <número>'];
handler.tags = ['tools'];
handler.command = /^(getcontact)$/i;

handler.limit = 5;
handler.register = true;

export default handler;