/* let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = false

    m.reply('CHAT DESBANEADO')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = ['unbanchat']
handler.botAdmin = true
handler.admin = true 
handler.group = true

export default handler */

let handler = async (m, { isOwner }) => {
    // Validar que el comando lo ejecute el dueño del bot
    if (!isOwner) {
        return m.reply('Este comando solo puede ser usado por el dueño del bot.');
    }

    // Validar que el chat exista en la base de datos
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {}; // Crear entrada si no existe
    }

    // Cambiar el estado de baneo
    global.db.data.chats[m.chat].isBanned = false;
    m.reply('CHAT DESBANEADO');
};

// Configuración del comando
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = ['unbanchat']; // Puede aceptar múltiples alias
handler.rowner = true; // Requiere permisos de dueño del bot

export default handler;