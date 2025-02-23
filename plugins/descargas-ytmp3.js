import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const MP3_API = 'https://1018-2803-a3e0-133f-38e0-3137-1a3e-7a0d-996a.ngrok-free.app/download/mp3?url=';
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0]) return conn.reply(m.chat, '*`Por favor ingresa un enlace de YouTube válido.`*', m);

    await m.react('🕓');
    try {
        let url = args[0];
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return conn.reply(m.chat, '*`El enlace no es válido. Debe ser un enlace de YouTube.`*', m);
        }

        let response = await fetch(`${MP3_API}${encodeURIComponent(url)}`);
        let data = await response.json();

        if (!data.download_url) throw new Error('No se pudo obtener el audio.');

        let audioResponse = await fetch(data.download_url);
        let audioBuffer = await audioResponse.buffer();

        let filePath = path.join(process.cwd(), `${Date.now()}.mp3`);
        await writeFile(filePath, audioBuffer);

        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(filePath),
            mimetype: 'audio/mp4',
            fileName: `${data.title}.mp3`
        }, { quoted: m });

        await unlink(filePath);

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*`Error al descargar el audio.`*', m);
    }
};

handler.help = ['ytmp3 <url>'];
handler.tags = ['dl'];
handler.command = ['ytmp3'];

export default handler;
