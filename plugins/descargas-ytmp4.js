let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, "❌ *Por favor, ingresa un enlace de YouTube.*", m);

    try {
        let url = `https://ytcdn.project-rian.my.id/download?url=${encodeURIComponent(text)}&resolution=144p`;

        await conn.sendMessage(m.chat, { video: { url }, caption: "🎥 *Aquí está tu video en 144p.*" }, { quoted: m });

    } catch (e) {
        console.error(e);
    }
};

handler.help = ["ytmp4"];
handler.tags = ["dl"];
handler.command = ["ytmp4"];
export default handler;
