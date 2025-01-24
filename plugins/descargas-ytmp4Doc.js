import { spawn } from 'child_process';

let handler = async (m, { conn }) => {
    const imageUrl = 'https://i.ibb.co/Y7mhFdf/file.jpg'; 

    await conn.sendMessage(m.chat, { 
        image: { url: imageUrl },
        caption: '¡Bienvenido al bot! ¿Qué acción te gustaría realizar?',
        buttons: [
          { 
            buttonId: 'accion_1', 
            buttonText: { displayText: 'Agregar a tu Grupo' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_2', 
            buttonText: { displayText: 'Actualizaciones' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_3', 
            buttonText: { displayText: 'Pagina Oficial' }, 
            type: 1 
          },
        ],
        viewOnce: true,
        headerType: 4 
      }, { quoted: m });
};

handler.help = ['start'];
handler.tags = ['general'];
handler.command = ['Start', 'start'];

export default handler;