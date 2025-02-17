/* 
- Código Creado Por Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/
// *[ 🍨 TIKTOK DOWNLOADER (vídeo/img)]*
import fetch from 'node-fetch'
let handler = async (m,{conn,text})=>{
if(!text)return conn.reply(m.chat,'🎵 Ingresa un link de TikTok.',m)
try{
let api=await fetch(`https://only-awan.biz.id/api/fullApi/d/tiktok?url=${encodeURIComponent(text)}`)
let json=await api.json()
if(!json.status||!json.data?.status||!json.data?.data?.urls?.length){
return m.reply('❌ Error al obtener los detalles del video. Asegúrate de que el enlace es válido.')
}
let {urls}=json.data.data
let downloadLink=urls[0]
if(downloadLink.includes('jpg')||downloadLink.includes('png')||downloadLink.includes('jpeg')||downloadLink.includes('webp')||downloadLink.includes('heic')||downloadLink.includes('tiff')||downloadLink.includes('bmp')){
await conn.sendMessage(
m.chat,
{ 
image:{url:downloadLink}, 
caption:'*✔️🍟Downloader TikTok.*' 
},
{quoted:m}
)
}else{
await conn.sendMessage(
m.chat,
{ 
video:{url:downloadLink}, 
caption:'*✔️🍟Downloader TikTok.*' 
},
{quoted:m}
)
}
}catch(error){
console.error(error)
m.reply('❌ Ocurrió un error al procesar la solicitud.')
}
}
handler.help=['tiktok *<url>*']
handler.tags=['dl']
handler.command=['tiktok']
export default handler