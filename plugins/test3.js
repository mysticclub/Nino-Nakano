import axios from 'axios';
import * as cheerio from 'cheerio';
import FormData from 'form-data';

const descargadorSmule = async (url) => {
    try {
        const formData = new FormData();
        formData.append('smule_url', url);
        formData.append('smule_download', 'Descargar');
        const response = await axios.post('https://smuledownloader.online/', formData, {
            headers: {
                ...formData.getHeaders(),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://smuledownloader.online/',
            }
        });

        const $ = cheerio.load(response.data);
        const titulo = $('.centerr h4').text().trim();
        const imagen = $('.centerr img').attr('src');
        const enlaceDescarga = $('.centerr table tbody tr td a').attr('href');
        const tamaño = $('.centerr table tbody tr td').eq(0).text().trim();
        const calidad = $('.centerr table tbody tr td').eq(1).text().trim();
        const formato = $('.centerr table tbody tr td').eq(2).text().trim();

        if (!titulo || !enlaceDescarga) {
            throw new Error('Error al procesar la información.');
        }

        return {
            titulo,
            imagen,
            enlaceDescarga,
            tamaño,
            calidad,
            formato,
        };
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, {
            text: "¡URL no válida!"
        }, {
            quoted: m
        });
    }

    try {
        const resultado = await descargadorSmule(args[0]);
        await conn.sendMessage(m.chat, {
            text: `📌 *Título:* ${resultado.titulo}\n💾 *Tamaño:* ${resultado.tamaño}\n📈 *Calidad:* ${resultado.calidad}\n🎶 *Formato:* ${resultado.formato}\n🔗 *Enlace de descarga:* ${resultado.enlaceDescarga}`,
        }, {
            quoted: m
        });
    } catch (error) {
        conn.sendMessage(m.chat, {
            text: `${error.message}`
        }, {
            quoted: m
        });
    }
};

handler.command = ['smule'];
handler.tags = ['descargador'];
handler.help = ['smule url'];
export default handler;