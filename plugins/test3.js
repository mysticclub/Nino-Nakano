import axios from 'axios'
import { MessageType } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
    // Filtrar los participantes, excluyendo al creador y al bot
    const groupAdmins = participants.filter(p => p.admin);
    const botId = conn.user.jid;
    const groupOwner = groupAdmins.find(p => p.isAdmin)?.id;  // Encontrar el propietario del grupo
    const groupNoAdmins = participants.filter(p => p.id !== botId && p.id !== groupOwner && !p.admin).map(p => p.id);

    if (groupNoAdmins.length === 0) throw '*⚠️ No hay usuarios para eliminar.*'; // Verifica que haya usuarios para eliminar

    // Usar el texto proporcionado en el comando o uno predeterminado
    let pesan = text || 'Grupo limpiado por el bot';  // Mensaje por defecto

    // Enviar el sticker primero
    const stickerUrl = 'https://pixabay.com/gif/6391/barrer-barriendo-limpio-suave-6391/'; // URL del GIF
    const stickerBuffer = await axios.get(stickerUrl, { responseType: 'arraybuffer' })
        .then(response => Buffer.from(response.data, 'binary'));

    // Enviar el sticker
    await conn.sendMessage(m.chat, { sticker: stickerBuffer });

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