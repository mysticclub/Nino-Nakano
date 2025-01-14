let handler = async (m, { conn, isRowner }) => {
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

  export default handler;