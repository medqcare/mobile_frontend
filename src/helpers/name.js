export default function nameFormat(text) {
  let lowText = text.toLowerCase()
  let splittedText = lowText.split(' ')

  let z = splittedText.map(el => {
    let x = el.split('')
    let y = x.map((el2, i) => {
      if (i == 0) el2 = el2.toUpperCase()
      return el2
    })
    y.join('')
    return y.join('')
  })
  return z.join(' ')
}