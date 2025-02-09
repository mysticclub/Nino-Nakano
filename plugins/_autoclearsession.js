// Auto Clear Session System
function autoClearSession() {
    const sessionDir = './${sessions}/'; // Sesuaikan dengan path session
    const clearInterval = 2 * 60 * 60 * 1000; // 2 jam dalam milidetik
    
    setInterval(async () => {
        try {
            const files = fs.readdirSync(sessionDir);
            const filteredFiles = files.filter(file => 
                file.startsWith('pre-key') ||
                file.startsWith('sender-key') ||
                file.startsWith('session-') ||
                file.startsWith('app-state')
            );

            if (filteredFiles.length === 0) return;

            console.log(chalk.yellow(`[AUTO CLEAN] Starting auto session cleanup...`));
            
            // Kirim notifikasi ke owner bahwa auto clear session akan dimulai
            if (global.ownNumb) {
                await Raol404.sendMessage(
                    `${global.ownNumb.replace(/[^0-9]/g, '')}@s.whatsapp.net`, 
                    { text: `🔄 *Auto Clean Session*\nAuto clear session is starting...` }
                );
            }

            filteredFiles.forEach(file => {
                fs.unlinkSync(path.join(sessionDir, file));
            });

            console.log(chalk.green(`[AUTO CLEAN] Removed ${filteredFiles.length} session files`));
            
            // Kirim notifikasi ke owner setelah proses selesai
            if (global.ownNumb) {
                await Raol404.sendMessage(
                    `${global.ownNumb.replace(/[^0-9]/g, '')}@s.whatsapp.net`, 
                    { text: `🔄 *Auto Clean Report*\nSuccessfully cleared ${filteredFiles.length} session files` }
                );
            }
        } catch (error) {
            console.error(chalk.red('[AUTO CLEAN ERROR]'), error);
            
            // Kirim notifikasi error ke owner
            if (global.ownNumb) {
                await Raol404.sendMessage(
                    `${global.ownNumb.replace(/[^0-9]/g, '')}@s.whatsapp.net`, 
                    { text: `❌ *Auto Clean Error*\n${error.message}` }
                );
            }
        }
    }, clearInterval);
}

// Jalankan saat panel start
autoClearSession();?