export default getDay = (date) => {
  let dateNow = new Date(date.substring(0, 10))

  let tanggal = dateNow.toDateString().split(' ')

  let wanted = [tanggal[0], tanggal[2] , tanggal[1], tanggal[3]]

  return wanted.join(' ')
}