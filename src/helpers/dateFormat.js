function fullMonthFormat(date){
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    const newDate = date.split('/')
    const year = newDate[2]
    const day = newDate[0]
    const numberMonth = newDate[1]
    
    let month = ''
    if(+numberMonth){
        month = months[+numberMonth - 1]
    } else {
        month = numberMonth
    }
    
    const fullDate = `${day} ${month} ${year}`
    return fullDate
}

function getFormattedDate(date) {
    date = new Date(date)
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
}

module.exports = { 
    fullMonthFormat,
    getFormattedDate
}