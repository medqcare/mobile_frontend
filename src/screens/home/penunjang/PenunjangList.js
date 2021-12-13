import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../../../components/headers/GradientHeader";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;
const DUMMIES = [
  {
    name: "darah",
    id: 1,
  },
  {
    name: "urine",
    id: 2,
  },
  {
    name: "cairan cerebrospinal",
    id: 3,
  },
  {
    name: "tinja",
    id: 4,
  },
  {
    name: "air mani",
    id: 5,
  },
  {
    name: "dahak",
    id: 6,
  },
  {
    name: "kerokan kulit",
    id: 7,
  },
  {
    name: "swab nasofaring",
    id: 8,
  },
];
export default function PenunjangList(props) {
  const [speciments, setSpeciments] = useState(DUMMIES);
  const specimentStyleBehavior = (speciment) => ({
    container: {
      backgroundColor: speciment.selected ? "#212D3D" : "#2F2F2F",
      borderWidth: 1,
      borderColor: "#2F2F2F",
      padding: 10,
      borderRadius: 4,
      alignSelf: "flex-start",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 6,
    },
    text: {
      color: speciment.selected ? "#77BFF4" : "#B5B5B5",
      fontSize: 14,
      textTransform: "capitalize",
    },
  });

  const onSpecimentPressedHandler = (id) => {
    const newSpeciments = speciments.map((speciment) => {
      if (speciment.id === id) {
        speciment.selected = !speciment.selected;
      }
      return speciment;
    });
    setSpeciments(newSpeciments);
  };

  const renderItem = ({ item }) => {
    const { container, text } = specimentStyleBehavior(item);
    return (
      <TouchableOpacity
        style={container}
        onPress={() => onSpecimentPressedHandler(item.id)}
      >
        <Text style={text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header title="Penunjang" navigate={props.navigation.navigate} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>pilih kategori</Text>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={speciments}
              renderItem={renderItem}
              keyExtractor={(_, index) => `${index}-speciment`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    padding: 16,
  },
  title: {
    color: "#DDDDDD",
    textTransform: "uppercase",
    marginBottom: 14,
  },
});
