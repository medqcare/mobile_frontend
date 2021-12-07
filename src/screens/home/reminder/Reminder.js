import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Header from "../../../components/headers/GradientHeader";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

export default function Reminder(props) {

  const data = null
  
  return (
    <View style={styles.container}>
      <Header title="Reminder" navigate={props.navigation.navigate} />
      <View style={styles.content}>
        {
          data ? (  
            <Text style={styles.textItem}>Ini datanya </Text>
          ) : (
            <Text style={styles.textItem}>Belum Ada Reminder</Text>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
  content: {
    height: dimHeight * 0.88,
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 20,
  },
  textItem: {
    color: "#B5B5B5",
  }
});
