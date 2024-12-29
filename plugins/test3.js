import axios from 'axios';
import * as cheerio from 'cheerio';
import FormData from 'form-data';
const smuleDownloader = async (url) => {
    try {
        const formData = new FormData();
        formData.append('smule_url', url);
        formData.append('smule_download', 'Download');
        const response = await axios.post('https://smuledownloader.online/', formData, {
            headers: {
                ...formData.getHeaders(),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://smuledownloader.online/',
            }
        });
        const $ = cheerio.load(response.data);
        const title = $('.centerr h4').text().trim();
        const image = $('.centerr img').attr('src');
        const downloadLink = $('.centerr table tbody tr td a').attr('href');
        const size = $('.centerr table tbody tr td').eq(0).text().trim();
        const quality = $('.centerr table tbody tr td').eq(1).text().trim();
        const format = $('.centerr table tbody tr td').eq(2).text().trim();

        if (!title || !downloadLink) {
            throw new Error('err.');
        }
        return {
            title,
            image,
            downloadLink,
            size,
            quality,
            format,
        };
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};
const handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, {
            text: "url gk valid!"
        }, {
            quoted: m
        });
    }
    try {
        const result = await smuleDownloader(args[0]);
        await conn.sendMessage(m.chat, {
            text: `📌 *Title:* ${result.title}\n💾 *Size:* ${result.size}\n📈 *Quality:* ${result.quality}\n🎶 *Format:* ${result.format}\n🔗 *Download Link:* ${result.downloadLink}`,
        }, {
            quoted: m
        });
    } catch (error) {
        conn.sendMessage(m.chat, {
            text: `${error.message}`
        }, {
            quoted: m
        });
    }
};
handler.command = ['smule'];
handler.tags = ['downloader'];
handler.help = ['smule url'];
export default handler;