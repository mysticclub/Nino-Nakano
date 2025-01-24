import axios from 'axios';

const handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('¿Nombre?');
    }
    try {
        const { data } = await axios.post(`https://github-roaster.programordie.workers.dev/${text}`);
        const roastMessageInEnglish = data.roast || 'Vaya, parece que me quedé sin palabras para roastarlo.';
        
        const translation = await axios.post('https://translate.googleapis.com/translate_a/single', null, {
            params: {
                client: 'gtx',
                sl: 'en',
                tl: 'es',
                dt: 't',
                q: roastMessageInEnglish
            }
        });
        const roastMessageInSpanish = translation.data[0][0][0];

        await conn.sendMessage(m.chat, {
            text: `🔥 *¡Hora de roast!* 🔥\n\n${roastMessageInSpanish}`
        }, { quoted: m });

    } catch (error) {
        console.error('Error:', error);
        await m.reply('Ups, ocurrió un error. Intenta nuevamente, tal vez el código esté teniendo problemas.');
    }
};

handler.help = ['roast nombre'];
handler.tags = ['fun'];
handler.command = /^(roast|roastme)$/i;

export default handler;



/* import axios from 'axios';
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
export default handler; */