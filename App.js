import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/stores/reducers';
import store from './src/stores';
import Navigation from './src/navigation';
import { View } from 'react-native';
import codePush, { InstallMode, sync, CheckFrequency } from 'react-native-code-push'
import { ToastAndroid } from 'react-native';
import NotifService from "./NotificationService"


function App() {


  const onNotif = (notif) => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(() => {}, onNotif)


  const installModeOptions = {
    installMode: InstallMode.ON_NEXT_RESUME,
    minimumBackgroundDuration: 60,
  };
  sync(installModeOptions).then((result) => {
    if (result) {
      const config = {
        title: '🎉 Sukses memperbarui Aplikasi',
        message: 'Selamat! Kamu saat ini menggunakan MedQCare versi terbaru',
      };
      notif.localNotif(null,config);
      console.log('App Updated');
    } else {
      console.log('No Updates avalable');
    }
  });

  return (
    <Provider store={store}>
      <View style={{ backgroundColor: '#1F1F1F', flex: 1 }}>
        <Navigation></Navigation>
      </View>
    </Provider>
  );
}


const codePushOptions = { 
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: InstallMode.ON_NEXT_RESUME, 
  minimumBackgroundDuration: 60
};

export default 
  codePush(codePushOptions)
  (App)