import { readdirSync, unlinkSync, existsSync, promises as fs } from 'fs';
import path from 'path';

function autoClearSession() {
    const sessionDir = `./${sessions}/`; 
    const clearInterval = 2 * 60 * 60 * 1000; 
//    const clearInterval = 1 * 60 * 1000; 

    setInterval(async () => {
        try {
            if (!existsSync(sessionDir)) return;

            const files = await fs.readdir(sessionDir);
            const filteredFiles = files.filter(file => file !== 'creds.json'); 

            if (filteredFiles.length === 0) return;

            console.log(chalk.yellow(`[LIMPIEZA AUTOMÁTICA] Iniciando limpieza de sesiones...`));

            if (global.owner) {
                await Raol404.sendMessage(
                    `${global.ownNumb.replace(/[^0-9]/g, '')}@s.whatsapp.net`,
                    { text: `🔄 *Limpieza Automática de Sesión*\nEl proceso de eliminación de sesiones ha comenzado...` }
                );
            }

            for (const file of filteredFiles) {
                await fs.unlink(path.join(sessionDir, file));
            }

            console.log(chalk.green(`[LIMPIEZA AUTOMÁTICA] Se eliminaron ${filteredFiles.length} archivos de sesión (excepto creds.json)`));

            if (global.owner) {
                await Raol404.sendMessage(
                    `${global.ownNumb.replace(/[^0-9]/g, '')}@s.whatsapp.net`,
                    { text: `🔄 *Reporte de Limpieza Automática*\nSe eliminaron ${filteredFiles.length} archivos de sesión, excepto creds.json.` }
                );
            }

        } catch (error) {
            console.error(chalk.red('[ERROR EN LIMPIEZA AUTOMÁTICA]'), error);

            if (global.owner) {
                await Raol404.sendMessage(
                    `${global.ownNumb.replace(/[^0-9]/g, '')}@s.whatsapp.net`,
                    { text: `❌ *Error en Limpieza Automática*\n${error.message}` }
                );
            }
        }
    }, clearInterval);
}

autoClearSession();