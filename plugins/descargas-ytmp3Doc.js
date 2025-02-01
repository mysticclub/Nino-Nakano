import axios from "axios";
import cheerio from "cheerio";
import FormData from "form-data";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`¿Dónde está el enlace? Usa el comando:\n${usedPrefix + command} <enlace de Twitter>`);
  }

  try {
    let res = await x(text);
    if (res.status !== 200 || (!res.result.video && !res.result.image)) {
      throw "Error al obtener los datos. Asegúrate de que el enlace es correcto e inténtalo de nuevo.";
    }

    let { title, duration, thumb, video, image } = res.result;
    let caption = `*📌 Media de Twitter*\n\n📌 *Título:* ${title}\n⏳ *Duración:* ${duration || "-"}\n`;

    if (image) {
      caption += `🖼 *Imagen encontrada.* Descargando...`;
      await conn.sendFile(m.chat, image, "twitter.jpg", caption, m);
    } else {
      caption += `🎞 *Descargando video en la mejor calidad disponible...*`;
      await conn.sendFile(m.chat, thumb, "thumb.jpg", caption, m);

      let videoUrl = video.fhd;
      if (videoUrl) {
        await conn.sendFile(m.chat, videoUrl, "twitter.mp4", `🎥 *Video de Twitter*\n\n📌 *Título:* ${title}`, m);
      } else {
        throw "El video no está disponible para descargar.";
      }
    }
  } catch (e) {
    console.error(e);
    m.reply("Ocurrió un error al obtener los datos.");
  }
};

handler.help = ["twitterdl"];
handler.tags = ["downloader"];
handler.command = ["twitterdl2", "x", "xdl"];

export default handler;

const x = async (link) => {
  const form = new FormData();
  form.append("q", link);
  form.append("lang", "es");

  const result = {
    status: 200,
    creator: "INS DV",
    result: {},
  };

  try {
    let res = await axios.post("https://x2twitter.com/api/ajaxSearch", form, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://x2twitter.com",
        Referer: "https://x2twitter.com/es",
        "User-Agent": "GoogleBot",
      },
    });

    const $ = cheerio.load(res.data.data);
    let $$ = $(".tw-right > .dl-action");
    let _$ = $(".tw-middle > .content > .clearfix");

    result.result = {
      title: _$.find("h3").text(),
      duration: _$.find("p").text() + " segundos",
      thumb: $(".tw-video > .tw-left > .thumbnail > .image-tw.open-popup > img").attr("src"),
      video: {
        fhd: $$.find("p").eq(0).find("a").attr("href") || null,
        hd: $$.find("p").eq(1).find("a").attr("href") || null,
        sd: $$.find("p").eq(2).find("a").attr("href") || null,
        audio: $$.find("p").eq(4).find("a").attr("data-audiourl") || null,
      },
      image: $$.find("p").eq(5).find("a").attr("href") || null,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, creator: "INS DV", msg: "Ocurrió un error." };
  }

  return result;
};