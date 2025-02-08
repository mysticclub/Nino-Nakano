const partidas = {}; // Objeto para almacenar las partidas activas y sus jugadores

const handler = async (m, { conn, args, command }) => {
    if (command === 'anotar') {
        const partidaId = args[0];

        if (!partidas[partidaId]) {
            conn.reply(m.chat, "No hay una partida activa en este momento.", m);
            return;
        }

        const nombreJugador = `@${m.sender.split("@")[0]}`;

        if (partidas[partidaId].jugadores.includes(nombreJugador) || partidas[partidaId].suplentes.includes(nombreJugador)) {
            conn.reply(m.chat, "¡Ya estás anotado en esta partida!", m);
            return;
        }

        if (partidas[partidaId].jugadores.length < 4) {
            partidas[partidaId].jugadores.push(nombreJugador);
        } else if (partidas[partidaId].suplentes.length < 2) {
            partidas[partidaId].suplentes.push(nombreJugador);
        } else {
            conn.reply(m.chat, "¡La escuadra y suplentes ya están llenos!", m);
            return;
        }

        const generarMensaje = () => {
            const escuadra = partidas[partidaId].jugadores.map(jugador => `🥷🏻 ➤ ${jugador}`).join("\n") || "🥷🏻 ➤ \n🥷🏻 ➤ \n🥷🏻 ➤ \n🥷🏻 ➤ ";
            const suplentes = partidas[partidaId].suplentes.map(jugador => `🥷🏻 ➤ ${jugador}`).join("\n") || "🥷🏻 ➤ \n🥷🏻 ➤ ";

            return `
*4 VERSUS 4*

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔
${escuadra}

𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦
${suplentes}
        `.trim();
        };

        const mensaje = generarMensaje();

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
        conn.reply(m.chat, 'Debes proporcionar esto.\n*.4vs4 <región> <hora> <Bandera> <modalidad>*\n\n*Regiones*\nSR (sudamerica)\nEU (ee.uu)\n\n*Ejemplo:*\n.4vs4 SR 22:00 🇦🇷 infinito\n.4vs4 SR 22:00 🇦🇷 vivido\n.4vs4 EU 20:00 🇲🇽 infinito\n.4vs4 EU 20:00 🇲🇽 vivido', m);
        return;
    }

    const modalidad = args[3].toLowerCase();
    if (modalidad !== 'infinito' && modalidad !== 'vivido') {
        conn.reply(m.chat, '𝘔𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥 𝘯𝘰 𝘷𝘢𝘭𝘪𝘥𝘢. 𝘌𝘴𝘤𝘳𝘪𝘣𝘦 "𝘪𝘯𝘧𝘪𝘯𝘪𝘵𝘰" 𝘰 "𝘷𝘪́𝘷𝘪𝘥𝘰".', m);
        return;
    }

    const partidaId = `${m.chat}-${args[0]}-${args[1]}`; // ID único por chat, región y hora

    if (!partidas[partidaId]) {
        partidas[partidaId] = {
            jugadores: [],
            suplentes: []
        };
    }

    const generarMensaje = () => {
        const escuadra = partidas[partidaId].jugadores.map(jugador => `🥷🏻 ➤ ${jugador}`).join("\n") || "🥷🏻 ➤ \n🥷🏻 ➤ \n🥷🏻 ➤ \n🥷🏻 ➤ ";
        const suplentes = partidas[partidaId].suplentes.map(jugador => `🥷🏻 ➤ ${jugador}`).join("\n") || "🥷🏻 ➤ \n🥷🏻 ➤ ";

        return `
*4 VERSUS 4 ${modalidad.toUpperCase()}*

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔
${escuadra}

𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦
${suplentes}

Presiona el botón para anotarte.
        `.trim();
    };

    const mensaje = generarMensaje();

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

handler.command = /^(4vs4|vs4|anotar)$/i;
export default handler;