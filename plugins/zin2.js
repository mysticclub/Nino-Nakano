/* let handler = async (m, { conn, isRowner }) => {
    const newName = m.text.trim().split(' ').slice(1).join(' ');
  
   
    if (!newName) {
      return m.reply('Por favor, proporciona un nuevo nombre para el bot.');
    }
  
   
    global.botname = newName;  
    global.packname = newName; 
    global.wm = newName; 
    global.namebot = newName; 
    global.titulowm = newName; 
    global.titulowm2 = newName; 
  
    
    m.reply(`ยกEl nombre del bot ha sido actualizado a: ${newName}!`);
  
  
  };
  
 
  handler.help = ['setname'];  
  handler.tags = ['banner'];
  handler.command = ['setname']; 
  handler.rowner = true

  export default handler; */

/* let handler = async (m, { conn, isRowner }) => {
    // Verificar si el bot es el bot principal
    if (global.conn.user.jid === conn.user.jid) {
        return m.reply('Este comando solo puede ser usado en SubBots, no en el Bot principal.');
    }

    const newName = m.text.trim().split(' ').slice(1).join(' ');

    if (!newName) {
        return m.reply('Por favor, proporciona un nuevo nombre para el bot.');
    }

    // Verifica si el bot es un subbot y actualiza el nombre solo en los subbots
    if (global.conn.user.jid !== conn.user.jid) {
        // Actualizar el nombre en las variables globales solo para subbots
        global.botname = newName;
        global.packname = newName;
        global.wm = newName;
        global.namebot = newName;
        global.titulowm = newName;
        global.titulowm2 = newName;

        m.reply(`El nombre del subbot ha sido actualizado a: ${newName}!`);
    }
};

handler.help = ['setname'];
handler.tags = ['banner'];
handler.command = ['setname'];
handler.rowner = true;

export default handler; */
