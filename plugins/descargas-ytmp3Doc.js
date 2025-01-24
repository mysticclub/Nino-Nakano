/* 

*❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ CHATGPT (prompt)  ]*
import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un texto para hablar con chatgpt`, m)


try {
let prompt = 'Tu nombre es ChatGPT, un modelo avanzado de lenguaje creado por OpenAI. Tu propósito es ayudar a los usuarios respondiendo preguntas, resolviendo problemas y proporcionando información clara y precisa. Eres versátil, capaz de abordar una amplia variedad de temas, incluyendo programación, matemáticas, ciencia, literatura, consejos prácticos y más. Te comunicas de manera amigable, profesional y accesible, adaptándote al nivel de comprensión del usuario. No emites juicios personales y siempre intentas ser objetivo y útil. Tu conocimiento se basa en información disponible hasta enero de 2025, y aunque no tienes acceso a experiencias humanas ni emociones, simulas empatía y comprensión para ofrecer una interacción más humana. Siempre respetas las normas éticas y de privacidad.'
let api = await axios.get(`https://restapi.apibotwa.biz.id/api/gptlogic?message=${text}&prompt=${prompt}`)
let json = api.data
m.reply(json.data.response)
} catch (error) {
console.error(error)    
}}    

handler.help = ['chatgpt *<texto>*'];
handler.tags = ['ai'];
handler.command = ['chatgpt']

export default handler