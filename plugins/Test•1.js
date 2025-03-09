let handler = async (m, { conn, text, command }) => {
  if (m.isGroup) {
    return await m.reply('Este comando debe ser enviado en privado.');
  }

  let groupLink = text.trim();
  if (!groupLink || !groupLink.includes('chat.whatsapp.com/')) {
    return await m.reply('Debes proporcionar un enlace de grupo válido después del comando. Ejemplo: .salir https://chat.whatsapp.com/<enlace>');
  }

  try {
    await conn.reply(groupLink, `🍟 *Ai Genesis* Abandona El Grupo, Fue Genial Estar Aquí`);
    await conn.groupLeave(groupLink.split('chat.whatsapp.com/')[1]);
    await conn.reply(m.chat, 'Orden cumplida, me retiro del grupo ✅', m);
  } catch (e) {
    console.log(e);
    await m.reply('Ocurrió un error al intentar salir del grupo. Asegúrate de que el enlace sea válido y que el bot sea miembro del grupo.');
  }
}

handler.command = ['salir2']
handler.private = true
handler.rowner = true
export default handler;