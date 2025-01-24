import axios from 'axios';
const handler = async (m, {
    conn,
    text
}) => {
    if (!text) {
        return m.reply('¿Nombre?');
    }
    try {
        const {
            data
        } = await axios.post(`https://github-roaster.programordie.workers.dev/${text}`);
        const roastMessage = data.roast || 'Vaya, parece que me quedé sin palabras para roastarlo.';
        await conn.sendMessage(m.chat, {
            text: `🔥 *¡Hora de roast!* 🔥\n\n${roastMessage}`
        }, {
            quoted: m
        });
    } catch (error) {
        console.error('Error:', error);
        await m.reply('Ups, ocurrió un error. Intenta nuevamente, tal vez el código esté teniendo problemas.');
    }
};

handler.help = ['roast nombre'];
handler.tags = ['fun'];
handler.command = /^(roast|roastme)$/i;
export default handler;