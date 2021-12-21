import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Search from "../../assets/svg/Search";
import IcFilter from "../../assets/svg/Filter";
import { Ionicons } from "@expo/vector-icons";

export default function ClearableSearchBar({
  onChangeText,
  onFocus,
  placeholder,
  setSearch,
}) {
  const input = useRef(null);

  const clearSearchHandler = () => {
    input.current.clear();
    input.current.focus();
    setSearch("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searcharea}>
        <Search />
        <TextInput
          style={styles.textinput}
          placeholder={placeholder}
          placeholderTextColor="#A2A2A2"
          onChangeText={onChangeText || null}
          onFocus={onFocus || null}
          ref={input}
        />
        <TouchableOpacity onPress={() => clearSearchHandler()}>
          <Ionicons name="close" size={24} color="#888888" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 28 }}>
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
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  textinput: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: "#A2A2A2",
    // borderColor: "red",
    // borderWidth: 1,
    width: "100%",
  },
});
