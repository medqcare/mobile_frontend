export const formatNumberToRupiah = (number = 0) => {
  return `Rp ` + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
