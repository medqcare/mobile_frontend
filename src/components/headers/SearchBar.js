import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Search from '../../assets/svg/Search';
import IcFilter from '../../assets/svg/Filter'

export default function GradientHeader({ onChangeText, onFocus, placeholder }) {

  return (
    <View style={styles.container}>
      <View style={styles.searcharea}>
        <View style={{ marginTop: 12, marginLeft: 20 }}>
          <Search />
        </View>

        <TextInput
          style={styles.textinput}
          placeholder={placeholder}
          placeholderTextColor="#A2A2A2"
          onChangeText={onChangeText || null}
          onFocus={onFocus || null}
        />
      </View>
      <View style={{ marginTop: 28 }} >
        <IcFilter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  searcharea: {
    borderColor: "#DDDDDD",
    borderWidth: 0.5,
    height: 40,
    marginTop: 20,
    borderRadius: 25,
    flexDirection: "row",
    width: "90%",
  },

  textinput: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: "#A2A2A2",
  }
});
