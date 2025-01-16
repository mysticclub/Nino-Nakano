const handler = async (m, { conn, args }) => {
    if (args.length < 4) {
        conn.reply(m.chat, '𝘋𝘦𝘣𝘦𝘴 𝘱𝘳𝘰𝘱𝘰𝘳𝘤𝘪𝘰𝘯𝘢𝘳 𝘭𝘢 𝘳𝘦𝘨𝘪𝘰𝘯 (SR o EU), 𝘭𝘢 𝘩𝘰𝘳𝘢 (𝘏𝘏:𝘔𝘔), 𝘦𝘭 𝘱𝘢𝘪́𝘴 (𝘉𝘖, 𝘗𝘌, 𝘊𝘓, 𝘈𝘙, 𝘊𝘖, 𝘔𝘟) 𝘺 𝘭𝘢 𝘮𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥 (𝘪𝘯𝘧𝘪𝘯𝘪𝘵𝘰 𝘰 𝘷𝘪́𝘷𝘪𝘥𝘰).', m);
        return;
    }

    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[1])) {
        conn.reply(m.chat, '𝘍𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 𝘩𝘰𝘳𝘢 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘰. 𝘋𝘦𝘣𝘦 𝘴𝘦𝘳 𝘏𝘏:𝘔𝘔 𝘦𝘯 𝘧𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 24 𝘩𝘰𝘳𝘢𝘴.', m);
        return;
    }

    const modalidad = args[3].toLowerCase();
    if (modalidad !== 'infinito' && modalidad !== 'vivido') {
        conn.reply(m.chat, '𝘔𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥 𝘯𝘰 𝘷𝘢𝘭𝘪𝘥𝘢. 𝘌𝘴𝘤𝘳𝘪𝘣𝘦 "𝘪𝘯𝘧𝘪𝘯𝘪𝘵𝘰" 𝘰 "𝘷𝘪́𝘷𝘪𝘥𝘰".', m);
        return;
    }

    const horaUsuario = args[1];
    let paisBase = args[2].toUpperCase();

    const banderasToPais = {
        '🇧🇴': 'BO',
        '🇵🇪': 'PE',
        '🇨🇱': 'CL',
        '🇦🇷': 'AR',
        '🇨🇴': 'CO',
        '🇲🇽': 'MX'
    };

    if (banderasToPais[paisBase]) {
        paisBase = banderasToPais[paisBase];
    }

    const region = args[0].toUpperCase();
    if (region !== 'SR' && region !== 'EU') {
        conn.reply(m.chat, '𝘓𝘢 𝘳𝘦𝘨𝘪𝘰𝘯 𝘦𝘯 𝘳𝘦𝘤𝘪𝘣𝘰 𝘯𝘰 𝘦𝘴 𝘷𝘢𝘭𝘪𝘥𝘢. 𝘜𝘴𝘢 𝘚𝘙 𝘰 𝘌𝘜.', m);
        return;
    }

    const diferenciasHorariasSR = {
        BO: 0,
        PE: -1,
        CL: 1,
        AR: 1,
    };

    const diferenciasHorariasEU = {
        CO: -1,
        MX: -2
    };

    const diferenciasHorarias = region === 'SR' ? diferenciasHorariasSR : diferenciasHorariasEU;

    if (!(paisBase in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa BO para Bolivia, PE para Perú, CL para Chile, AR para Argentina, CO para Colombia o MX para México.', m);
        return;
    }

    const diferenciaBase = diferenciasHorarias[paisBase];

    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);

    const horaBase = new Date();
    horaBase.setHours(hora - diferenciaBase);
    horaBase.setMinutes(minutos);
    horaBase.setSeconds(0);
    horaBase.setMilliseconds(0);

    const horasEnPais = [];
    for (let i = 0; i < 4; i++) {
        const horaActual = new Date(horaBase.getTime());
        horaActual.setHours(horaBase.getHours() + i);

        const horasAjustadas = Object.keys(diferenciasHorarias).map(pais => {
            const diferencia = diferenciasHorarias[pais];
            const horaEnPais = new Date(horaActual.getTime() + (3600000 * diferencia));
            return { pais, hora: horaEnPais };
        });

        horasEnPais.push(horasAjustadas);
    }

    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const message = `
*4 VERSUS 4 ${modalidad.toUpperCase()}*

${horasEnPais[0].map(({ pais, hora }) => {
        const bandera = {
            BO: '🇧🇴',
            PE: '🇵🇪',
            CL: '🇨🇱',
            AR: '🇦🇷',
            CO: '🇨🇴',
            MX: '🇲🇽'
        }[pais];
        return `${bandera} ${pais} : ${formatTime(hora)}`;
    }).join('\n')}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

🥷🏻 ➤ 
🥷🏻 ➤ 
🥷🏻 ➤ 
🥷🏻 ➤ 

𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦 
🥷🏻 ➤ 
🥷🏻 ➤ 
`.trim();

    await m.react('✅')
    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['4vs4'];
handler.tags = ['freefire'];
handler.command = /^(4vs4|vs4)$/i;
export default handler;





/* const handler = async (m, { conn, args }) => {

    if (args.length < 3) {
        conn.reply(m.chat, '𝘋𝘦𝘣𝘦𝘴 𝘱𝘳𝘰𝘱𝘰𝘳𝘤𝘪𝘰𝘯𝘢𝘳 𝘭𝘢 𝘳𝘦𝘨𝘪𝘰𝘯 (SR o EU), 𝘭𝘢 𝘩𝘰𝘳𝘢 (𝘏𝘏:𝘔𝘔) 𝘺 𝘦𝘭 𝘱𝘢𝘪́𝘴 (𝘉𝘖, 𝘗𝘌, 𝘊𝘓, 𝘈𝘙, 𝘊𝘖, 𝘔𝘟).', m);
        return;
    }

    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[1])) {
        conn.reply(m.chat, '𝘍𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 𝘩𝘰𝘳𝘢 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘰. 𝘋𝘦𝘣𝘦 𝘴𝘦𝘳 𝘏𝘏:𝘔𝘔 𝘦𝘯 𝘧𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 24 𝘩𝘰𝘳𝘢𝘴.', m);
        return;
    }

    const horaUsuario = args[1];
    let paisBase = args[2].toUpperCase();

    const banderasToPais = {
        '🇧🇴': 'BO',
        '🇵🇪': 'PE',
        '🇨🇱': 'CL',
        '🇦🇷': 'AR',
        '🇨🇴': 'CO',
        '🇲🇽': 'MX'
    };

    if (banderasToPais[paisBase]) {
        paisBase = banderasToPais[paisBase];
    }

    const region = args[0].toUpperCase();
    if (region !== 'SR' && region !== 'EU') {
        conn.reply(m.chat, '𝘓𝘢 𝘳𝘦𝘨𝘪𝘰𝘯 𝘦𝘯 𝘳𝘦𝘤𝘪𝘣𝘰 𝘯𝘰 𝘦𝘴 𝘷𝘢𝘭𝘪𝘥𝘢. 𝘜𝘴𝘢 𝘚𝘙 𝘰 𝘌𝘜.', m);
        return;
    }

    const diferenciasHorariasSR = {
        BO: 0,
        PE: -1,
        CL: 1,
        AR: 1,
    };

    const diferenciasHorariasEU = {
        CO: -1,
        MX: -2
    };

    const diferenciasHorarias = region === 'SR' ? diferenciasHorariasSR : diferenciasHorariasEU;

    if (!(paisBase in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa BO para Bolivia, PE para Perú, CL para Chile, AR para Argentina, CO para Colombia o MX para México.', m);
        return;
    }

    const diferenciaBase = diferenciasHorarias[paisBase];

    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);

    const horaBase = new Date();
    horaBase.setHours(hora - diferenciaBase);
    horaBase.setMinutes(minutos);
    horaBase.setSeconds(0);
    horaBase.setMilliseconds(0);

    const horasEnPais = [];
    for (let i = 0; i < 4; i++) {
        const horaActual = new Date(horaBase.getTime());
        horaActual.setHours(horaBase.getHours() + i);

        const horasAjustadas = Object.keys(diferenciasHorarias).map(pais => {
            const diferencia = diferenciasHorarias[pais];
            const horaEnPais = new Date(horaActual.getTime() + (3600000 * diferencia));
            return { pais, hora: horaEnPais };
        });

        horasEnPais.push(horasAjustadas);
    }

    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const message = `
𝟰 𝗩𝗘𝗥𝗦𝗨𝗦 𝟰

${horasEnPais[0].map(({ pais, hora }) => {
        const bandera = {
            BO: '🇧🇴',
            PE: '🇵🇪',
            CL: '🇨🇱',
            AR: '🇦🇷',
            CO: '🇨🇴',
            MX: '🇲🇽'
        }[pais];
        return `${bandera} ${pais} : ${formatTime(hora)}`;
    }).join('\n')}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

🥷🏻 ➤ 
🥷🏻 ➤ 
🥷🏻 ➤ 
🥷🏻 ➤ 

𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦 
🥷🏻 ➤ 
🥷🏻 ➤ 
`.trim();

    await m.react('✅')
    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(4vs4|vs4)$/i;
export default handler; */