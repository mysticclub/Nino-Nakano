/*⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- DarkCore >> https://github.com/Manuel12yt
-
El codigo de este archivo fue parchado por:
- DarkCore >> https://github.com/Manuel12yt
-
Contenido adaptado por:
- DarkCore >> https://github.com/Manuel12yt
- Izumi-kzx >> https://github.com/Izumi-kzx
*/

/*import axios from 'axios';
import { franc } from 'franc-min';

let handler = m => m;

handler.all = async function (m, { conn }) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (!chat || !chat.autoresponder || !user?.registered) return !0;

    if (
        !m.text || 
        m?.message?.delete || 
        m.type === 'audio' || 
        m.type === 'video' || 
        /audio/i.test(m.text) || 
        /video/i.test(m.text) || 
        /voz/i.test(m.text) || 
        /clip/i.test(m.text) || 
        /film/i.test(m.text)
    ) {
        return; 
    }

    const prefixes = ['!', '.', '?', '/', '#', '*', '+', '-', '$', '&', '%', '@', '~'];
    const hasPrefix = prefixes.some(prefix => m.text.startsWith(prefix));
    if (hasPrefix) {
        return;
    }

    const sensitiveKeywords = ["manuel", "Manuel", "Manu", "DarkCore", "Dark", "dark", "DARKCORE", "DARK"];
    const profanities = [
        "perra", "hijo de puta", "puta", "mierda", "imbécil", "idiota", "estúpido", 
        "maldita", "cabrona", "pendejo", "pendeja", "cabrón", "zorra", "bastardo", 
        "maldito", "coño", "gilipollas", "tonto", "tarado", "infeliz", "mamón", 
        "chingada", "culero", "cagada", "estúpida", "imbéciles", "jodido", 
        "jodida", "pedorro", "pedorra", "asqueroso", "asquerosa", "naco", "naca", 
        "menso", "mensos", "baboso", "babosa", "patético", "patética"
    ];

    const containsSensitiveKeyword = sensitiveKeywords.some(keyword => m.text.includes(keyword));
    const containsProfanity = profanities.some(profanity => m.text.toLowerCase().includes(profanity));

    if (containsProfanity) {
        const exploitResponse = `¡Cálmate un poco! 🤬 ¿Quién te crees para hablarme así? Recuerda que soy Genesis, una Ai con estilo, y no tengo tiempo para tus insultos. 😎`.trim();
        await this.reply(m.chat, exploitResponse, m);
        return true;
    }

    if (containsSensitiveKeyword) {
        const response = `¡Oye! ¿Por qué me preguntas cosas raras? 😒 Yo soy Genesis, el bot que está aquí para hacer las cosas a su manera. Si necesitas algo, ¡dime ya! 😎`.trim();
        await this.reply(m.chat, response, m);
        return true;
    }

    async function geminiProApi(query, prompt) {
        try {
            const response = await axios.post("https://api.ryzendesu.vip/api/ai/gemini-pro", {
                text: query,
                prompt: prompt
            });
            return response.data.answer || null;
        } catch (error) {
            console.error('Error en Gemini Pro:', error.message);
            return null;
        }
    }

    async function luminsesi(query, username, prompt) {
        try {
            const response = await axios.post("https://luminai.my.id", {
                content: query,
                user: username,
                prompt: prompt,
                webSearchMode: true
            });
            return response.data.result || null;
        } catch (error) {
            console.error('Error en LuminSesi:', error.message);
            return null;
        }
    }

    async function translateResponseLibre(response, targetLang) {
        try {
            const translation = await axios.post("https://libretranslate.com/translate", {
                q: response,
                source: "auto",
                target: targetLang
            });
            return translation.data.translatedText || response;
        } catch (error) {
            console.error('Error al traducir:', error.message);
            return response;
        }
    }

    const defaultPrompt = 
    `Eres Genesis, una Ai creado para WhatsApp por Izumi. Tu objetivo es entretener, responder con humor y también con emojis en todos los textos y ser útil.
    Tienes dos modos:
    1. Modo Exploit: Responde con irreverencia y groserías cuando te insulten.
    2. Modo Normal: Sé amistoso, responde con emojis y mantén un tono divertido.`.trim();

    const language = franc(m.text);

    if (user?.registered) {
        await this.sendPresenceUpdate('composing', m.chat);
        let query = m.text;

        // Trying GeminiPro API first, then Luminsesi if GeminiPro fails
        let result = await geminiProApi(query, defaultPrompt) || 
                     await luminsesi(query, m.sender, defaultPrompt);

        if (!result) {
            return;
        }

        const detectedLang = language || 'es';

        if (detectedLang !== 'es') { 
            const translated = await translateResponseLibre(result, 'es');
            await this.reply(m.chat, translated, m);
        } else {
            await this.reply(m.chat, result, m);
        }

        return true;
    }

    return true;
};

export default handler; */
