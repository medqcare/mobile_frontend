

export default function getAge(date) {
    let today = new Date()
    let birthDate = new Date(date)
    let Age = today.getFullYear() - birthDate.getFullYear()
    let monthAge = today.getMonth()  - birthDate.getMonth()
    // console.log(today.getFullYear(), ' + ', birthDate.getFullYear(), '================')
    // console.log(today)
    if(monthAge < 0 || (monthAge === 0 && today.getDate() < birthDate.getDate())) {
        Age--
    }
    return Age
}

export function properAge(date){
    const age = getAge(date)
    const properFormat = `${age} Tahun`
    return properFormat
}