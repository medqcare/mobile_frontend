import localTrigger from '../worker/createLocalNotification'
// import pushNotification from 'react-native-push-notification'

export default notification => {

    if(notification.group === 'obat_notification'){
        console.log('INI DARI HANDLER', notification);
        console.log(notification['android.intent.extra.ALARM_COUNT'], 'ini count');
        console.log('alhamdulillah sudah minum obat...');
        return
    }
    if(notification.foreground){
        console.log('masuk  sini dulu cuy', JSON.parse(notification.data.data));
        let data = JSON.parse(notification.data.data)
        return localTrigger(data.detailPrescription)
    }else{
        console.log('masukny malah kesini', notification.data);
        return localTrigger(notification.data.detailPrescription)
    }
//   if (notification && notification.data) {
//       let dataWanted = JSON.parse(notification.data)
//       console.log('[DATA WANTED]', dataWanted);
//     //   localTrigger(dataWanted.detailPrescription)
//   }
};
