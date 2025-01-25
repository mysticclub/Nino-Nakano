import fetch from "node-fetch";

let handler = async (m, { conn, args, text }) => {
    // Lista de plataformas soportadas
    const supportedPlatforms = [
        "Facebook", "Instagram", "TikTok", "Twitter", "Reddit", "Soundcloud", "Vimeo", 
        "Pinterest", "Tumblr", "Douyin", "DailyMotion", "OnlyFans", "Twitch", 
        "Rumble", "LinkedIn", "9GAG", "GettyImages", "Shutterstock", "Envato Elements", 
        "Blogger", "Flickr", "Bilibili", "Bandcamp", "Gaana", "MX TakaTak", "Snack Video", 
        "ShareChat", "Smule", "WeSing", "StarMaker", "Likee", "VK", "Roposo", "Telegram", 
        "Buzzfeed", "Truth Social", "Artgrid", "StoryBlocks", "Artlist", "EyeEM", "Epidemic Sound"
    ];

    if (!args[0]) {
        throw m.reply(
            `✧ Por favor, ingresa un enlace válido de alguna de las siguientes plataformas soportadas:\n\n- ${supportedPlatforms.join("\n- ")}`
        );
    }

    const apiKey = 'xenzpedo';
    const url = args[0];

    await conn.sendMessage(m?.chat, { react: { text: `🌟`, key: m?.key } });

    try {
        // Llamada a la API
        const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/allin?url=${encodeURIComponent(url)}&apikey=${apiKey}`);
        const result = await response.json();

        if (result.status === 200 && result.result) {
            const { title, video, audio } = result.result;

            // Crear mensaje con el título
            const titleMessage = `*Título*: ${title || 'Sin título disponible'}\n\n`;

            // Enviar el video si está disponible
            if (video) {
                await conn.sendMessage(m.chat, { video: { url: video }, caption: titleMessage + '*Video*:' }, { quoted: m });
            } else {
                await m.reply("No se encontró un enlace de video.");
            }

            // Enviar el audio si está disponible
            if (audio) {
                await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4', ptt: false }, { quoted: m });
            } else {
                await m.reply("No se encontró un enlace de audio.");
            }
        } else {
            // Manejo de errores de la API
            await m.reply(`Error: ${result.message || 'No se pudo procesar el enlace.'}`);
        }
    } catch (error) {
        console.error(error);
        await m.reply(`Error: ${error.message}`);
    }
};

handler.help = ['aio'].map(v => v + ' *<link>*');
handler.tags = ['downloader'];
handler.command = /^(aio)$/i;

handler.limit = true;
handler.register = true;

export default handler;