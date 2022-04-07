import axios from 'axios';
import React, { useState } from 'react';
import {
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { baseURL } from '../../config';
import formatPhoneNumber from '../../helpers/formatPhoneNumber';

import {
  BLACK_PRIMARY,
  BLACK_SECONDARY,
  BLUE_PRIMARY,
  GREY_SECONDARY,
  RED_400,
  RED_500,
  WHITE_PRIMARY,
  WHITE_SECONDARY,
} from '../../values/color';

import { INTER_400, INTER_500, INTER_700, INTER_800 } from '../../values/font';

export default function ForgotPassword(props) {
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [errorPhoneIsNotExist, setErrorPhoneIsNotExist] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeTextInputPhoneNumberHandler = (text) => {
    if (text.length > 7) {
      setIsPhoneNumberValid(true);
    } else {
      setIsPhoneNumberValid(false);
    }

    setPhoneNumber(text);
  };

  const verifyPhoneNumberIsExist = async (phoneNumber) => {
    const { data: response } = await axios({
      method: 'POST',
      url: baseURL + '/api/v1/members/check/phone/email',
      data: {
        phoneNumber,
        email: '',
      },
    });

    const { isPhoneExist } = response;

    return isPhoneExist;
  };

  const onButtonNextPresedHandler = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    try {
      setLoading(true);
      const isPhoneNumberExist = await verifyPhoneNumberIsExist(
        formattedPhoneNumber
      );

      if (!isPhoneNumberExist) {
        setErrorPhoneIsNotExist(true);
        return;
      }

      props.navigation.navigate('InputSecretCodeOTP', {
        phoneNumber: formattedPhoneNumber,
        backTo: 'SignIn',
        onSuccess: () => {
          props.navigation.navigate('ChangePassword', {
            phoneNumber: formattedPhoneNumber
          })
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={{
          flex: 1,
          marginTop: '10%',
        }}
      >
        <Text
          style={{
            color: WHITE_PRIMARY,
            fontWeight: 'bold',
            fontSize: 24,
            maxWidth: '80%',
            marginBottom: 6,
            // fontFamily: INTER_700,
            fontFamily: INTER_700,
          }}
        >
          Lupa password akun MedQCare ?
        </Text>
        <Text
          style={{
            color: WHITE_SECONDARY,
            fontSize: 16,
            fontFamily: INTER_400,
          }}
        >
          Masukkan nomor HP lama yang terdaftar di MedQCare untuk pulihkan
          kembali akunmu
        </Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.labelInput}>
            Nomor Hp <Text style={styles.labelInputRequire}>*</Text>
          </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={onChangeTextInputPhoneNumberHandler}
            style={[
              styles.inputPhoneNumber,
              styles.textInputPhoneNumber,
              isPhoneNumberValid ? styles.inputValid : null,
              !isPhoneNumberValid && phoneNumber.length > 0
                ? styles.inputWarning
                : null,
            ]}
            keyboardType={'number-pad'}
            placeholder={'628XXXXXX'}
            placeholderTextColor={GREY_SECONDARY}
            autoFocus={true}
          />
          {errorPhoneIsNotExist ? (
            <Text style={styles.textError}>Nomor HP tidak terdaftar</Text>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          isPhoneNumberValid ? styles.buttonActive : styles.buttonInActive,
        ]}
        onPress={onButtonNextPresedHandler}
      >
        {loading ? (
          <ActivityIndicator size={'small'} color={WHITE_PRIMARY} />
        ) : (
          <Text style={styles.buttonLabel}>Lanjut</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK_PRIMARY,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  buttonContainer: {
    minHeight: 48,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 99,
  },
  buttonActive: {
    backgroundColor: BLUE_PRIMARY,
  },
  buttonInActive: {
    backgroundColor: GREY_SECONDARY,
  },
  buttonLabel: {
    color: WHITE_PRIMARY,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: INTER_500,
    fontSize: 15,
  },
  inputWrapper: {
    marginTop: '10%',
  },
  inputPhoneNumber: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: BLACK_SECONDARY,
    marginTop: 4,
  },
  inputWarning: {
    borderWidth: 1,
    borderColor: RED_400,
  },
  inputValid: {
    borderWidth: 1,
    borderColor: BLUE_PRIMARY,
  },
  labelInput: {
    color: WHITE_PRIMARY,
    fontFamily: INTER_400,
  },
  labelInputRequire: {
    color: RED_500,
    fontFamily: INTER_400,
  },
  textInputPhoneNumber: {
    color: WHITE_PRIMARY,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: INTER_700,
  },
  textError: {
    color: RED_400,
    fontSize: 14,
    fontFamily: INTER_400,
  },
});
