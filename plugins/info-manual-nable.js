let opciones = `
--------------------------------
👋 *WELCOME*  
**Comando:** #enable welcome  
**Descripción:** Activa o desactiva el mensaje de bienvenida en el grupo.

🔓 *MODO PÚBLICO*  
**Comando:** #enable public  
**Descripción:** Cambia el bot entre modo público o privado.  
**Nota:** Solo puede ser usado por los dueños del bot.

🚫 *ANTILINK*  
**Comando:** #enable antilink  
**Descripción:** Activa o desactiva el bloqueo de enlaces de WhatsApp.  
**Nota:** Requiere tener activado el comando restrict.

🌐 *ANTILINK 2*  
**Comando:** #enable antilink2  
**Descripción:** Bloquea enlaces que inicien con "https".  
**Nota:** Requiere tener activado el comando restrict.

🛡️ *DETECT*  
**Comando:** #enable detect  
**Descripción:** Activa o desactiva las notificaciones de cambios en el grupo.

🔍 *DETECT 2*  
**Comando:** #enable detect2  
**Descripción:** Detecta modificaciones en el grupo para una mejor gestión.

⚠️ *RESTRICT*  
**Comando:** #enable restrict  
**Descripción:** Activa o desactiva restricciones como agregar o eliminar personas del grupo.  
**Nota:** Solo puede ser usado por los dueños del bot.

📖 *AUTOREAD*  
**Comando:** #enable autoread  
**Descripción:** Marca automáticamente como leídos los mensajes y estados.  
**Nota:** Solo puede ser usado por los dueños del bot.

🎵 *AUDIOS*  
**Comando:** #enable audios  
**Descripción:** Activa o desactiva el uso de comandos de audio sin prefijos en el grupo.

📸 *AUTOSTICKER*  
**Comando:** #enable autosticker  
**Descripción:** Convierte automáticamente imágenes o videos enviados en el grupo en stickers.

💬 *PCONLY*  
**Comando:** #enable pconly  
**Descripción:** El bot solo responderá a comandos en chats privados.  
**Nota:** Solo puede ser usado por los dueños del bot.

👥 *GCONLY*  
**Comando:** #enable gconly  
**Descripción:** El bot solo responderá a comandos en grupos.  
**Nota:** Solo puede ser usado por los dueños del bot.

🔁 *ANTIVIEWONCE*  
**Comando:** #enable antiviewonce  
**Descripción:** Convierte las imágenes de "ver una vez" en imágenes normales.

🤬 *ANTITOXIC*  
**Comando:** #enable antitoxic  
**Descripción:** Detecta palabras ofensivas y advierte al usuario antes de eliminarlo del grupo.  
**Nota:** Requiere tener activado el comando restrict.

⚔️ *ANTITRABAS*  
**Comando:** #enable antitraba  
**Descripción:** Detecta mensajes excesivamente largos que pueden causar problemas y elimina al usuario.  
**Nota:** Requiere tener activado el comando restrict.

🚷 *ANTIÁRABES*  
**Comando:** #enable antiarabes  
**Descripción:** Elimina automáticamente números árabes que se unan al grupo.  
**Nota:** Requiere tener activados los comandos welcome y restrict.

✋ *ANTIÁRABES 2*  
**Comando:** #enable antiarabes2  
**Descripción:** Elimina automáticamente números árabes que escriban en el grupo.  
**Nota:** Requiere tener activado el comando restrict.

🤖 *MODEJADIBOT*  
**Comando:** #enable modejadibot  
**Descripción:** Activa o desactiva el uso de sub-bots (${usedPrefix}serbot / ${usedPrefix}jadibot).  
**Nota:** Solo puede ser usado por los dueños del bot.

👑 *MODO ADMIN*  
**Comando:** #enable modoadmin  
**Descripción:** El bot solo responderá a los administradores del grupo.

🗨️ *SIMSIMI*  
**Comando:** #enable simsimi  
**Descripción:** Activa las respuestas automáticas del bot usando la IA de SimSimi.

⏳ *ANTISPAM*  
**Comando:** #enable antispam  
**Descripción:** Detecta spam de comandos, banea al usuario por 5 segundos y le advierte.  
**Nota:** Solo puede ser usado por los dueños del bot.
--------------------------------
`.trim();