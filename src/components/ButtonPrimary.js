import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BLUE_PRIMARY, GREY_SECONDARY, WHITE_PRIMARY } from '../values/color';
import { INTER_500 } from '../values/font';
export default function ButtonPrimary({ label, onPress, isActive = false, loading }) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        isActive ? styles.buttonActive : styles.buttonInActive,
      ]}
      disabled={isActive === false}
      onPress={() => typeof onPress === "function" ? onPress() : null}
    >
      {loading ? (
        <ActivityIndicator size={'small'} color={WHITE_PRIMARY} />
      ) : (
        <Text style={styles.buttonLabel}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    letterSpacing: 1
  },
});
