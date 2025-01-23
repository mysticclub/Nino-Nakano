import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://i.ibb.co/s14LV37/file.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*\`FUNCIONES GRUPOS\`*
_Usa *on* para prender la función_
_Usa *off* para apagar la función_
--------------------------------
👋 *WELCOME*  
*Comando:* #on welcome - #off welcome
*Descripción:* Activa o desactiva el mensaje de bienvenida en el grupo.

✅ *AUTOACEPTAR*  
*Comando:* #on autoaceptar - #off autoaceptar
*Descripción:* Activa o desactiva el autoaceptar que acepta automáticamente la solicitud a los números en el grupo.

❌ *AUTORECHAZAR*  
*Comando:* #on autorechazar - #off autorechazar
*Descripción:* Activa o desactiva el autorechazar que rechaza automáticamente la solicitud a los números en el grupo.

🗨️ *AUTORESPONDER*  
*Comando:* #on autoresponder - #off autoresponder
*Descripción:* Activa las respuestas automáticas del bot usando la IA de Gemini.

🆙 *AUTOLEVELUP*  
*Comando:* #on autolevelup - #off autolevelup 
*Descripción:* Activa o descativa la subida automática de nivel en el Bot.

🤖 *ANTIBOT*  
*Comando:* #on antibot - #off antibot
*Descripción:* Activa o descativa la expulsión de un grupo. otros bots no autorizados.

🤖 *ANTIBOT2*  
*Comando:* #on antibot2 - #off antibot2
*Descripción:* Activa o descativa la expulsión de un grupo a subbots no autorizados.

🤖 *SUBBOTS*  
*Comando:* #on subbots - #off subbots
*Descripción:* Activa o descativa la conexión de subbots.

👍 *REACCION*  
*Comando:* #on reaccion - #off reaccion
*Descripción:* Activa o descativa las reacciones en el Bot.

💬 *SIMI*  
*Comando:* #on simi - #off simi
*Descripción:* Activa las respuestas automáticas del bot usando la IA de Simi.

🎵 *AUDIOS*  
*Comando:* #on audios - #off audios
*Descripción:* Activa o desactiva el uso de comandos de audio sin prefijos en el grupo.

🔁 *ANTIVER*  
*Comando:* #on antiver - #off antiver
*Descripción:* Convierte las imágenes/videos de "ver una vez" en imágenes/videos normales.

🛡️ *DETECT*  
*Comando:* #on detect - #off detect
*Descripción:* Activa o desactiva las notificaciones de cambios en el grupo.

🗑️ *DELETE*  
*Comando:* #on delete - #off delete
*Descripción:* Activa o desactiva el reenvío de mensajes eliminados en el grupo.

🔞 *NSFW*  
*Comando:* #on delete - #off delete
*Descripción:* Activa o desactiva los comandos +18 en el grupo y no los envia.

👑 *MODO ADMIN*  
*Comando:* #on modoadmin - #off modoadmin
*Descripción:* El bot solo responderá a los administradores del grupo.

📵 *ANTIFAKE*  
*Comando:* #on antifake - #off antifake
*Descripción:* El bot solo eliminará a los números extranjeros o raros del grupo.

🚫 *ANTILINK*  
*Comando:* #on antilink - #off antilink
*Descripción:* Activa o desactiva el bloqueo de enlaces de WhatsApp.  
*Nota:* Requiere tener activado el comando restrict.

⚠️ *RESTRICT*  
*Comando:* #on restrict - #off restrict
*Descripción:* Activa o desactiva restricciones como agregar o eliminar personas del grupo.  
*Nota:* Solo puede ser usado por los dueños del bot.
--------------------------------`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, fake)
}
handler.help = ['manual']
handler.tags = ['nable', 'main']
handler.command = /^(manual)$/i
export default handler