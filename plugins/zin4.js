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
                    description: `${global.botname}`,
                    id: '',
                  },
                  {
                    header: '⌬ Message Group',
                    title: '└ Menampilkan Menu Owner',
                    description: `${global.botname}`,
                    id: '',
                  },
                ],
              },
            ],
          }),
        },
      },
    ],
    viewOnce: true,
    headerType: 4,
  }, { quoted: m });
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