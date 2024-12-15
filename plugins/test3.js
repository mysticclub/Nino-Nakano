import axios from 'axios';
import pkg from '@whiskeysockets/baileys'; // Importación por defecto
const { createSticker } = pkg; // Extraer createSticker del paquete

let handler = async (m, { conn, text, participants }) => {
    // Filtrar los participantes, excluyendo al creador y al bot
    const groupAdmins = participants.filter(p => p.admin);
    const botId = conn.user.jid;
    const groupOwner = groupAdmins.find(p => p.isAdmin)?.id;  // Encontrar el propietario del grupo
    const groupNoAdmins = participants.filter(p => p.id !== botId && p.id !== groupOwner && !p.admin).map(p => p.id);

    if (groupNoAdmins.length === 0) throw '*⚠️ No hay usuarios para eliminar.*'; // Verifica que haya usuarios para eliminar

    // Usar el texto proporcionado en el comando o uno predeterminado
    let pesan = text || 'Grupo limpiado por el bot';  // Mensaje por defecto

    // URL del GIF que se convertirá en sticker
    const stickerUrl = 'https://pomf2.lain.la/f/9wvscc1f.webp'; // URL directa al archivo GIF

    // Descargar el archivo GIF desde la URL
    const imgBuffer = await axios.get(stickerUrl, { responseType: 'arraybuffer' })
        .then(response => Buffer.from(response.data, 'binary'))
        .catch(err => { throw '*⚠️ Error al descargar el GIF*' });

    // Crear el sticker
    let packname = 'Limpiando';  // Nombre del pack de stickers
    let author = 'Bot';  // Autor del sticker
    let sticker = false;

    try {
        // Intentar agregar EXIF si es posible
        sticker = await addExif(imgBuffer, packname, author);
    } catch (e) {
        console.error(e);
    } finally {
        // Si no se puede agregar EXIF, crear el sticker directamente
        if (!sticker) {
            sticker = await createSticker(imgBuffer, false, packname, author);
        }
    }

    // Enviar el sticker
    await conn.sendMessage(m.chat, { sticker: sticker });

    // Enviar el mensaje
    await conn.sendMessage(m.chat, { text: pesan });

    // Eliminar a cada miembro con un retraso de 2 segundos
    for (let userId of groupNoAdmins) {
        await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
        await new Promise(resolve => setTimeout(resolve, 2000));  // Espera de 2 segundos entre eliminaciones
    }

    m.reply('*[🌠] Eliminación Exitosa.*');
}

handler.help = ['kickall', '-'].map(v => 'o' + v + ' @user');
handler.tags = ['owner'];
handler.command = /^(kickall)$/i;

handler.group = true;
handler.botAdmin = true;

export default handler;