import axios from 'axios';
import fs from 'fs';

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `[ ✰ ] Ingresa un enlace válido para descargar el archivo.`, m);
    }

    await m.react('🕓');

    try {
        // Llamada a la API de BK9
        const response = await axios.get(`https://bk9.fun/download/alldownload?url=${encodeURIComponent(args[0])}`);
        const data = response.data;

        if (data.status) {
            const { title, low, high } = data.BK9;
            const fileUrl = high || low || data.BK9.download;
            
            // Obtener la extensión del archivo
            const extension = fileUrl.split('.').pop().split('?')[0];

            // Determinar el tipo de archivo a enviar
            let fileType = 'document';
            if (['mp4', 'mov', 'avi'].includes(extension)) {
                fileType = 'video';
            } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
                fileType = 'image';
            }

            // Descargar el archivo
            const fileResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });
            const fileName = `file.${extension}`;
            fs.writeFileSync(fileName, fileResponse.data);

            // Mensaje con información del archivo
            const message = `🏷️ *Título*: ${title}\n` +
                            `📄 *Tipo*: ${fileType.toUpperCase()}\n` +
                            `🔗 *Enlace Original*: ${args[0]}`;

            // Enviar el archivo según el tipo
            if (fileType === 'video') {
                await conn.sendFile(m.chat, fileResponse.data, fileName, message, m);
            } else if (fileType === 'image') {
                await conn.sendFile(m.chat, fileResponse.data, fileName, message, m, { mimetype: 'image/jpeg' });
            } else {
                await conn.sendMessage(m.chat, { document: fileResponse.data, fileName, mimetype: 'application/octet-stream', caption: message }, { quoted: m });
            }

            await m.react('✅');
        } else {
            await conn.reply(m.chat, `[ ✰ ] Ocurrió un error: No se pudo descargar el archivo.`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `[ ✰ ] Ocurrió un error al procesar tu solicitud.`, m);
        await m.react('✖️');
    }
};

handler.help = ['download *<url>*'];
handler.tags = ['dl'];
handler.command = ['download', 'video', 'image', 'doc'];

export default handler;