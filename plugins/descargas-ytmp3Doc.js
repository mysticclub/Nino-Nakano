
import ws from 'ws';
import translate from 'translate-google-api';

let handler = async (m, { conn, text }) => {
    class BlueArchive {
        voice = async function voice(texto, modelo = "Airi", velocidad = 1.2) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!texto || texto.length >= 500)
                        throw new Error("¡Asegúrate de ingresar un texto válido que no exceda los 500 caracteres!");
                    if (velocidad && (velocidad < 0.1 || velocidad > 2))
                        velocidad = 2;
                    modelo = "JP_" + modelo;
                    const base_url = "https://ori-muchim-bluearchivetts.hf.space/";
                    const session_hash = this.generarSesion();
                    const socket = new ws("wss://ori-muchim-bluearchivetts.hf.space/queue/join");
                    socket.on("message", (data) => {
                        const d = JSON.parse(data.toString("utf8"));
                        switch (d.msg) {
                            case "send_hash": {
                                socket.send(JSON.stringify({
                                    fn_index: 0,
                                    session_hash,
                                }));
                                break;
                            }
                            case "send_data": {
                                socket.send(JSON.stringify({
                                    fn_index: 0,
                                    session_hash,
                                    data: [texto, modelo, velocidad],
                                }));
                                break;
                            }
                            case "estimation":
                            case "process_starts": {
                                break;
                            }
                            case "process_completed": {
                                const o = d.output;
                                const nombre = o.data[1]?.name;
                                socket.close();
                                return resolve({
                                    texto,
                                    modelo: modelo,
                                    velocidad,
                                    resultado: {
                                        duracion: +o.duration.toFixed(2),
                                        ruta: nombre,
                                        url: base_url + "file=" + nombre,
                                    },
                                });
                            }
                            default: {
                                console.log(`Mensaje inesperado: ${data.toString("utf8")}`);
                                break;
                            }
                        }
                    });
                } catch (e) {
                    return reject(`Error en el proceso de voz: ${e.message}`);
                }
            });
        }
        generarSesion = function generarSesion() {
            return Math.random().toString(36).substring(2);
        }
    }

    try {
        let [texto, personaje, velocidad] = text.split('|');
        if (!texto || !personaje) return m.reply('> Ejemplo: .ttsba hola cómo estás|momoi');
        const vocesSoportadas = ['airi', 'akane', 'akari', 'ako', 'aris', 'arona', 'aru', 'asuna', 'atsuko', 'ayane', 'azusa', 'cherino', 'chihiro', 'chinatsu', 'chise', 'eimi', 'erica', 'fubuki', 'fuuka', 'hanae', 'hanako', 'hare', 'haruka', 'haruna', 'hasumi', 'hibiki', 'hihumi', 'himari', 'hina', 'hinata', 'hiyori', 'hoshino', 'iori', 'iroha', 'izumi', 'izuna', 'juri', 'kaede', 'karin', 'kayoko', 'kazusa', 'kirino', 'koharu', 'kokona', 'kotama', 'kotori', 'main', 'maki', 'mari', 'marina', 'mashiro', 'michiru', 'midori', 'miku', 'mimori', 'misaki', 'miyako', 'miyu', 'moe', 'momoi', 'momoka', 'mutsuki', 'NP0013', 'natsu', 'neru', 'noa', 'nodoka', 'nonomi', 'pina', 'rin', 'saki', 'saori', 'saya', 'sena', 'serika', 'serina', 'shigure', 'shimiko', 'shiroko', 'shizuko', 'shun', 'ShunBaby', 'sora', 'sumire', 'suzumi', 'tomoe', 'tsubaki', 'tsurugi', 'ui', 'utaha', 'wakamo', 'yoshimi', 'yuuka', 'yuzu', 'zunko'];
        if (!vocesSoportadas.includes(personaje.toLowerCase())) {
            const listaVoces = vocesSoportadas.map(nombre => `> - ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`).join('\n');
            m.reply(
`*¡Personaje no encontrado!*
Lista de personajes soportados:
${listaVoces}`
            );
            return;
        }
        m.reply("Espera un momento...");
        const blueArchive = new BlueArchive();
        
        // Traducir el texto al japonés antes de enviarlo al servicio
        const textoTraducido = await translate(texto, { to: 'ja', autoCorrect: false });

        const personajeFormateado = personaje.toLowerCase().split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1));
        const resultado = await blueArchive.voice(textoTraducido[0], personajeFormateado, velocidad || 1);
        conn.sendMessage(m.chat, { audio: { url: resultado.resultado.url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
    } catch (err) {
        console.error(err);
        m.reply('> Oh no, ocurrió un error...');
    }
};

handler.help = ['ttsba'];
handler.tags = ['audio'];
handler.command = /^(ttsba)$/i;
handler.limit = true;
handler.register = true;

export default handler;