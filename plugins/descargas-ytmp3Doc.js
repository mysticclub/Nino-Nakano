import uploadImage from '../lib/uploadImage.js';
const baileys = (await import("@adiwajshing/baileys")).default;

if (!baileys.proto.Message.ProtocolMessage.Type.STATUS_MENTION_MESSAGE) {
  throw new Error("No se encontró STATUS_MENTION_MESSAGE en ProtocolMessage (¿Tu WAProto está actualizado?)");
}

// Función para obtener los participantes de los grupos
const fetchParticipants = async (...jids) => {
  let results = [];
  for (const jid of jids) {
    let { participants } = await conn.groupMetadata(jid);
    participants = participants.map(({ id }) => id);
    results = results.concat(participants);
  }
  return results;
};

async function mentionStatus(jids, content) {
  let colors = ['#7ACAA7', '#6E257E', '#5796FF', '#7E90A4', '#736769', '#57C9FF', '#25C3DC', '#FF7B6C', '#55C265', '#FF898B', '#8C6991', '#C69FCC', '#B8B226', '#EFB32F', '#AD8774', '#792139', '#C1A03F', '#8FA842', '#A52C71', '#8394CA', '#243640'];
  let fonts = [0, 1, 2, 6, 7, 8, 9, 10];

  let users = [];
  for (let id of jids) {
    let userId = await conn.groupMetadata(id);
    users.push(...userId.participants.map(u => conn.decodeJid(u.id)));
  }

  let message = await conn.sendMessage(
    "status@broadcast", 
    content, 
    {
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      font: fonts[Math.floor(Math.random() * fonts.length)],
      statusJidList: users,
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: jids.map((jid) => ({
                tag: "to",
                attrs: { jid },
                content: undefined,
              })),
            },
          ],
        },
      ],
    }
  );

  jids.forEach(id => {
    conn.relayMessage(
      id, 
      {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: message.key,
              type: 25,
            },
          },
        },
      },
      {
        userJid: conn.user.jid,
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "true" },
            content: undefined,
          },
        ],
      }
    );
  });
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command == 'upswimage') {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'No se encontró ningún archivo multimedia.';
    let media = await q.download();
    let link = await uploadImage(media);
    await mentionStatus([m.chat], {
      image: { url: `${link}` },
      caption: `${text}`
    });
  }

  if (command == 'upswvideo') {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'No se encontró ningún archivo multimedia.';
    let media = await q.download();
    let link = await uploadImage(media);
    await mentionStatus([m.chat], {
      video: { url: `${link}` },
      caption: `${text}`
    });
  }

  if (command == 'upswaudio') {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'No se encontró ningún archivo multimedia.';
    let media = await q.download();
    let link = await uploadImage(media);
    await mentionStatus([m.chat], {
      audio: { url: `${link}` }
    });
  }

  if (command == 'upswtext') {
    await mentionStatus([m.chat], {
      text: text
    });
  }

  if (command == 'upsw') {
    let msg = `¿Qué deseas subir?
- .upswimage <texto opcional> (para imágenes)
- .upswvideo <texto opcional> (para videos)
- .upswaudio (para audios)
- .upswtext <texto> (para texto)`;
    m.reply(msg);
  }
};

handler.help = ['upswimage', 'upswvideo', 'upswtext', 'upswaudio', 'upsw'];
handler.tags = ['owner'];
handler.command = /^(upswimage|upswvideo|upswtext|upswaudio|upsw)$/i;
handler.owner = true;

export default handler;