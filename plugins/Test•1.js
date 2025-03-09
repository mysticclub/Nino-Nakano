let handler = async (m, { conn, text, command }) => {
  if (m.isGroup) {
    return await m.reply('Este comando debe ser enviado en privado.');
  }

  let groupLink = text.trim();
  if (!groupLink || !groupLink.includes('chat.whatsapp.com/')) {
    return await m.reply('Debes proporcionar un enlace de grupo válido después del comando. Ejemplo: .salir https://chat.whatsapp.com/<enlace>');
  }

  try {
    // Extraemos el ID del grupo del enlace
    let groupId = groupLink.split('chat.whatsapp.com/')[1];
    
    // Obtenemos los metadatos del grupo con el ID extraído
    let group = await conn.groupMetadata(groupId);
    if (!group) {
      return await m.reply('No pude obtener información sobre el grupo. Verifica el enlace proporcionado.');
    }

    // Verificamos si el bot es miembro del grupo
    let isBotMember = group.participants.some(p => p.id === conn.user.id);
    if (!isBotMember) {
      return await m.reply('No soy miembro del grupo al que intentas que me retire. No puedo realizar la acción.');
    }

    // Si es miembro, el bot se retira del grupo
    await conn.reply(groupLink, `🍟 *Ai Genesis* Abandona El Grupo, Fue Genial Estar Aquí`);
    await conn.groupLeave(groupId);

    await conn.reply(m.chat, 'Orden cumplida, me retiro del grupo ✅', m);

  } catch (e) {
    console.log(e);
    await m.reply('Ocurrió un error al intentar salir del grupo. Asegúrate de que el enlace sea válido y que el bot sea miembro del grupo.');
  }
}

handler.command = ['salir']
handler.private = true
handler.rowner = true
export default handler;