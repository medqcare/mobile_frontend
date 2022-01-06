function fullMonthFormat(date, dayNumber) {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const newDate = date.split('/');
  const year = newDate[2];
  const dateNumber = newDate[0];
  const numberMonth = newDate[1];

  let month = '';
  if (typeof +numberMonth === 'number') {
    month = months[+numberMonth];
  } else {
    month = numberMonth;
  }
  if (dayNumber >= 0) {
    const day = days[dayNumber];
    const fullDate = `${day}, ${dateNumber} ${month} ${year}`;
    return fullDate;
  } else {
    const fullDate = `${dateNumber} ${month} ${year}`;
    return fullDate;
  }
}

function dateWithDDMMMYYYYFormat(date) {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  console.log(date.getMonth(), 'this is month');
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthName = months[date.getMonth()];
  const dateNumber =
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const year = date.getFullYear();

  return `${dateNumber} ${monthName} ${year}`;
}

function getFormattedDate(date) {
  date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return day + '/' + month + '/' + year;
}

module.exports = {
  fullMonthFormat,
  getFormattedDate,
  dateWithDDMMMYYYYFormat,
};
