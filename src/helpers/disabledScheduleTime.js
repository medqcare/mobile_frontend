import { getSelectedDate } from "./todaysDate"
import withZero from './withZero'

function checkDisabled(schedule, bookingSchedule){
    const {
        todaysNewDate,
        todaysYear, 
        todaysMonth, 
        todaysDate,
        todaysHour,
        todaysMinutes,
    } = getSelectedDate()
    const { status, limit, scheduleDay, scheduleTime, doctorID, clinicIDWeb, cancelledDates } = schedule


    let disabled = false

    const bookingDate = withZero(bookingSchedule.getDate()) 
    const bookingMonth= withZero(bookingSchedule.getMonth() + 1)
    const bookingYear = bookingSchedule.getFullYear()
    for (let i = 0; i < cancelledDates.length; i++){
        const [cancelledDate, cancelledMonth, cancelledYear ]= cancelledDates[i].split('/')
        if(cancelledDate === bookingDate && cancelledMonth === bookingMonth && +cancelledYear === bookingYear) disabled = true
    }

    const arrayTime = scheduleTime.split(' - ')[1].split(':')
    const [scheduleHours, scheduleMinutes] = arrayTime
    const limitOrderMinutes = 30
    todaysNewDate.setHours(+scheduleHours)
    todaysNewDate.setMinutes(+scheduleMinutes)
    todaysNewDate.setMinutes(todaysNewDate.getMinutes() - limitOrderMinutes)
    const lastOrderHours = todaysNewDate.getHours()
    const lastOrderMinutes = todaysNewDate.getMinutes()
    
    const firstValidation = todaysHour > lastOrderHours && todaysDate === +bookingDate
    const secondValidation = todaysHour > lastOrderHours && todaysMinutes > lastOrderMinutes && todaysDate === +bookingDate

    if(!status && firstValidation ||  secondValidation) disabled = true

    return disabled
}

function checkDisabledDay(availableDays, dayNumber){   
    let disabled = false

    const isAvailable = availableDays.includes(dayNumber.toString())
    if(!isAvailable) disabled = true
    
    return disabled
}

export {
    checkDisabled,
    checkDisabledDay
}