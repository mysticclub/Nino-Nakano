import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
import { RankCardBuilder } from 'discord-card-canvas'

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]

    // Verifica si puede subir de nivel
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = ` –  *L E V E L U P  -  U S E R*\n\n`
            txt += `✩ *Nombre* : ${name}\n`
            txt += `✩ *Nivel* : ${user.level}\n`
            txt += `✩ *XP* : ${user.exp - min}/${xp}\n\n`
            txt += `Te falta *${max - user.exp}* de *💫 XP* para subir de nivel`

        // Generar tarjeta personalizada
        const canvasRank = await new RankCardBuilder({
            currentLvl: user.level,
            currentRank: 0, // Puedes agregar clasificación si tienes un sistema
            currentXP: user.exp - min,
            requiredXP: xp,
            backgroundColor: { background: '#070d19', bubbles: '#0ca7ff' },
            avatarImgURL: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), // Puedes usar otro avatar dinámico
            nicknameText: { content: name, font: 'Nunito', color: '#0CA7FF' },
            userStatus: 'online',
        }).build()

        // Enviar imagen generada
        await conn.sendFile(m.chat, canvasRank.toBuffer(), 'rank.png', txt, m, null)
        return
    }

    // Subir de nivel
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let txt = ` –  *L E V E L U P  -  U S E R*\n\n`
            txt += `✩ *Nombre* : ${name}\n`
            txt += `✩ *Nivel Anterior* : ${before}\n`
            txt += `✩ *Nivel Actual* : ${user.level}\n\n`
            txt += `🤍 Cuanto más interactúes con *Ai Hoshino*, mayor será tu Nivel`

        // Generar tarjeta personalizada para el nuevo nivel
        const canvasRank = await new RankCardBuilder({
            currentLvl: user.level,
            currentRank: 0,
            currentXP: user.exp,
            requiredXP: xpRange(user.level, global.multiplier).max,
            backgroundColor: { background: '#070d19', bubbles: '#0ca7ff' },
            avatarImgURL: 'https://telegra.ph/file/b97148e2154508f63d909.jpg',
            nicknameText: { content: name, font: 'Nunito', color: '#0CA7FF' },
            userStatus: 'online',
        }).build()

        // Enviar imagen generada
        await conn.sendFile(m.chat, canvasRank.toBuffer(), 'rank.png', txt, m, null)
    }
}

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler