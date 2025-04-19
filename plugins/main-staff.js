let handler = async (m, { conn, command, usedPrefix }) => {
let img = 'https://files.catbox.moe/pzgyx3.jpg'
let staff = `ᥫ᭡ *EQUIPO DE AYUDANTES* ❀
✰ *Dueño* ${creador}
✦ *Bot:* ${botname}
⚘ *Versión:* ${vs}
❖ *Libreria:* ${libreria} ${baileys}

❍ *Creador:*

ᰔᩚ ♰ÄŅĠËĻÏȚȞÖ⚔Ö₣ÏĊÏÄĻ♰
> 🜸 Rol » *Creador*
> ✧ Num » +51 920 227 615

❒ *Colaboradores:*

ᰔᩚ Deylin 
> 🜸 Rol » *Developer*
> ✧ Num » +504 8819-8573

ᰔᩚ Niño Piña
> 🜸 Rol » *Developer*
> ✧ Num » +505 5786 5603

✧ José (edición y creación de logos)
> 🜸 Rol » *Mod*
> ✧ Num » +58 424-5610338
`
await conn.sendFile(m.chat, img, 'yuki.jpg', staff.trim(), fkontak)
}

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler