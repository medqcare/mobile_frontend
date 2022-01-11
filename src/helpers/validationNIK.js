function nikValidation(nik) {
  const stringNik = nik.toString();

  if (!stringNik) {
    return false;
  }
  if (stringNik.length < 16) {
    return false;
  }

  for (let i = 0; i < stringNik.length; i++) {
    let eachDigit = Number(stringNik[i]);
    if (!eachDigit && eachDigit !== 0) {
      return false;
    }
  }
  return true;
}

export default nikValidation;
