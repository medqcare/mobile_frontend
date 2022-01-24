import auth from '@react-native-firebase/auth';

class FirebaseAuthService {
  verifyPhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
      auth()
        .verifyPhoneNumber(phoneNumber, false, false)
        .then((res) => {
          resolve(res.verificationId);
        })
        .catch((err) => reject(err));
    });
  }

  confirmCode(verificationId, code) {
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    return auth()
      .signInWithCredential(credential)
      .then(() => Promise.resolve(true))
      .catch((err) => Promise.reject(err));
  }
}

const firebaseAuthService = new FirebaseAuthService();

export default firebaseAuthService;
