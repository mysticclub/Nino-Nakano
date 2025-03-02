import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('⚠️ Ingresa un ID de Free Fire.');

    m.reply('🔍 Buscando información...');

    try {
        const apiUrl = `https://dark-core-api.vercel.app/api/search/player?key=api&id=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const result = await res.json();

        if (!result.name) {
            return m.reply('❌ No se pudo obtener información. Verifica el ID ingresado.');
        }

        let caption = `
*「 FREE FIRE STALK 」*

*👤 Perfil*
• Nombre: ${result.name}
• Biografía: ${result.bio || 'No tiene'}
• Me gusta: ${result.like}
• Nivel: ${result.level}
• EXP: ${result.exp}
• Región: ${result.region}
• Honor Score: ${result.honorScore}
• BR Rank: ${result.brRank} (${result.brRankPoint} puntos)
• CS Rank: ${result.csRankPoint} puntos
• Creación de cuenta: ${result.accountCreated}
• Última conexión: ${result.lastLogin}
• Modo preferido: ${result.preferMode}
• Idioma: ${result.language}

*🎖️ Booyah Pass*
• Nivel: ${result.booyahPassLevel}

*🐾 Mascota*
• Nombre: ${result.petInformation.name}
• Nivel: ${result.petInformation.level}
• EXP: ${result.petInformation.exp}
• Estrellas: ${result.petInformation.starMarked}
• Seleccionada: ${result.petInformation.selected}
`.trim();

        await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
    } catch (error) {
        console.error(error);
        m.reply('❌ Error al obtener la información. Inténtalo más tarde.');
    }
};

handler.command = ['ffstalk'];
export default handler;