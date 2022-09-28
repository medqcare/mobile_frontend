import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Search from '../../assets/svg/Search';

export default function SearchBar({ onChangeText, onFocus, placeholder, autoFocus, darkMode }) {
  return (
    <View style={styles.container}>
      <View style={styles.searcharea}>
        <View
          style={{
            transform: [{ translateY: 1 }],
          }}
        >
          <Search />
        </View>
        <TextInput
          style={darkMode ? styles.textinput : styles.textinputLight}
          placeholder={placeholder}
          placeholderTextColor="#A2A2A2"
          onChangeText={onChangeText || null}
          onFocus={onFocus || null}
          autoFocus={autoFocus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  searcharea: {
    borderColor: '#DDDDDD',
    borderWidth: 0.5,
    height: 40,
    marginTop: 17,
    borderRadius: 25,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  textinput: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: '#A2A2A2',
    width: '100%',
  },

  textinputLight: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: '#FFFFFF',
    width: '100%',
  },
});
