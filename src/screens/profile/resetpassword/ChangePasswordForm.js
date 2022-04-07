import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { changePassword, changeAccountPassword } from '../../../stores/action';
import Feather from 'react-native-vector-icons/Feather'; // Made for password visibility

function ChangePasswordForm({ navigation, ...props }) {
  const { email, destination } = navigation.state.params;
  const [load, setLoad] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });
  const [form, setForm] = useState({
    password: null,
    confirmPassword: null,
  });

  const updateSecureTextEntry = (changeKey) => {
    setSecureTextEntry({
      ...secureTextEntry,
      [changeKey]: !secureTextEntry[changeKey],
    });
  };

  const submitNewPassword = () => {
    const { password, confirmPassword } = form;
    if (password.length < 5) {
      ToastAndroid.show('Password must be at least 5 characters');
    } else if (password !== confirmPassword) {
      ToastAndroid.show('Confirm password does not match');
    } else {
      props.changeAccountPassword(email, password, navigation.navigate, destination);
    }
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate(destination);
    return true;
  });

  return (
    <View style={styles.container} behavior={'padding'} enabled>
      {/* <StatusBar hidden/> */}
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* Header */}
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Silahkan masukan password baru anda
          </Text>
        </View>

        {/* Password form */}
        <View style={styles.inputContainer}>
          <View style={styles.inputTopContainer}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                autoCapitalize={'none'}
                autoFocus={false}
                placeholder={'Password'}
                placeholderTextColor="#8b8b8b"
                secureTextEntry={secureTextEntry.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                value={form.password}
              />
              {/* Password Invisble/Visible Button */}
              <TouchableOpacity
                onPress={() => updateSecureTextEntry('password')}
              >
                {secureTextEntry.password ? (
                  <Feather name="eye-off" size={20} color="grey" />
                ) : (
                  <Feather name="eye" size={20} color="grey" />
                )}
              </TouchableOpacity>
            </View>
            {/* Password Error */}
            {form.password !== null && form.password.length < 5 && (
              <Text style={{ color: 'red' }}>
                Password must be at least 5 characters
              </Text>
            )}
          </View>

          {/* Confirm password Form */}
          <View style={styles.inputBottomContainer}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                autoCapitalize={'none'}
                autoFocus={false}
                placeholder={'Confirm Password'}
                placeholderTextColor="#8b8b8b"
                secureTextEntry={secureTextEntry.confirmPassword}
                onChangeText={(text) =>
                  setForm({ ...form, confirmPassword: text })
                }
                value={form.confirmPassword}
              />

              {/* Password Invisble/Visible Button */}
              <TouchableOpacity
                onPress={() => updateSecureTextEntry('confirmPassword')}
              >
                {secureTextEntry.confirmPassword ? (
                  <Feather name="eye-off" size={20} color="grey" />
                ) : (
                  <Feather name="eye" size={20} color="grey" />
                )}
              </TouchableOpacity>
            </View>
            {/* Confirm Password Error */}
            {form.password !== null &&
              form.password !== form.confirmPassword && (
                <Text style={{ color: 'red' }}>
                  Confirm password does not match
                </Text>
              )}
          </View>

          <View style={styles.buttonContainer}>
            {/* {!countDown && */}
            <TouchableOpacity
              // disabled={countDown ? true : false}
              style={styles.submitButton}
              onPress={() => submitNewPassword()}
            >
              <View>
                <Text style={{ fontSize: 18, color: '#FFF' }}>
                  Ganti Password
                </Text>
              </View>
            </TouchableOpacity>
            {/* } */}
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const dimension = Dimensions.get('screen');
const dimHeight = dimension.height;
const dimWidth = dimension.width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    height: dimHeight,
    width: dimWidth,
    flex: 1,
    paddingTop: dimHeight * 0.15,
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  headerText: {
    color: '#DDDDDD',
  },

  inputContainer: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 50,
    marginBottom: 20,
  },

  inputTopContainer: {
    paddingTop: 20,
    // paddingHorizontal: 10,
  },

  inputMiddleContainer: {
    paddingTop: 10,
    // paddingHorizontal: 10,
  },

  inputBottomContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    // paddingHorizontal: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: '#2F2F2F',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputText: {
    color: '#DDDDDD',
    width: '80%',
    height: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flex: 0.5,
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2F2F2F',
  },

  submitButton: {
    height: 50,
    width: '100%',
    backgroundColor: '#005ea2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  changePassword,
  changeAccountPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
