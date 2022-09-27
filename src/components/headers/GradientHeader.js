import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import IcShare from "../../assets/svg/ic_share"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function GradientHeader({
  navigate,
  navigateBack = "Home",
  title = "Enter Title Here",
  params,
  option,
  darkMode
}) {
  const start = {
    x: 1,
    y: 0,
  };

  const end = {
    x: 0,
    y: 0,
  };

  const colors = darkMode ? ["#073B88", "#048FBB"] : ['#005EA2', '#009292'];

  return (
    <LinearGradient
      start={start}
      end={end}
      colors={colors}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={"transparent"}
        // hidden
      />
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigate(navigateBack, params)}>
          <View style={styles.content}>
              <Ionicons
                name="arrow-back"
                color="#fff"
                size={25}
                style={styles.backArrow}
              />
              <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
        {option?.name === "share" && (
            <TouchableOpacity onPress={() => option.action()}>
              <View style={styles.iconShare}>
                <IcShare />
              </View>
            </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp("11%"),
  },

  innerContainer: {
    flex: 1,
    position: "relative",
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between"
  },

  content: {
    flexDirection: "row",
    marginBottom: 10,
  },

  backArrow: {
    paddingHorizontal: 17.64,
  },

  iconShare: {
    padding: 10,
    marginTop: -10,
    marginRight: 8,
    borderRadius: 20
  },

  text: {
    fontSize: 20,
    color: "#ffff",
    position: "relative",
  },
});
