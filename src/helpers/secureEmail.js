function emailName(string){
    let result = ''
    for(let i = 0; i < string.length; i++){
        if(string[i] !== '@' ){
            result += string[i]
        } else {
            return result
        }
    }
}

function emailProvider(string){
    let result = ''
    let afterAt = false

    for(let i = 0; i < string.length; i++){
        if(string[i] === '@'){
            afterAt = true
            result += string[i]
        }
        else if(afterAt === true){
            result += string[i]
        }
    }

    return result
}

export default function secureEmail(email){
    const justEmail = emailName(email)
    const justProvider = emailProvider(email)
    let result = ''
    for(let i = 0; i < justEmail.length; i++){
        if(i === 0 || i === justEmail.length - 1 || i === justEmail.length - 2){
            result += justEmail[i]
        } else {
            result += '*'
        }
    }
    
    result += justProvider

    return result
}