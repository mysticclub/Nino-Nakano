import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `🌸 Ingresa un texto para hablar con LilyChan`, m);
    
    try {
        let api = await fetch(`https://archive-ui.tanakadomp.biz.id/ai/lilychan?text=${encodeURIComponent(text)}`);
        let json = await api.json();
        
        if (json.success) await m.reply(json.response);
        else await m.reply(`🌸 Hubo un error al obtener la respuesta.`);
        
    } catch (error) {
        console.error(error);
        await m.reply(`🌸 Ocurrió un error al procesar tu solicitud.`);
    }
};

handler.help = ['lilychan *<texto>*'];
handler.tags = ['ai'];
handler.command = ['lilychan'];

export default handler;