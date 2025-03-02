import axios from 'axios';
import cheerio from 'cheerio';
import FormData from 'form-data';

async function ffStalk(id) {
    try {
        let formdata = new FormData();
        formdata.append('uid', id);

        let { data } = await axios.post('https://tools.freefireinfo.in/profileinfo.php?success=1', formdata, {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "origin": "https://tools.freefireinfo.in",
                "referer": "https://tools.freefireinfo.in/profileinfo.php?success=1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            }
        });

        const $ = cheerio.load(data);
        let tr = $('div.result').html()?.split('<br>') || [];

        if (tr.length < 10 || !tr[0]?.includes("Name: ")) {
            throw new Error("No se encontró información para este ID.");
        }

        return {
            name: tr[0]?.split('Name: ')[1] || "Desconocido",
            bio: tr[14]?.split(': ')[1] || "Sin bio",
            like: tr[2]?.split(': ')[1] || "0",
            level: tr[3]?.split(': ')[1] || "0",
            exp: tr[4]?.split(': ')[1] || "0",
            region: tr[5]?.split(': ')[1] || "Desconocido",
            honorScore: tr[6]?.split(': ')[1] || "0",
            brRank: tr[7]?.split(': ')[1] || "No rank",
            brRankPoint: tr[8]?.split(': ')[1] || "0",
            csRankPoint: tr[9]?.split(': ')[1] || "0",
            accountCreated: tr[10]?.split(': ')[1] || "Desconocido",
            lastLogin: tr[11]?.split(': ')[1] || "Desconocido",
            preferMode: tr[12]?.split(': ')[1] || "Desconocido",
            language: tr[13]?.split(': ')[1] || "Desconocido",
            booyahPassPremium: tr[16]?.split(': ')[1] || "No",
            booyahPassLevel: tr[17]?.split(': ')[1] || "0",
            pet: {
                name: tr[20]?.split(': ')[1] || "No tiene mascota",
                level: tr[21]?.split(': ')[1] || "0",
                exp: tr[22]?.split(': ')[1] || "0",
                starMarked: tr[23]?.split(': ')[1] || "No",
                selected: tr[24]?.split(': ')[1] || "No",
            },
            guild: (tr.length > 26 && tr[26]?.includes('Guild:')) ? tr[26].split('Guild: ')[1] : "Sin guild",
            equippedItems: $('.equipped-item').map((i, e) => ({
                name: $(e).find('p').text().trim(),
                img: $(e).find('img').attr('src')
            })).get()
        };
    } catch (error) {
        console.error("❌ Error en ffStalk:", error.message);
        return null;
    }
}

export const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Ingresa un ID de Free Fire.');
    
    m.reply('🔎 Buscando información...');

    let result = await ffStalk(text);
    if (!result) return m.reply('❌ No se pudo obtener información. Verifica el ID ingresado.');

    let equippedItemsText = result.equippedItems.length
        ? result.equippedItems.map(item => `• ${item.name}`).join('\n')
        : 'No tiene objetos equipados';

    let caption = `
*🎮 FREE FIRE STALK*

👤 *Perfil*
• *Nombre:* ${result.name}
• *Bio:* ${result.bio}
• *Likes:* ${result.like}
• *Nivel:* ${result.level}
• *Exp:* ${result.exp}
• *Región:* ${result.region}
• *Honor Score:* ${result.honorScore}

🏆 *Clasificaciones*
• *BR Rank:* ${result.brRank} (${result.brRankPoint})
• *CS Rank:* ${result.csRankPoint}

📆 *Actividad*
• *Creación:* ${result.accountCreated}
• *Último login:* ${result.lastLogin}
• *Modo favorito:* ${result.preferMode}
• *Idioma:* ${result.language}

🎖️ *Booyah Pass*
• *Premium:* ${result.booyahPassPremium}
• *Nivel:* ${result.booyahPassLevel}

🐾 *Mascota*
• *Nombre:* ${result.pet.name}
• *Nivel:* ${result.pet.level}
• *EXP:* ${result.pet.exp}
• *Star Marked:* ${result.pet.starMarked}
• *Seleccionada:* ${result.pet.selected}

🎽 *Guild:* ${result.guild}

🎮 *Objetos Equipados*
${equippedItemsText}
`.trim();

    conn.sendMessage(m.chat, { text: caption }, { quoted: m });
};

handler.command = ["ffstalk"];

export default handler;