import axios from 'axios';
import { MessageType } from '@whiskeysockets/baileys';
import { writeFile } from 'fs/promises';
import path from 'path';

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
    const stickerUrl = 'https://pomf2.lain.la/f/9wvscc1f.webp'; // URL actualizada del sticker

    // Descargar el archivo del sticker desde la URL
    const imgBuffer = await axios.get(stickerUrl, { responseType: 'arraybuffer' })
        .then(response => Buffer.from(response.data, 'binary'))
        .catch(err => { throw '*⚠️ Error al descargar el GIF*' });

    // Guardar el archivo temporalmente
    const tempPath = path.join(__dirname, 'temp_sticker.webp');
    await writeFile(tempPath, imgBuffer);

    // Crear el sticker con la función de Baileys (dependiendo de tu entorno, la función puede variar)
    let sticker = false;
    try {
        // Usa la función de Baileys para convertir el archivo en sticker (esto puede variar dependiendo de la configuración)
        sticker = await conn.prepareMessageFromContent(m.chat, { 
            [MessageType.sticker]: { url: tempPath } 
        }, {});
    } catch (e) {
        console.error(e);
        throw '*⚠️ Error al crear el sticker.*';
    }

    // Enviar el sticker
    await conn.sendMessage(m.chat, { sticker: sticker.message.sticker });

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