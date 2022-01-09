import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Search from "../../assets/svg/Search";
import { Ionicons } from "@expo/vector-icons";
import IcFilter from "../../assets/svg/Filter";

export default function ClearableSearchBar({
  navigate,
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
      <TouchableOpacity style={styles.content} onPress={() => navigate('Home')}>
        <Ionicons
          name="arrow-back"
          color="#fff"
          size={25}
          style={styles.backArrow}
        />
      </TouchableOpacity>
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
      {/* <View style={{ marginTop: 28 }}>
        <IcFilter />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  content: {
    height: 40,
    marginTop: 20,
    borderRadius: 40,
    flexDirection: "row",
    width: '10%',
    alignItems: "center",
    justifyContent: "space-between",
  },

  searcharea: {
    borderColor: "#DDDDDD",
    borderWidth: 0.5,
    height: 40,
    marginTop: 20,
    borderRadius: 25,
    flexDirection: "row",
    width: "88%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  textinput: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: "#A2A2A2",
    width: "100%",
  },
});
