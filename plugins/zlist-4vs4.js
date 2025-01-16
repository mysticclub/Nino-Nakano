const handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        conn.reply(m.chat, '𝘋𝘦𝘣𝘦𝘴 𝘱𝘳𝘰𝘱𝘰𝘳𝘤𝘪𝘰𝘯𝘢𝘳 𝘭𝘢 𝘩𝘰𝘳𝘢 (𝘏𝘏:𝘔𝘔) 𝘺 𝘦𝘭 𝘱𝘢𝘪́𝘴 (𝘉𝘖, 𝘗𝘌, 𝘊𝘓, 𝘈𝘙).', m);
        return;
    }

    const horaUsuario = args[0];
    const paisBase = args[1].toUpperCase();

    const zonasHorarias = {
        BO: 'America/La_Paz',  // Bolivia
        PE: 'America/Lima',    // Perú
        CL: 'America/Santiago',// Chile
        AR: 'America/Argentina/Buenos_Aires' // Argentina
    };

    if (!(paisBase in zonasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa BO para Bolivia, PE para Perú, CL para Chile o AR para Argentina.', m);
        return;
    }

    // Validar formato de hora
    const [horas, minutos] = horaUsuario.split(':').map(num => parseInt(num, 10));
    if (isNaN(horas) || isNaN(minutos) || horas < 0 || horas > 23 || minutos < 0 || minutos > 59) {
        conn.reply(m.chat, 'Hora inválida. Debe estar en formato HH:MM.', m);
        return;
    }

    // Crear una fecha base con la hora proporcionada en la zona horaria del país base
    const fechaBase = new Date();
    fechaBase.setUTCHours(horas - (new Date().getTimezoneOffset() / 60), minutos, 0, 0);

    // Convertir la hora base a cada zona horaria
    const horasEnPais = {};
    for (let pais in zonasHorarias) {
        const horaConvertida = new Intl.DateTimeFormat('es-ES', {
            timeZone: zonasHorarias[pais],
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        }).format(fechaBase);
        horasEnPais[pais] = horaConvertida;
    }

    // Crear el mensaje con las horas en cada país
    const message = `
*4 𝐕𝐄𝐑𝐒𝐔𝐒 4*

${Object.keys(horasEnPais).map((pais) => {
    const bandera = {
        BO: '🇧🇴',
        PE: '🇵🇪',
        CL: '🇨🇱',
        AR: '🇦🇷'
    }[pais];
    return `${bandera} ${pais} : ${horasEnPais[pais]}`;
}).join('\n')}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 


ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ 
🥷🏻 ┇
`.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['4vs4'];
handler.tags = ['freefire'];
handler.command = /^(4vs4|vs4)$/i;
export default handler;