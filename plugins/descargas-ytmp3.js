import fetch from 'node-fetch';

const MP3_API = 'https://38fb-2800-200-f180-b59-4f2-6eae-a8fc-7658.ngrok-free.app/download/mp3?url=';

const handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, '*`Por favor ingresa un enlace de YouTube válido.`*', m);

    await m.react('🕓');
    try {
        let url = args[0];
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return conn.reply(m.chat, '*`El enlace no es válido. Debe ser un enlace de YouTube.`*', m);
        }

        let response = await fetch(`${MP3_API}${encodeURIComponent(url)}`);
        
        // Verifica si la API respondió correctamente
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();

        console.log("Respuesta de la API:", data);
        if (!data.download_url) throw new Error('La API no devolvió un enlace de descarga.');

        await conn.sendMessage(m.chat, {
            audio: { url: data.download_url },
            mimetype: 'audio/mp4',
            fileName: `${data.title || "audio"}.mp3`
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error("Error en el handler:", e);
        await m.react('✖️');
        conn.reply(m.chat, `*Error al descargar el audio:*\n\`${e.message}\``, m);
    }
};

handler.help = ['ytmp3 <url>'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];

export default handler;
