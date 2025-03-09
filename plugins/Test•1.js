let handler = async (m, { conn, text, command }) => {
  if (m.isGroup) {
    return await m.reply('Este comando debe ser enviado en privado.');
  }

  let [commandText, groupLink] = text.split(" ");
  if (!groupLink) {
    return await m.reply('Debes proporcionar el enlace del grupo después del comando. Ejemplo: .salir <enlace del grupo>');
  }

  try {
    let group = await conn.groupMetadata(groupLink);
    if (!group || !group.participants.some(p => p.id === conn.user.id)) {
      return await m.reply('No soy miembro del grupo al que intentas que me retire. No puedo realizar la acción.');
    }

    await conn.reply(groupLink, `🍟 *Ai Genesis* Abandona El Grupo, Fue Genial Estar Aquí`);
    await conn.groupLeave(groupLink);

    await conn.reply(m.chat, 'Orden cumplida, me retiro del grupo ✅', m);

  } catch (e) {
    console.log(e);
    await m.reply('Ocurrió un error al intentar salir del grupo.');
  }
}

handler.command = ['salir2']
handler.private = true
handler.rowner = true
export default handler;