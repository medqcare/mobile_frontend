export default getTotalPrice = (arrPrice) => {
  let total = 0

  arrPrice.forEach(element => {
    if(element.price){
      total += +element.price
    }
  });
  return total
}