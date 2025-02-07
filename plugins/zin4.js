let handler = async (m, { conn, args, usedPrefix, command }) => {
  let txt = `Hola`;
  let img = 'https://i.ibb.co/YDGYRhx/file.jpg';

  await m.react('🤍');
  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: txt,
    footer: dev,
    buttons: [
      {
        buttonId: `.ping`,
        buttonText: { displayText: 'ᯓᡣ𐭩 ⍴іᥒg' },
      },
      {
        buttonId: `.owner`,
        buttonText: { displayText: 'ᯓᡣ𐭩 ᥆ᥕᥒᥱr' },
      },
    ],
    viewOnce: true,
    headerType: 4,
  }, { quoted: m });

  // Segunda imagen con información adicional
  conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/iejoer.jpg' },
    caption: awal,
    footer: `─ Waktu: *${ucapanWaktu}*\n─ Runtime: *${runtime(process.uptime())}*`,
    contextInfo: {
      mentionedJid: [m.sender, owned],
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        showAdAttribution: true,
        title: `PokPok`,
        body: "Thezy - Chan",
        thumbnailUrl: 'https://cdn.arifzyn.site/f/sy6tjbzk.jpg',
        sourceUrl: "https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z",
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
    buttons: [
      {
        buttonId: '.tes',
        buttonText: { displayText: 'Owner Botz' },
        type: 1,
      },
      {
        buttonId: '.thxto',
        buttonText: { displayText: 'Supporter' },
        type: 1,
      },
      {
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: 'Klick Hare!!',
            sections: [
              {
                title: 'Thezy X Fauzialifatah',
                highlight_label: '',
                rows: [
                  {
                    header: '⌬ Message Owner',
                    title: '└ Menampilkan Menu Owner',
                    description: `${global.namabot}`,
                    id: '',
                  },
                  {
                    header: '⌬ Message Group',
                    title: '└ Menampilkan Menu Owner',
                    description: `${global.namabot}`,
                    id: '',
                  },
                ],
              },
            ],
          }),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
  });
};

handler.command = ['test'];
export default handler;




/* let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `Hola`
  let img = 'https://i.ibb.co/YDGYRhx/file.jpg'

    await m.react('🤍')
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: txt,
      footer: dev,
      buttons: [
        {
          buttonId: `.ping`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ⍴іᥒg',
          },
        },
        {
          buttonId: `.owner`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥆ᥕᥒᥱr',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m })
}
handler.command = ['test']
export default handler */