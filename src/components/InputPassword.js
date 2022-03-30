import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {
  BLUE_PRIMARY,
  GREY_BORDER_LINE,
  RED_400,
  RED_500,
  WHITE_PRIMARY,
} from '../values/color';
import Feather from 'react-native-vector-icons/Feather';
import { INTER_600 } from '../values/font';

export default function InputPassword({
  visible = true,
  value = '',
  onChangeText,
  placeholder = 'Kata Sandi',
  onEyeIconPressed,
  isInputError = false,
}) {
  const borderStyleHandler = () => {
    if (value.length === 0) {
      return styles.inputWrapperNormal;
    }

    if (isInputError) {
      return styles.inputWrapperError;
    }

    return styles.inputWrapperSuccess;
  };

  return (
    <View
      style={[
        styles.inputWrapper,
        // value.length === 0 ? styles.inputWrapperNormal : null,
        // isInputError && value.length !== 0 ? styles.inputWrapperError : styles.inputWrapperSuccess,
        borderStyleHandler(),
      ]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={WHITE_PRIMARY}
        value={value}
        onChangeText={(text) => {
          if (typeof onChangeText === 'function') {
            onChangeText(text);
          }
        }}
        style={[styles.inputContainer, styles.inputText]}
        secureTextEntry={!visible}
      />

      <TouchableOpacity
        onPress={() => {
          if (typeof onEyeIconPressed === 'function') {
            onEyeIconPressed();
          }
        }}
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        {!visible ? (
          <Feather name="eye-off" size={20} color="grey" />
        ) : (
          <Feather name="eye" size={20} color="grey" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 12,
  },
  inputWrapperNormal: {
    borderColor: GREY_BORDER_LINE,
  },
  inputWrapperError: {
    borderColor: RED_500,
  },
  inputWrapperSuccess: {
    borderColor: '#61d800',
  },
  inputContainer: {
    width: '85%',
    paddingVertical: 8,
  },
  inputText: {
    color: WHITE_PRIMARY,
    fontSize: 16,
    fontFamily: INTER_600,
  },
});
