function withZero(string){
    string = string.toString()
    if(string.length > 1){
        return string
    } else {
        return `0${string}`
    }
}

export default withZero