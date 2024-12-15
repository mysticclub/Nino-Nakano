import axios from 'axios';

let handler = async (m, { conn, text, participants }) => {

    // Filtrar a los administradores y obtener el ID del bot y del dueño del grupo
    const groupAdmins = participants.filter(p => p.admin);
    const botId = conn.user.jid;
    const groupOwner = groupAdmins.find(p => p.isAdmin)?.id;
    const groupNoAdmins = participants.filter(p => p.id !== botId && p.id !== groupOwner && !p.admin).map(p => p.id);

    if (groupNoAdmins.length === 0) throw '*⚠️ No hay usuarios para eliminar.*'; // Verifica que haya usuarios para eliminar

    // URL del sticker que se enviará
    const stickerUrl = 'https://pomf2.lain.la/f/9wvscc1f.webp'; 

    // Enviar el sticker primero, antes de cualquier otra acción
    await conn.sendFile(m.chat, stickerUrl, 'sticker.webp', '', m, null);

    // Esperar 2 segundos antes de empezar la eliminación de miembros
    for (let userId of groupNoAdmins) {
        await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Espera de 2 segundos entre eliminaciones
    }

    // Enviar mensaje de éxito una vez que se hayan eliminado los usuarios
    m.reply('*[🌠] Eliminación Exitosa.*');
}

handler.help = ['kickall', '-'].map(v => 'o' + v + ' @user');
handler.tags = ['owner'];
handler.command = /^(kickall)$/i;

handler.group = true;
handler.botAdmin = true;

export default handler;