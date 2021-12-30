const DATA = {
  LinkAja: {
    name: 'LinkAja',
    iconUrl: require('../assets/png/ic_linkaja.png'),
  },
  'Go-Pay': {
    name: 'Go-Pay',
    iconUrl: require('../assets/png/ic_gopay.png'),
  },
  OVO: {
    name: 'OVO',
    iconUrl: require('../assets/png/ic_ovo.png'),
  },
  Mandiri: {
    name: 'Transfer Mandiri',
    iconUrl: require('../assets/png/ic_mandiri.png'),
  },
  BNI: {
    name: 'Transfer BNI',
    iconUrl: require('../assets/png/ic_BNI.png'),
  },
  BCA: {
    name: 'Transfer BCA',
    iconUrl: require('../assets/png/ic_BCA.png'),
  },
};
export default getPaymentMethod = (paymentMethodName) => {
  return DATA[paymentMethodName];
};
