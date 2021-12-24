function getSelectedDate(date){
    const todaysNewDate = new Date(date)
    const todaysYear = todaysNewDate.getFullYear()
    const todaysMonth = todaysNewDate.getMonth()
    const todaysDate = todaysNewDate.getDate()

    return {
        todaysYear, 
        todaysMonth, 
        todaysDate
    }
}

export {
    getSelectedDate
}
