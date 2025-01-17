import { createCanvas } from 'canvas';
import moment from 'moment-timezone';

let handler = async (m, { conn, text }) => {
  const timezone = 'Asia/Jakarta';
  const currentDate = moment.tz(timezone);
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();
  const today = currentDate.date();

  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  let queryMonth = months.findIndex((month) => month.toLowerCase() === text.toLowerCase());
  if (queryMonth === -1) queryMonth = currentMonth;

  const displayDate = moment.tz(timezone).month(queryMonth).startOf('month');
  const monthName = months[queryMonth];
  const year = currentYear;

  const holidays = [
    { date: '2025-01-01', description: 'Año Nuevo 2025' },
    { date: '2025-01-27', description: 'Isra Mikraj del Profeta Muhammad SAW' },
    { date: '2025-01-29', description: 'Año Nuevo Chino 2576' },
    { date: '2025-03-29', description: 'Día de Nyepi, Año Nuevo Saka 1947' },
    { date: '2025-03-31', description: 'Idulfitri 1446 H' },
    { date: '2025-04-01', description: 'Idulfitri 1446 H (continuación)' },
    { date: '2025-04-18', description: 'Viernes Santo' },
    { date: '2025-05-01', description: 'Día Internacional del Trabajo' },
    { date: '2025-05-12', description: 'Día de Waisak 2569 BE' },
    { date: '2025-05-29', description: 'Ascensión de Cristo' },
    { date: '2025-06-01', description: 'Día del Nacimiento de Pancasila' },
    { date: '2025-06-07', description: 'Iduladha 1446 H' },
    { date: '2025-06-27', description: 'Año Nuevo Islámico 1447 H' },
    { date: '2025-08-17', description: 'Día de la Independencia de Indonesia' },
    { date: '2025-09-05', description: 'Nacimiento del Profeta Muhammad SAW' },
    { date: '2025-12-25', description: 'Navidad' },
  ];

  const holidaysThisMonth = holidays.filter(
    (holiday) => moment(holiday.date).month() === queryMonth
  );

  const daysInMonth = displayDate.daysInMonth();
  const firstDayOfMonth = displayDate.day();
  const canvasWidth = 700;
  const canvasHeight = 850;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#000000';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';

  ctx.fillText(`${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`, canvasWidth / 2, 50);

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  daysOfWeek.forEach((day, index) => {
    ctx.fillStyle = day === 'Dom' ? '#ff0000' : '#000000';
    ctx.fillText(day, 100 + index * 80, 100);
  });

  let x = 100;
  let y = 150;
  for (let i = 0; i < firstDayOfMonth; i++) {
    x += 80;
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const currentDay = (firstDayOfMonth + date - 1) % 7;

    if (queryMonth === currentMonth && date === today) {
      ctx.beginPath();
      ctx.arc(x, y - 10, 30, 0, 2 * Math.PI);
      ctx.strokeStyle = '#0000ff';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
    }

    const holiday = holidaysThisMonth.find((holiday) => moment(holiday.date).date() === date);

    ctx.fillStyle = holiday || currentDay === 0 ? '#ff0000' : '#000000';
    ctx.fillText(date.toString(), x, y);

    x += 80;
    if ((date + firstDayOfMonth) % 7 === 0) {
      x = 100;
      y += 70;
    }
  }

  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  let textY = y + 70;
  holidaysThisMonth.forEach((holiday) => {
    ctx.fillStyle = '#ff0000';
    ctx.fillText(`${moment(holiday.date).format('DD MMMM YYYY')} - ${holiday.description}`, 50, textY);
    textY += 30;
  });

  const buffer = canvas.toBuffer();
  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: `Calendario del mes: ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`,
  });
};

handler.help = ['calendario *<mes>*'];
handler.tags = ['tools'];
handler.command = ['calendario'];
export default handler;