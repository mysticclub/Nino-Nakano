import axios from 'axios';

const handler = async (m, { conn, text, args, prefix, command }) => {
  if (!args[0]) {
    return m.reply(`Introduce el ID del juego Free Fire.\n\nEjemplo:\n${prefix + command} 12345678`);
  }

  try {
    await m.reply("_Procesando los datos..._");

    const url = `https://api.vreden.web.id/api/ffstalk?id=${args[0]}`;
    const response = await axios.get(url);

    if (!response.data || !response.data.result) {
      return m.reply('Los datos no se encontraron o el ID ingresado es incorrecto.');
    }

    console.log('Respuesta de la API:', response.data);

    const result = response.data.result;

    const account = {
      id: result?.account?.id || 'No disponible',
      name: result?.account?.name || 'No disponible',
      level: result?.account?.level || 'No disponible',
      xp: result?.account?.xp || 'No disponible',
      region: result?.account?.region || 'No disponible',
      like: result?.account?.like || 'No disponible',
      bio: result?.account?.bio || 'No disponible',
      create_time: result?.account?.create_time || 'No disponible',
      last_login: result?.account?.last_login || 'No disponible',
      honor_score: result?.account?.honor_score || 'No disponible',
      booyah_pass: result?.account?.booyah_pass || 'No disponible',
      booyah_pass_badge: result?.account?.booyah_pass_badge || 'No disponible',
      evo_access_badge: result?.account?.evo_access_badge || 'No disponible',
      equipped_title: result?.account?.equipped_title || 'No disponible',
      BR_points: result?.account?.BR_points || 'No disponible',
      CS_points: result?.account?.CS_points || 'No disponible',
    };

    const petInfo = {
      name: result?.pet_info?.name || 'No disponible',
      level: result?.pet_info?.level || 'No disponible',
      type: result?.pet_info?.type || 'No disponible',
      xp: result?.pet_info?.xp || 'No disponible',
    };

    const guild = {
      name: result?.guild?.name || 'No disponible',
      id: result?.guild?.id || 'No disponible',
      level: result?.guild?.level || 'No disponible',
      member: result?.guild?.member || 'No disponible',
      capacity: result?.guild?.capacity || 'No disponible',
    };

    const ketuaGuild = {
      create_time: result?.ketua_guild?.create_time || 'No disponible',
      last_login: result?.ketua_guild?.last_login || 'No disponible',
      BP_bagdes: result?.ketua_guild?.BP_bagdes || 'No disponible',
      BR_points: result?.ketua_guild?.BR_points || 'No disponible',
      CS_points: result?.ketua_guild?.CS_points || 'No disponible',
      level: result?.ketua_guild?.level || 'No disponible',
      like: result?.ketua_guild?.like || 'No disponible',
      name: result?.ketua_guild?.name || 'No disponible',
      equipped_title: result?.ketua_guild?.equipped_title || 'No disponible',
      id: result?.ketua_guild?.id || 'No disponible',
      xp: result?.ketua_guild?.xp || 'No disponible',
    };

    const resultText = `*[ INFORMACIÓN DE STALK FF ]*\n\n` +
      `> *Información de la cuenta:*\n` +
      `  *ID*: ${account.id}\n` +
      `  *Nombre*: ${account.name}\n` +
      `  *Nivel*: ${account.level}\n` +
      `  *XP*: ${account.xp}\n` +
      `  *Región*: ${account.region}\n` +
      `  *Likes*: ${account.like}\n` +
      `  *Biografía*: ${account.bio}\n` +
      `  *Creado el*: ${account.create_time}\n` +
      `  *Último inicio de sesión*: ${account.last_login}\n` +
      `  *Puntuación de Honor*: ${account.honor_score}\n` +
      `  *Booyah Pass*: ${account.booyah_pass}\n` +
      `  *Insignia Booyah*: ${account.booyah_pass_badge}\n` +
      `  *Insignia Evo Access*: ${account.evo_access_badge}\n` +
      `  *Título equipado*: ${account.equipped_title}\n` +
      `  *Puntos BR*: ${account.BR_points}\n` +
      `  *Puntos CS*: ${account.CS_points}\n\n` +
      `> *Información de la mascota:*\n` +
      `  *Nombre*: ${petInfo.name}\n` +
      `  *Nivel*: ${petInfo.level}\n` +
      `  *Tipo*: ${petInfo.type}\n` +
      `  *XP*: ${petInfo.xp}\n\n` +
      `> *Información del gremio:*\n` +
      `  *Nombre*: ${guild.name}\n` +
      `  *ID*: ${guild.id}\n` +
      `  *Nivel*: ${guild.level}\n` +
      `  *Miembros*: ${guild.member}\n` +
      `  *Capacidad*: ${guild.capacity}\n\n` +
      `> *Información del líder del gremio:*\n` +
      `  *Creado el*: ${ketuaGuild.create_time}\n` +
      `  *Último inicio de sesión*: ${ketuaGuild.last_login}\n` +
      `  *Insignia BP*: ${ketuaGuild.BP_bagdes}\n` +
      `  *Puntos BR*: ${ketuaGuild.BR_points}\n` +
      `  *Puntos CS*: ${ketuaGuild.CS_points}\n` +
      `  *Nivel*: ${ketuaGuild.level}\n` +
      `  *Likes*: ${ketuaGuild.like}\n` +
      `  *Nombre*: ${ketuaGuild.name}\n` +
      `  *Título equipado*: ${ketuaGuild.equipped_title}\n` +
      `  *ID*: ${ketuaGuild.id}\n` +
      `  *XP*: ${ketuaGuild.xp}`;

    // Enviar el resultado al usuario
    await conn.sendMessage(m.chat, { text: resultText, mentions: [m.sender] }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply('Ocurrió un error al obtener los datos.\n> Error: ' + error.message);
  }
};

handler.command = ['ffstalk', 'stalkff', 'cekidff'];
handler.help = ['ffstalk <id>', 'stalkff <id>', 'cekidff <id>'];
handler.tags = ['tools', 'game'];
handler.limit = true;

export default handler;