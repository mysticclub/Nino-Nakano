/*
 • Función por el equipo de Anomaki
 • Creado por: Nazand Code
 • CONTRIBUIDOR: SHANNZ (SCRAPE)
 • DESCARGADOR DE FACEBOOK
 • No elimines el crédito
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l
*/

import axios from 'axios';
import * as cheerio from 'cheerio';
import qs from 'qs';

const fdown = {
    getToken: async () => {
        try {
            const response = await axios.get('https://fdown.net', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
                    'Accept-Language': 'es-ES',
                    'Upgrade-Insecure-Requests': '1',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'cross-site',
                    'Priority': 'u=0, i',
                    'TE': 'trailers'
                }
            });
            const html = response.data;
            const $ = cheerio.load(html);
            const token_v = $('input[name="token_v"]').val();
            const token_c = $('input[name="token_c"]').val();
            const token_h = $('input[name="token_h"]').val();

            return {
                token_v,
                token_c,
                token_h
            };
        } catch (error) {
            throw new Error('Error al obtener los tokens:', error);
        }
    },
    request: async (url) => {
        const {
            token_v,
            token_c,
            token_h
        } = await fdown.getToken();
        const data = qs.stringify({
            'URLz': url,
            'token_v': token_v,
            'token_c': token_c,
            'token_h': token_h
        });

        const config = {
            method: 'POST',
            url: 'https://fdown.net/download.php',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept-language': 'es-ES',
                'referer': 'https://fdown.net/',
                'origin': 'https://fdown.net',
                'upgrade-insecure-requests': '1',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'priority': 'u=0, i',
                'te': 'trailers',
                'Cookie': '_ga_82ERN9JZD3=GS1.1.1737018254.1.0.1737018267.47.0.0; _ga=GA1.1.2048643421.1737018254; cf_clearance=JftCQTTf5ls7XHmLGcPNO02__A8BiP.5M54jgPRKrGw-1737018256-1.2.1.1-cDSquDDBHMtA9BQGzJZBkm18v0EUb3ZK.QaRSl0xnm_AAW_V4W7RsseKJlvp.LF4M.6mULbSLLMiU7hWX5_SL1EwqzAKgCCZnTEE4eA2jsR6f7gc_kRVuh9zH_dqTgGHyBQFTnjLIBwljOe_33kyvwSD9IWnsIqAcTCAxSt2ezyiAS9jQrCYppCgb8PZpl1PDVru_Ku.ScByV_c9doWyGf1q3fSNS0ISw45lMQdyixhHupbuhUJXvukoegePAWG1FYVEZYGgN6aNDmIO6HwZMxkICShkc6mOEdhmuM5Jk3c'
            },
            data: data
        };
        const api = await axios.request(config);
        return api.data;
    },
    download: async (url) => {
        const data = await fdown.request(url);
        const $ = cheerio.load(data);
        const videoDetails = $('#result .lib-item').map((i, el) => {
            const title = $(el).find('.lib-header').text().trim();
            const description = $(el).find('.lib-desc').first().text().replace('Description:', '').trim();
            const duration = $(el).find('.lib-desc').last().text().replace('Duration:', '').trim();
            const normalQualityLink = $('#sdlink').attr('href');
            const hdQualityLink = $('#hdlink').attr('href');
            const thumbnail = $(el).find('.lib-img-show').attr('data-cfsrc') || $(el).find('.lib-img-show').attr('src');

            return {
                title,
                description,
                thumbnail,
                duration,
                normalQualityLink,
                hdQualityLink
            };
        }).get();

        return videoDetails;
    }
};

let nazand = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    const url = args[0];
    if (!url) throw 'Por favor, proporciona la URL del video que deseas descargar.';

    try {
        await m.reply('🔄 Procesando la obtención de datos del video...');

        const result = await fdown.download(url);
        if (result && result.length > 0) {
            let video = result[0];
            const downloadLink = video.hdQualityLink || video.normalQualityLink;

            if (!downloadLink) {
                throw 'No hay enlaces de descarga para la calidad seleccionada.';
            }

            await conn.sendMessage(m.chat, {
                video: {
                    url: downloadLink
                },
                caption: `🎥 Listo`
            }, m);
        } else {
            throw 'No se pudieron obtener los detalles del video.';
        }
    } catch (error) {
        console.error(error);
        await m.reply("❌ Ocurrió un error al obtener los datos del video.");
    }
};

nazand.help = ['fdown'];
nazand.tags = ['tools'];
nazand.command = /^(fdown)$/i;
nazand.limit = true;
export default nazand;