


import { spawn } from 'child_process';

let handler = async (m, { conn }) => {
    const imageUrl = 'https://i.ibb.co/cLMH26y/file.jpg'; 

    await conn.sendMessage(m.chat, { 
        image: { url: imageUrl },
        caption: '¡Bienvenido al bot! ¿Qué acción te gustaría realizar?',
        buttons: [
          { 
            buttonId: 'accion_1', 
            buttonText: { displayText: '⊹₊ ⋆ᯓᡣ𐭩 ᥲgrᥱgᥲmᥱ ᥲ 𝗍ᥙ grᥙ⍴᥆' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_2', 
            buttonText: { displayText: '⊹₊ ⋆ᯓᡣ𐭩 ᥲᥴ𝗍ᥙᥲᥣіzᥲᥴі᥆ᥒᥱs' }, 
            type: 1 
          },
          { 
            buttonId: 'accion_3', 
            buttonText: { displayText: '⊹₊ ⋆ᯓᡣ𐭩 ⍴ᥲgіᥒᥲ ᥆𝖿іᥴіᥲᥣ' }, 
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