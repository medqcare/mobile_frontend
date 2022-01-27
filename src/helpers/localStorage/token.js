import AsyncStorage from '@react-native-async-storage/async-storage';

const setToken = async (token) => {
  let value = token;

  if (typeof token === 'string') {
    value = { token: token };
  }

  if (typeof token === 'object' && token.hasOwnProperty('token') === false) {
    return;
  }

  await AsyncStorage.setItem('token', value);
};

const getToken = async () => {
  const value = await AsyncStorage.getItem('token');

  if (!value) {
    return null;
  }

  const { token } = JSON.parse(value);

  return token;
};

export default getToken;
