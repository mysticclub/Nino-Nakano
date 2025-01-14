import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

const handler = async (m, { conn }) => {
    try {
        const tempFilePath = path.resolve('./temp-image.jpg'); // Ruta temporal para el archivo
        const thumbnailUrl = 'https://telegra.ph/file/61d0cf9605cf904f6e5f9.jpg';

        const response = await axios({ url: thumbnailUrl, responseType: 'arraybuffer' });
        const resizedImage = await sharp(response.data)
            .resize(400, 400)
            .jpeg()
            .toBuffer();

     
        fs.writeFileSync(tempFilePath, resizedImage);

        
        const { size } = fs.statSync(tempFilePath);

       
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(tempFilePath),
            fileName: 'Sock.jpg', 
            fileLength: size,
            caption: `qq`,
            mimetype: 'image/jpeg',
            jpegThumbnail: resizedImage,
        }, { quoted: m });

        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        await conn.sendMessage(m.chat, { text: 'Hubo un error al enviar el mensaje.' }, { quoted: m });
    }
};

handler.command = ["senddoct"];

export default handler;
