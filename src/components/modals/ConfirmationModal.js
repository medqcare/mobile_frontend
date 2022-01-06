import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function ConfirmationModal({
  modal,
  optionLeftFunction,
  optionLeftText,
  optionRightFunction,
  optionRightText,
  warning,
  load,
}) {
  return (
    <Modal transparent={true} animationType={'slide'} visible={modal}>
      <View style={styles.container}>
        <View style={styles.base}>
          <View style={styles.confirmationCard}>
            <View style={styles.warning}>
              <Text style={styles.warningText}>{warning}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 10,
                minHeight: '15%',
                alignItems: 'center',
                marginTop: 20,
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
    justifyContent: 'center',
    borderRadius: 13,
    paddingTop: 24,
    paddingBottom: 12,
  },
  warning: {
    width: '80%',
  },
  warningText: {
    color: '#DDDDDD',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 30,
  },
  optionButtonCancel: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  optionButtonConfirm: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  optionTextCancel: {
    color: '#B5B5B5',
  },
  optionTextConfirm: {
    color: '#EA2E05',
  },
});
