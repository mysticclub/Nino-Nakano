const partidas = {}; // Almacena las partidas activas y sus jugadores

const handler = async (m, { conn, args, command }) => {
    if (command === 'anotar') {
        const partidaId = args[0];

        if (!partidas[partidaId]) {
            conn.reply(m.chat, "No hay una partida activa en este momento.", m);
            return;
        }

        const nombreJugador = `@${m.sender.split("@")[0]}`;

        // Verifica si el jugador ya está anotado
        if (partidas[partidaId].jugadores.includes(nombreJugador) || partidas[partidaId].suplentes.includes(nombreJugador)) {
            conn.reply(m.chat, "¡Ya estás anotado en esta partida!", m);

            // Envía la lista actualizada
            const mensaje = generarMensaje(partidas[partidaId]);
            conn.sendMessage(m.chat, {
                text: mensaje,
                footer: "¡Anótate para el 4vs4!",
                buttons: [
                    {
                        buttonId: `.anotar ${partidaId}`,
                        buttonText: { displayText: "📌 Anotar" }
                    }
                ],
                viewOnce: true,
                headerType: 1,
            }, { quoted: m });

            return;
        }

        // Si aún no está anotado, se añade al jugador
        if (partidas[partidaId].jugadores.length < 4) {
            partidas[partidaId].jugadores.push(nombreJugador);
        } else if (partidas[partidaId].suplentes.length < 2) {
            partidas[partidaId].suplentes.push(nombreJugador);
        } else {
            conn.reply(m.chat, "¡La escuadra y suplentes ya están llenos!", m);
            return;
        }

        // Envia el mensaje con la lista actualizada
        const mensaje = generarMensaje(partidas[partidaId]);

        conn.sendMessage(m.chat, {
            text: mensaje,
            footer: "¡Anótate para el 4vs4!",
            buttons: [
                {
                    buttonId: `.anotar ${partidaId}`,
                    buttonText: { displayText: "📌 Anotar" }
                }
            ],
            viewOnce: true,
            headerType: 1,
        }, { quoted: m });

        return;
    }

    if (args.length < 4) {
        conn.reply(m.chat, 'Debes proporcionar esto.\n*.4vs4 <región> <hora> <Bandera> <modalidad>*\n\n*Regiones*\nSR (Sudamérica)\nEU (Estados Unidos)\n\n*Ejemplo:*\n.4vs4 SR 22:00 🇦🇷 infinito\n.4vs4 SR 22:00 🇦🇷 vivido\n.4vs4 EU 20:00 🇲🇽 infinito\n.4vs4 EU 20:00 🇲🇽 vivido', m);
        return;
    }

    const modalidad = args[3].toLowerCase();
    if (modalidad !== 'infinito' && modalidad !== 'vivido') {
        conn.reply(m.chat, '𝘔𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥 𝘯𝘰 𝘷𝘢́𝘭𝘪𝘥𝘢. 𝘌𝘴𝘤𝘳𝘪𝘣𝘦 "𝘪𝘯𝘧𝘪𝘯𝘪𝘵𝘰" 𝘰 "𝘷𝘪́𝘷𝘪𝘥𝘰".', m);
        return;
    }

    const region = args[0].toUpperCase();
    if (region !== 'SR' && region !== 'EU') {
        conn.reply(m.chat, '𝘓𝘢 𝘳𝘦𝘨𝘪𝘰́𝘯 𝘯𝘰 𝘦𝘴 𝘷𝘢́𝘭𝘪𝘥𝘢. 𝘜𝘴𝘢 𝘚𝘙 𝘰 𝘌𝘜.', m);
        return;
    }

    const partidaId = `${m.chat}-${args[0]}-${args[1]}`; // ID único por chat, región y hora

    const horariosSR = {
        BO: "21:00",
        PE: "20:00",
        AR: "22:00"
    };

    const horariosEU = {
        CO: "21:00",
        MX: "20:00"
    };

    const horarios = region === 'SR' ? horariosSR : horariosEU;

    if (!partidas[partidaId]) {
        partidas[partidaId] = {
            jugadores: [],
            suplentes: [],
            hora: args[1],
            modalidad: modalidad.toUpperCase(),
            reglas: modalidad === 'infinito' ? '.reglasinf' : '.reglasvv2',
            horarios: horarios
        };
    }

    const mensaje = generarMensaje(partidas[partidaId]);

    conn.sendMessage(m.chat, {
        text: mensaje,
        footer: "¡Anótate para el 4vs4!",
        buttons: [
            {
                buttonId: `.anotar ${partidaId}`,
                buttonText: { displayText: "📌 Anotar" }
            }
        ],
        viewOnce: true,
        headerType: 1,
    }, { quoted: m });
};

function generarMensaje(partida) {
    const horarios = Object.entries(partida.horarios)
        .map(([pais, hora]) => {
            const bandera = {
                BO: "🇧🇴",
                PE: "🇵🇪",
                AR: "🇦🇷",
                CO: "🇨🇴",
                MX: "🇲🇽"
            }[pais];
            return `*${bandera} ${pais} :* ${hora}`;
        })
        .join("\n");

    const escuadra = [
        `🥷 ${partida.jugadores[0] || ""}`,
        `🥷 ${partida.jugadores[1] || ""}`,
        `🥷 ${partida.jugadores[2] || ""}`,
        `🥷 ${partida.jugadores[3] || ""}`
    ].join("\n");

    const suplentes = [
        `🥷 ${partida.suplentes[0] || ""}`,
        `🥷 ${partida.suplentes[1] || ""}`
    ].join("\n");

    return `
*4 VERSUS 4 ${partida.modalidad}*

${horarios}
*REGLAS:* ${partida.reglas}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔
${escuadra}

𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦
${suplentes}
`.trim();
}

handler.command = /^(4vs4|vs4|anotar)$/i;
export default handler;