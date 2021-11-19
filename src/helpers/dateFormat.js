function fullMonthFormat(date){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

module.exports = { fullMonthFormat,}