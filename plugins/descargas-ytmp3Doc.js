import axios from 'axios';
 
const handler = async (m, { conn, text, args, prefix, command }) => {
  if (!args[0]) {
    return m.reply(`Masukkan ID Game Free Fire.\n\nContoh:\n${prefix + command} 12345678`);
  }
 
  try {
    await m.reply("_Sedang memproses data..._");
 
    const url = `https://api.vreden.web.id/api/ffstalk?id=${args[0]}`;
    const response = await axios.get(url);
 
    if (!response.data || !response.data.result) {
      return m.reply('Data tidak ditemukan atau ID yang dimasukkan salah.');
    }
 
    console.log('API Response:', response.data);
 
    const result = response.data.result;
 
    const account = {
      id: result?.account?.id || 'Tidak tersedia',
      name: result?.account?.name || 'Tidak tersedia',
      level: result?.account?.level || 'Tidak tersedia',
      xp: result?.account?.xp || 'Tidak tersedia',
      region: result?.account?.region || 'Tidak tersedia',
      like: result?.account?.like || 'Tidak tersedia',
      bio: result?.account?.bio || 'Tidak tersedia',
      create_time: result?.account?.create_time || 'Tidak tersedia',
      last_login: result?.account?.last_login || 'Tidak tersedia',
      honor_score: result?.account?.honor_score || 'Tidak tersedia',
      booyah_pass: result?.account?.booyah_pass || 'Tidak tersedia',
      booyah_pass_badge: result?.account?.booyah_pass_badge || 'Tidak tersedia',
      evo_access_badge: result?.account?.evo_access_badge || 'Tidak tersedia',
      equipped_title: result?.account?.equipped_title || 'Tidak tersedia',
      BR_points: result?.account?.BR_points || 'Tidak tersedia',
      CS_points: result?.account?.CS_points || 'Tidak tersedia',
    };
 
    const petInfo = {
      name: result?.pet_info?.name || 'Tidak tersedia',
      level: result?.pet_info?.level || 'Tidak tersedia',
      type: result?.pet_info?.type || 'Tidak tersedia',
      xp: result?.pet_info?.xp || 'Tidak tersedia',
    };
 
    const guild = {
      name: result?.guild?.name || 'Tidak tersedia',
      id: result?.guild?.id || 'Tidak tersedia',
      level: result?.guild?.level || 'Tidak tersedia',
      member: result?.guild?.member || 'Tidak tersedia',
      capacity: result?.guild?.capacity || 'Tidak tersedia',
    };
 
    const ketuaGuild = {
      create_time: result?.ketua_guild?.create_time || 'Tidak tersedia',
      last_login: result?.ketua_guild?.last_login || 'Tidak tersedia',
      BP_bagdes: result?.ketua_guild?.BP_bagdes || 'Tidak tersedia',
      BR_points: result?.ketua_guild?.BR_points || 'Tidak tersedia',
      CS_points: result?.ketua_guild?.CS_points || 'Tidak tersedia',
      level: result?.ketua_guild?.level || 'Tidak tersedia',
      like: result?.ketua_guild?.like || 'Tidak tersedia',
      name: result?.ketua_guild?.name || 'Tidak tersedia',
      equipped_title: result?.ketua_guild?.equipped_title || 'Tidak tersedia',
      id: result?.ketua_guild?.id || 'Tidak tersedia',
      xp: result?.ketua_guild?.xp || 'Tidak tersedia',
    };
 
    
    const resultText = `*[ STALK FF ]*\n\n` +
      `> *Account Info:*\n` +
      `  *ID*: ${account.id}\n` +
      `  *Name*: ${account.name}\n` +
      `  *Level*: ${account.level}\n` +
      `  *XP*: ${account.xp}\n` +
      `  *Region*: ${account.region}\n` +
      `  *Like*: ${account.like}\n` +
      `  *Bio*: ${account.bio}\n` +
      `  *Created At*: ${account.create_time}\n` +
      `  *Last Login*: ${account.last_login}\n` +
      `  *Honor Score*: ${account.honor_score}\n` +
      `  *Booyah Pass*: ${account.booyah_pass}\n` +
      `  *Booyah Badge*: ${account.booyah_pass_badge}\n` +
      `  *Evo Access Badge*: ${account.evo_access_badge}\n` +
      `  *Equipped Title*: ${account.equipped_title}\n` +
      `  *BR Points*: ${account.BR_points}\n` +
      `  *CS Points*: ${account.CS_points}\n\n` +
      `> *Pet Info:*\n` +
      `  *Name*: ${petInfo.name}\n` +
      `  *Level*: ${petInfo.level}\n` +
      `  *Type*: ${petInfo.type}\n` +
      `  *XP*: ${petInfo.xp}\n\n` +
      `> *Guild Info:*\n` +
      `  *Name*: ${guild.name}\n` +
      `  *ID*: ${guild.id}\n` +
      `  *Level*: ${guild.level}\n` +
      `  *Members*: ${guild.member}\n` +
      `  *Capacity*: ${guild.capacity}\n\n` +
      `> *Guild Leader Info:*\n` +
      `  *Created At*: ${ketuaGuild.create_time}\n` +
      `  *Last Login*: ${ketuaGuild.last_login}\n` +
      `  *BP Badge*: ${ketuaGuild.BP_bagdes}\n` +
      `  *BR Points*: ${ketuaGuild.BR_points}\n` +
      `  *CS Points*: ${ketuaGuild.CS_points}\n` +
      `  *Level*: ${ketuaGuild.level}\n` +
      `  *Like*: ${ketuaGuild.like}\n` +
      `  *Name*: ${ketuaGuild.name}\n` +
      `  *Equipped Title*: ${ketuaGuild.equipped_title}\n` +
      `  *ID*: ${ketuaGuild.id}\n` +
      `  *XP*: ${ketuaGuild.xp}`;
 
    // Mengirimkan hasil ke pengguna
    await conn.sendMessage(m.chat, { text: resultText, mentions: [m.sender] }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengambil data.\n> Error: ' + error.message);
  }
};
 
handler.command = ['ffstalk', 'stalkff', 'cekidff'];
handler.help = ['ffstalk <id>', 'stalkff <id>', 'cekidff <id>'];
handler.tags = ['tools', 'game'];
handler.limit = true;
 
export default handler;