/* - Autoclearsession By Izumi.kzx
   - https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y*/
import { readdirSync, unlinkSync, existsSync, promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

function autoClearSession() {
    const sessionDir = `./${sessions}/`;
    const clearInterval = 3 * 60 * 60 * 1000;

    setInterval(async () => {
        try {
            if (!existsSync(sessionDir)) return;

            const files = await fs.readdir(sessionDir);
            const filteredFiles = files.filter(file => file !== 'creds.json');

            if (filteredFiles.length === 0) return;

            console.log(chalk.yellow(`[LIMPIEZA AUTOMÁTICA] Iniciando limpieza de sesiones...`));

            let deletedCount = 0;

            for (const file of filteredFiles) {
                const filePath = path.join(sessionDir, file);
                try {
                    if (existsSync(filePath)) { 
                        await fs.unlink(filePath);
                        deletedCount++;
                    }
                } catch (err) {
                    console.warn(chalk.red(`[ADVERTENCIA] No se pudo eliminar ${file}: ${err.message}`));
                }
            }

            console.log(chalk.green(`[LIMPIEZA AUTOMÁTICA] Se eliminaron ${deletedCount} archivos de sesión (excepto creds.json)`));

        } catch (error) {
            console.error(chalk.red('[ERROR EN LIMPIEZA AUTOMÁTICA]'), error);
        }
    }, clearInterval);
}

autoClearSession();



/* import { readdirSync, unlinkSync, existsSync, promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

function autoClearSession() {
    const sessionDir = `./${sessions}/`; 
    const clearInterval = 3 * 60 * 60 * 1000;
    const ownerNumber = '59897246324@s.whatsapp.net';

    setInterval(async () => {
        try {
            if (!existsSync(sessionDir)) return;

            const files = await fs.readdir(sessionDir);
            const filteredFiles = files.filter(file => file !== 'creds.json'); 

            if (filteredFiles.length === 0) return;

            console.log(chalk.yellow(`[LIMPIEZA AUTOMÁTICA] Iniciando limpieza de sesiones...`));

            await conn.sendMessage(
                ownerNumber,
                { text: `🔄 *Limpieza Automática de Sesión*\nEl proceso de eliminación de sesiones ha comenzado...` }
            );

            for (const file of filteredFiles) {
                await fs.unlink(path.join(sessionDir, file));
            }

            console.log(chalk.green(`[LIMPIEZA AUTOMÁTICA] Se eliminaron ${filteredFiles.length} archivos de sesión (excepto creds.json)`));

            await conn.sendMessage(
                ownerNumber,
                { text: `🔄 *Reporte de Limpieza Automática*\nSe eliminaron ${filteredFiles.length} archivos de sesión, excepto creds.json.` }
            );

        } catch (error) {
            console.error(chalk.red('[ERROR EN LIMPIEZA AUTOMÁTICA]'), error);

            await conn.sendMessage(
                ownerNumber,
                { text: `❌ *Error en Limpieza Automática*\n${error.message}` }
            );
        }
    }, clearInterval);
}

autoClearSession(); */