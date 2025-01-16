const handler = async (m, { conn, args }) => {

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
        '🇨🇴': 'CO', // Colombia
        '🇲🇽': 'MX'  // México
    };

    if (banderasToPais[paisBase]) {
        paisBase = banderasToPais[paisBase];
    }

    // Verificar la región
    const region = args[0].toUpperCase(); // SR o EU
    if (region !== 'SR' && region !== 'EU') {
        conn.reply(m.chat, '𝘓𝘢 𝘳𝘦𝘨𝘪𝘰𝘯 𝘦𝘯 𝘳𝘦𝘤𝘪𝘣𝘰 𝘯𝘰 𝘦𝘴 𝘷𝘢𝘭𝘪𝘥𝘢. 𝘜𝘴𝘢 𝘚𝘙 𝘰 𝘌𝘜.', m);
        return;
    }

    // Diferencias horarias para SR (Sudamérica) - Bolivia, Perú, Chile, Argentina
    const diferenciasHorariasSR = {
        BO: 0, // Bolivia
        PE: -1, // Perú 
        CL: 1,  // Chile
        AR: 1,  // Argentina
    };

    // Diferencias horarias para EU (Europa) - Colombia y México
    const diferenciasHorariasEU = {
        CO: -1, // Colombia
        MX: -2  // México
    };

    // Usar las diferencias horarias correctas según la región
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
*4 𝐕𝐄𝐑𝐒𝐔𝐒 4*

${horasEnPais[0].map(({ pais, hora }) => {
        const bandera = {
            BO: '🇧🇴',
            PE: '🇵🇪',
            CL: '🇨🇱',
            AR: '🇦🇷',
            CO: '🇨🇴', // Colombia
            MX: '🇲🇽'  // México
        }[pais];
        return `${bandera} ${pais} : ${formatTime(hora)}`;
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

    // Enviar el mensaje con la lista correspondiente a la región seleccionada
    await m.react('✅')
    conn.sendMessage(m.chat, { text: message }, { quoted: m });

    // Solo si la región es EU, enviar la lista con los horarios para México y Colombia
    if (region === 'EU') {
        const horaMexico = new Date(horaBase.getTime() + (3600000 * 2)); // Horario base para México
        const horasAjustadasMexico = Object.keys(diferenciasHorariasEU).map(pais => {
            const diferencia = diferenciasHorariasEU[pais];
            const horaEnPais = new Date(horaMexico.getTime() + (3600000 * diferencia));
            return { pais, hora: horaEnPais };
        });

        const messageEU = `
*4 𝐕𝐄𝐑𝐒𝐔𝐒 4 (EU)*

${horasAjustadasMexico.map(({ pais, hora }) => {
            const bandera = {
                CO: '🇨🇴',
                MX: '🇲🇽'
            }[pais]; // Asignar correctamente las banderas
            return `${bandera} ${pais} : ${formatTime(hora)}`;
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

        conn.sendMessage(m.chat, { text: messageEU }, { quoted: m });
    }
};

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(4vs4|vs4)$/i;
export default handler;