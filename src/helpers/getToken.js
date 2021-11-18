import AsyncStorage from '@react-native-async-storage/async-storage'

const _checkLogin = () => {
  return new Promise(async (resolve, reject) => {
    let data = await AsyncStorage.getItem('token')
    if (data) {
      // console.log(data, 'ini dari getToken')
      //get by token datanya biar masuk ke user data
      resolve(data)
    } else {
      reject('belom login')
    }
  })
}

export default _checkLogin