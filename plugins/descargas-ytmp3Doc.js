import fetch from 'node-fetch';
import cheerio from 'cheerio';
import FormData from 'form-data';

async function ffStalk(id) {
    let formdata = new FormData();
    formdata.append('uid', id);
    
    let res = await fetch('https://tools.freefireinfo.in/profileinfo.php?success=1', {
        method: 'POST',
        body: formdata,
        headers: {
            "origin": "https://tools.freefireinfo.in",
            "referer": "https://tools.freefireinfo.in/profileinfo.php?success=1",
            "user-agent": "Mozilla/5.0",
        }
    });

    let data = await res.text();
    const $ = cheerio.load(data);
    
    let tr = $('div.result').html().split('<br>');
    if (!tr[0].includes("Name: ")) throw new Error("ID no encontrado o incorrecto.");

    return {
        name: tr[0].split('Name: ')[1],
        bio: tr[14].split(': ')[1],
        like: tr[2].split(': ')[1],
        level: tr[3].split(': ')[1],
        exp: tr[4].split(': ')[1],
        region: tr[5].split(': ')[1],
        honorScore: tr[6].split(': ')[1],
        brRank: tr[7].split(': ')[1],
        brRankPoint: tr[8].split(': ')[1],
        csRankPoint: tr[9].split(': ')[1],
        accountCreated: tr[10].split(': ')[1],
        lastLogin: tr[11].split(': ')[1],
        preferMode: tr[12].split(': ')[1],
        language: tr[13].split(': ')[1],
        booyahPassPremium: tr[16].split(': ')[1],
        booyahPassLevel: tr[17].split(': ')[1],
        petInformation: {
            name: tr[20]?.split(': ')[1] || 'No tiene mascota',
            level: tr[21]?.split(': ')[1] || 'No tiene mascota',
            exp: tr[22]?.split(': ')[1] || 'No tiene mascota',
        },
        guild: tr[26]?.includes('Guild:') ? tr[26].split('Guild: ')[1] : 'Sin guild',
        equippedItems: $('.equipped-items .equipped-item').map((i, e) => ({
            name: $(e).find('p').text().trim(),
            img: $(e).find('img').attr('src')
        })).get()
    };
}

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('✧ Ingresa el ID de Free Fire.');
    
    await m.reply('⏳ Buscando información...');
    
    try {
        const result = await ffStalk(args[0]);

        let equippedItemsText = result.equippedItems.length
            ? result.equippedItems.map(item => `• ${item.name}`).join('\n')
            : 'No hay objetos equipados';

        let caption = `
*「 🏆 FREE FIRE STALK 」*

*👤 Perfil:*
• 🎮 Nombre: ${result.name}
• 💬 Bio: ${result.bio}
• ❤️ Me Gusta: ${result.like}
• 🔥 Nivel: ${result.level}
• ⭐ EXP: ${result.exp}
• 🌍 Región: ${result.region}
• 🏅 Honor Score: ${result.honorScore}
• 🏆 BR Rank: ${result.brRank} (${result.brRankPoint} puntos)
• 🎖️ CS Rank: ${result.csRankPoint} puntos
• 📅 Creado: ${result.accountCreated}
• ⏳ Última conexión: ${result.lastLogin}
• 🎮 Modo favorito: ${result.preferMode}
• 🌐 Idioma: ${result.language}

*🎖️ Booyah Pass:*
• 🔹 Premium: ${result.booyahPassPremium}
• 📊 Nivel: ${result.booyahPassLevel}

*🐾 Mascota:*
• 🐶 Nombre: ${result.petInformation.name}
• 🎚️ Nivel: ${result.petInformation.level}
• ✨ EXP: ${result.petInformation.exp}

*🏰 Guild:*
• 🔰 ${result.guild}

*🎮 Objetos equipados:*
${equippedItemsText}
`.trim();

        await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender] }, { quoted: m });
    } catch (error) {
        console.error(error);
        await m.reply('❌ No se pudo obtener información. Verifica el ID ingresado.');
    }
};

handler.help = ['ffstalk <ID>'];
handler.tags = ['freefire'];
handler.command = /^ffstalk$/i;

export default handler;