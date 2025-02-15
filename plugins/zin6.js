
import fetch from "node-fetch";

const kamu3 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36";

function generateApiKey() {
    var randomValue = Math.round(Math.random() * 100000000000) + "";
    var generateHash = function() {
        for (var arr = [], i = 0; i < 64;) arr[i] = 0 | 4294967296 * Math.sin(++i % Math.PI);
        return function(input) {
            var a, b, c, d = [a = 1732584193, b = 4023233417, ~a, ~b],
                data = [],
                str = unescape(encodeURI(input)) + "\u0080",
                len = str.length;
            input = --len / 4 + 2 | 15;
            for (data[--input] = 8 * len; ~len;) data[len >> 2] |= str.charCodeAt(len) << 8 * len--;
            for (i = str = 0; i < input; i += 16) {
                for (len = d; str < 64; len = [c = len[3], a + ((c = len[0] + [a & b | ~a & c, c & a | ~c & b, a ^ b ^ c, b ^ (a | ~c)][len = str >> 4] + arr[str] + ~~data[i | [str, 5 * str + 1, 3 * str + 5, 7 * str][len] & 15]) << (len = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * len + str++ % 4]) | c >>> -len), a, b])
                    a = len[1] | 0,
                    b = len[2];
                for (str = 4; str;) d[--str] += len[str]
            }
            for (input = ""; 32 > str;) input += (d[str >> 3] >> 4 * (1 ^ str++) & 15).toString(16);
            return input.split("").reverse().join("");
        };
    }();
    return 'tryit-' + randomValue + '-' + generateHash(kamu3 + generateHash(kamu3 + generateHash(kamu3 + randomValue + 'suditya_is_a_smelly_hacker')));
}

async function generateContent(prompt, type) {
    let endpoint = type === "image" ? "api/text2img" : "generate_video";
    let boundary = "----WebKitFormBoundaryIgjn20k3Xs6BtvkS";
    let body = boundary + `\r\nContent-Disposition: form-data; name="text"\r\n\r\n${prompt}\r\n` + boundary + "--\r\n";

    try {
        let apiKey = generateApiKey();
        let response = await fetch(`https://api.deepai.org/${endpoint}`, {
            method: "POST",
            headers: {
                "accept": "*/*",
                "api-key": apiKey,
                "content-type": `multipart/form-data; boundary=${boundary}`,
                "user-agent": kamu3
            },
            body: body
        });

        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error saat menggenerate:", error);
        return null;
    }
}

var handler = async (m, {
    text,
    conn,
    command
}) => {
    if (!text) return conn.sendMessage(m.chat, {
        text: "text?"
    }, {
        quoted: m
    });

    let type = command.includes("video") ? "video" : "image";
    let result = await generateContent(text, type);

    if (result && result.output_url) {
        if (type === "image") {
            conn.sendMessage(m.chat, {
                image: {
                    url: result.output_url
                },
                caption: "nih."
            }, {
                quoted: m
            });
        } else {
            conn.sendMessage(m.chat, {
                video: {
                    url: result.output_url
                },
                caption: "nih."
            }, {
                quoted: m
            });
        }
    } else {
        conn.sendMessage(m.chat, {
            text: "Gagal."
        }, {
            quoted: m
        });
    }
};

handler.command = handler.help = ["deepimage", "deepvideo"];
handler.tags = ["ai"];
handler.register = true;
handler.limit = true;

export default handler;