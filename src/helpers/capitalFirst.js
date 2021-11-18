export default function capitalFirst (str) {
    let array = str.split(' ')
    let firstWord = ''
    let result = ''
    
    for(let i = 0; i < array.length; i++){
        const word = array[i]
        if(i === 0){
            firstWord += word[0].toUpperCase() + word.slice(1).toLowerCase()
            result += firstWord
        } else {
            result += ' ' + word[0].toUpperCase() + word.slice(1).toLowerCase()
        }
    }
   
    return result
}