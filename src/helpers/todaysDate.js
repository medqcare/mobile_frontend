function getSelectedDate(date = new Date()){
    const todaysNewDate = new Date(date)
    const todaysYear = todaysNewDate.getFullYear()
    const todaysMonth = todaysNewDate.getMonth()
    const todaysDate = todaysNewDate.getDate()
    const todaysHour = todaysNewDate.getHours()
    const todaysMinutes = todaysNewDate.getMinutes()
    const todaysSecond = todaysNewDate.getSeconds()
    const todaysMillisecond = todaysNewDate.getMilliseconds()

    return {
        todaysYear, 
        todaysMonth, 
        todaysDate,
        todaysHour,
        todaysMinutes,
        todaysSecond,
        todaysMillisecond
    }
}

export {
    getSelectedDate
}
