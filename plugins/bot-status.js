//Codigo adaptado por Zaphkiel 



let handler = m => m;

handler.all = async function (m) {  
    let setting = global.db?.data?.settings?.[this.user.jid];  
    if (!setting) return;

    let _uptime = process.uptime() * 1000;  
    let _muptime = 0;  

    if (process.send) {  
        process.send('uptime');  
        _muptime = await new Promise(resolve => {  
            process.once('message', msg => resolve(Number(msg) || 0));  
            setTimeout(() => resolve(0), 2000);  
        }) * 1000;  
    }  

    let uptime = clockString(_uptime);  
    let bio = `💞Nino Nakano💞║🕛 ${uptime}  
     ║ 𝙱𝚢 ᴬⁿᵍᵉˡⁱᵗʰᵒ ᵒᶠⁱᶜⁱᵃˡ`;  

    await this.updateProfileStatus(bio).catch(_ => _);  
    setting.status = Date.now();  
};  

export default handler;  

function clockString(ms) {  
    let d = Math.floor(ms / 86400000) || 0;  
    let h = Math.floor(ms / 3600000) % 24 || 0;  
    let m = Math.floor(ms / 60000) % 60 || 0;  
    let s = Math.floor(ms / 1000) % 60 || 0;  
    return [d, ' » ', h, ' ・ ', m, ' ・ ', s]  
        .map(v => v.toString().padStart(2, '0'))  
        .join('');  
}