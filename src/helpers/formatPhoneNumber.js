export default function formatPhoneNumber(phoneNumber) {
  let code = '';

  if (phoneNumber[0] == '0') {
    code = `+62${phoneNumber.slice(1)}`;
  } else if (phoneNumber[0] === '6' && phoneNumber[1] === '2') {
    code += `+${phoneNumber}`;
  } else if (phoneNumber[0] === '8') {
    code += `+62${phoneNumber}`;
  }

  // +62852XXXXXX
  return code;
}
