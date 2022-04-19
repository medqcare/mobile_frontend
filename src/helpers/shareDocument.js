const { PermissionsAndroid, ToastAndroid } = require('react-native');
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export const shareFilePDF = async (uri, filename) => {
  try {
    const permissionResult = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (!permissionResult) {
      const permission = await PermissionsAndroid.request(
        'android.permission.WRITE_EXTERNAL_STORAGE'
      );

      if (permission !== 'granted') {
        ToastAndroid.show('Gagal membagikan dokumen', ToastAndroid.LONG);
        return;
      }
    }

    const fileUri = `${FileSystem.documentDirectory}${filename}.pdf`;
    const { uri: resultUri } = await FileSystem.downloadAsync(uri, fileUri);
    await Sharing.shareAsync(resultUri);
  } catch (error) {
    console.log(error, 'this is error');
    ToastAndroid.show(
      `Gagal membagikan file: ${error.message}`,
      ToastAndroid.LONG
    );
  }
};
