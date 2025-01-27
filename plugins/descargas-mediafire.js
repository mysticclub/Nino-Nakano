import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de mediafire`, m)
    await m.react('🕓');

    try {
        let api = await fetch(`https://dark-core-api.vercel.app/api/mediafire?key=TWIzumi&url=${text}`)
        let json = await api.json()
        if (!json.success) return m.reply('❌ Error al obtener los detalles del enlace, por favor intenta nuevamente.');

        let { name, size, date, mime, link } = json.result;
        let caption = `*Nombre:* ${name}

- *Tamaño:* ${size}
- *Fecha:* ${date}
- *Tipo MIME:* ${mime}`;

        // Enviar el archivo con el caption
        await conn.sendFile(m.chat, link, name, caption, m, null, { mimetype: mime, asDocument: true });
        
        await m.react('✅');
    } catch (error) {
        console.error(error)
        m.reply('❌ Ocurrió un error al procesar la solicitud.')
    }
}

handler.help = ['mediafire *<url>*']
handler.tags = ['dl']
handler.command = ['mediafire']

export default handler;