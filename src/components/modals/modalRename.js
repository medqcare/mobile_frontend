import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

export default function RenameModal({
  modal,
  optionLeftFunction,
  optionLeftText,
  optionRightFunction,
  optionRightText,
  warning,
  nameBefore,
  load,
}) {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(nameBefore);
  }, [nameBefore]);

  return (
    <Modal transparent={true} animationType={'slide'} visible={modal}>
      <View style={styles.container}>
        <View style={styles.base}>
          <View style={styles.confirmationCard}>
            <View>
              <Text style={styles.warningText}>{warning}</Text>
            </View>

            <View style={{ paddingHorizontal: 10, width: '100%' }}>
              <TextInput
                value={value}
                onChangeText={setValue}
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#B5B5B5',
                  width: '100%',
                  color: '#B5B5B5',
                  paddingHorizontal: 15,
                }}
              ></TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 10,
                minHeight: '15%',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  width: '50%',
                }}
                onPress={() => {
                  if (typeof optionLeftFunction === 'function') {
                    optionLeftFunction();
                  }
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#B5B5B5',
                  }}
                >
                  {optionLeftText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '50%',
                }}
                disabled={load}
                onPress={() => {
                  if (typeof optionRightFunction === 'function') {
                    optionRightFunction(value);
                  }
                }}
              >
                {load ? (
                  <ActivityIndicator
                    size={'small'}
                    color="#B5B5B5"
                    style={styles.optionTextConfirm}
                  />
                ) : (
                  <Text style={{ textAlign: 'center', color: '#EA2E05' }}>
                    {optionRightText}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const _width = Dimensions.get('screen').width;
const _height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  base: {
    width: _width * 0.6,
    height: _height * 0.23,
  },
  confirmationCard: {
    width: '100%',
    backgroundColor: '#2F2F2F',
    alignItems: 'center',
    borderRadius: 13,
    paddingVertical: 10,
    height: 150,
    justifyContent: 'space-between',
  },
  warning: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  warningText: {
    color: '#B5B5B5',
    fontWeight: 'bold',
  },
  option: {
    width: '100%',
    // paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButtonCancel: {
    width: '50%',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
  optionButtonConfirm: {
    width: '50%',
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 8,
  },
  optionTextCancel: {
    color: '#B5B5B5',
    textAlign: 'center',
  },
  optionTextConfirm: {
    color: '#EA2E05',
    textAlign: 'center',
  },
});
