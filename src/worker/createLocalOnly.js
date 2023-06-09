// import PushNotification from 'react-native-push-notification';

export default (dataSatuObat) => {
  return new Promise(async (res, rej) => {
    try {
      console.log('KEPANGGIL COK 123')

      console.log(dataSatuObat, '[INI DATA SATU OBAT]')
      
      let dataObat = {
        drugName: dataSatuObat.drugName,
        schedule: dataSatuObat.schedule,
        quantity: dataSatuObat.quantity,
        dose: dataSatuObat.dose,
        otherInstruction: dataSatuObat.otherInstruction,
        notif : true
      };

      
      let jumlahTrigger = Math.floor(dataSatuObat.quantity / (dataSatuObat.dose * dataObat.schedule.length)) 

      dataObat.schedule.forEach((el, i) => {
        let triggerTime = new Date();
        triggerTime.setHours(el.jam, el.menit, 0);
        console.log(triggerTime)

        let notifId = dataSatuObat.notifIndex.toString() + i.toString()
        console.log(notifId, 'ini notif idnya')

        // PushNotification.localNotificationSchedule({
        //   /* Android Only Properties */
        //   id: notifId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        //   // ticker: "My Notification Ticker", // (optional)
        //   autoCancel: true, // (optional) default: true
        //   largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
        //   smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        //   bigText: `Please take your ${dataSatuObat.drugName}`, // (optional) default: "message" prop
        //   // subText: `Please take your ${dataSatuObat.drugName}`, // (optional) default: none
        //   // color: "red", // (optional) default: system default
        //   vibrate: true, // (optional) default: true
        //   // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        //   tag: `${jumlahTrigger}`, // (optional) add tag to message
        //   group: 'obat_notification', // (optional) add group to message
        //   ongoing: false, // (optional) set whether this is an "ongoing" notification
        //   priority: 'high', // (optional) set notification priority, default: high
        //   visibility: 'private', // (optional) set notification visibility, default: private
        //   importance: 'high', // (optional) set notification importance, default: high
        //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        //   ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        //   data : {
        //     ... dataSatuObat
        //   },
        //   /* iOS only properties */
        //   alertAction: 'view', // (optional) default: view
        //   category: '', // (optional) default: empty string
        //   // userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

        //   /* iOS and Android properties */
        //   // title: "My Notification Title", // (optional)
        //   message: 'My Notification Message', // (required)
        //   playSound: true, // (optional) default: true
        //   soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //   number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //   repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        //   date: triggerTime,
        //   // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
        // });

      });

      console.log('PROCESS DONE');
      // console.log('ini pengulangan', pengulangan);
      res(dataObat)
    } catch (error) {
      console.log('ADA ERROR');
      console.warn(error);
      rej(error)
    }
  })

};
