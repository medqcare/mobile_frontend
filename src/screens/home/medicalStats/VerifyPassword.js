import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import IconLock from '../../../assets/svg/IconLock';
import { baseURL } from '../../../config';

function VerifyPassword(props) {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async () => {
    try {
      setLoading(true);
      const tokenString = await AsyncStorage.getItem('token');
      const { token } = JSON.parse(tokenString);
      const { email } = props.userData.userID;
      console.log(token, email);
      await axios({
        url: baseURL + '/api/v1/members/verify/password',
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          password,
          email,
        },
      });
      const patientID = props.navigation.getParam('patientID');
      console.log('This is patient ID (Verify): ', patientID)

      ToastAndroid.show('Verifikasi Berhasil', ToastAndroid.LONG)
      props.navigation.navigate('ScannerShareMedres', {
        patientID
      });
    } catch (error) {
      ToastAndroid.show(
        'Verifikasi gagal, silahkan coba lagi',
        ToastAndroid.LONG
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.topSection}>
        <View>
          <View style={styles.iconLockWrapper}>
            <IconLock />
          </View>
          <Text style={styles.textTitle}>Masukkan Password</Text>
          <Text style={styles.textDescription}>
            Gunakan password MedQCare Anda
          </Text>
        </View>
        <View style={styles.inputPasswordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#b5b5b5"
            secureTextEntry={isPasswordVisible}
            style={styles.inputPassword}
            autoCapitalize="none"
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Feather name="eye-off" size={20} color="grey" />
            ) : (
              <Feather name="eye" size={20} color="grey" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonPrimaryWrapper}
            onPress={onSubmitHandler}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={'#DDDDDD'} size={'small'} />
            ) : (
              <Text style={styles.buttonPrimaryText}>Bagikan</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonSecondaryWrapper}
          onPress={() => props.navigation.pop()}
          disabled={loading}
        >
          <Text style={styles.buttonSecondaryText}>Batal</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 36,
    paddingTop: '20%',
    backgroundColor: '#181818',
    justifyContent: 'space-between',
    flex: 1,
  },
  topSection: {
    flex: 0.8,
    width: '100%',
  },
  bottomSection: {
    flex: 0.2,
    width: '100%',
  },
  inputPasswordContainer: {
    marginTop: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#506A79',
  },
  inputPassword: {
    color: '#B5B5B5',
    width: '90%',
    paddingVertical: 4,
    fontSize: 14,
  },
  textTitle: {
    color: '#DDDDDD',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6,
  },
  textDescription: {
    color: '#B5B5B5',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  iconLockWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 26,
  },
  buttonPrimaryWrapper: {
    paddingVertical: 15,
    backgroundColor: '#005EA2',
    alignItems: 'center',
    borderRadius: 99,
  },
  buttonPrimaryText: {
    color: '#DDDDDD',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  buttonSecondaryWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: '#BD4C43',
    fontSize: 12,
    fontWeight: '500',
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(VerifyPassword);
