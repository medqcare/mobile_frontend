import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputPassword from '../../components/InputPassword';
import { baseURL } from '../../config';
import { BLACK_PRIMARY, RED_400, WHITE_PRIMARY } from '../../values/color';
import { INTER_400, INTER_700 } from '../../values/font';

export default function ChangePassword(props) {
  const MINIMUM_PASSWORD_LENGTH = 8;
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [isConfirmationPasswordVisible, setIsConfirmationPasswordVisible] =
    useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [loadingChangePassword, setLoadingChangePassword] = useState(false);

  const verifyPassword = (password) => {
    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      return false;
    }
    return true;
  };

  const changePasswordHandler = async (password, phoneNumber) => {
    setLoadingChangePassword(true);
    try {
      console.log(phoneNumber)
      console.log(password)
      const { data } = await axios({
        url: `${baseURL}/api/v1/members/user/password`,
        method: 'PATCH',
        data: {
          password,
          phoneNumber,
        },
      });
      ToastAndroid.show(
        'Sukses atur ulang sandi, silahkan login',
        ToastAndroid.LONG
      );
      props.navigation.navigate('SignIn');
    } catch (error) {
      ToastAndroid.show(
        `Atur ulang sandi gagal: ${error.message}`,
        ToastAndroid.LONG
      );
    } finally {
      setLoadingChangePassword(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputWrapper}>
          <Text
            style={{
              color: WHITE_PRIMARY,
              fontSize: 24,
              fontFamily: INTER_700,
            }}
          >
            Buat kata sandi baru
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <InputPassword
            value={password}
            onChangeText={(text) => {
              setPassword(text);

              if (text === confirmationPassword) {
                setIsButtonActive(true);
              } else {
                setIsButtonActive(false);
              }
            }}
            visible={isPasswordVisible}
            placeholder={'Kata Sandi Baru'}
            onEyeIconPressed={() => setIsPasswordVisible(!isPasswordVisible)}
            isInputError={!verifyPassword(password)}
          />
          {!verifyPassword(password) ? (
            <View style={styles.wrapperSpecificationText}>
              <Text style={styles.specificationText}>* Minimum 8 Karakter</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.inputWrapper}>
          <InputPassword
            value={confirmationPassword}
            onChangeText={(text) => {
              setConfirmationPassword(text);

              if (text === password) {
                setIsButtonActive(true);
              } else {
                setIsButtonActive(false);
              }
            }}
            visible={isConfirmationPasswordVisible}
            placeholder={'Ulang Kata Sandi'}
            onEyeIconPressed={() =>
              setIsConfirmationPasswordVisible(!isConfirmationPasswordVisible)
            }
            isInputError={
              !verifyPassword(confirmationPassword) ||
              confirmationPassword !== password
            }
          />
        </View>
      </View>
      <ButtonPrimary
        label={'Lanjutkan'}
        isActive={isButtonActive}
        onPress={() => {
          changePasswordHandler(
            password,
            props.navigation.getParam('phoneNumber')
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLACK_PRIMARY,
    justifyContent: 'space-between',
    padding: 12,
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  wrapperSpecificationText: {
    marginLeft: 4,
  },
  specificationText: {
    color: RED_400,
    fontFamily: INTER_400,
  },
});
