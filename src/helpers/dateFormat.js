function fullMonthFormat(date){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const newDate = date.split('/')
    const year = newDate[2]
    const numberMonth = newDate[1]
    const day = newDate[0]

    const month = months[numberMonth - 1];
    const fullDate = `${day} ${month} ${year}`
    return fullDate
}

module.exports = { fullMonthFormat,}