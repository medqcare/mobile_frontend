import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import Header from "../../../components/headers/GradientHeader";
import SearchBar from "../../../components/headers/SearchBar";
import { formatNumberToRupiah } from "../../../helpers/formatRupiah";
import RightArrow from "../../../assets/svg/RightArrow";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;
const DUMMIES = [
  {
    name: "darah",
    id: 1,
    items: [
      {
        itemName: "A",
        itemPrice: 10000,
      },
      {
        itemName: "B",
        itemPrice: 50000,
      },
      {
        itemName: "C",
        itemPrice: 15000,
      },
      {
        itemName: "D",
        itemPrice: 10000,
      },
    ],
  },
  {
    name: "urine",
    id: 2,
    items: [
      {
        itemName: "E",
        itemPrice: 10000,
      },
      {
        itemName: "F",
        itemPrice: 15000,
      },
      {
        itemName: "G",
        itemPrice: 15000,
      },
      {
        itemName: "H",
        itemPrice: 10000,
      },
    ],
  },
  {
    name: "cairan cerebrospinal",
    id: 3,
    items: [
      {
        itemName: "J",
        itemPrice: 10000,
      },
      {
        itemName: "K",
        itemPrice: 15000,
      },
      {
        itemName: "L",
        itemPrice: 15000,
      },
      {
        itemName: "M",
        itemPrice: 10000,
      },
    ],
  },
  {
    name: "tinja",
    id: 4,
    items: [
      {
        itemName: "N",
        itemPrice: 10000,
      },
      {
        itemName: "O",
        itemPrice: 15000,
      },
      {
        itemName: "O",
        itemPrice: 15000,
      },
      {
        itemName: "P",
        itemPrice: 10000,
      },
    ],
  },
  {
    name: "air mani",
    id: 5,
    items: [
      {
        itemName: "Q",
        itemPrice: 10000,
      },
      {
        itemName: "R",
        itemPrice: 15000,
      },
      {
        itemName: "S",
        itemPrice: 15000,
      },
      {
        itemName: "T",
        itemPrice: 10000,
      },
    ],
  },
  {
    name: "dahak",
    id: 6,
    items: [
      {
        itemName: "U",
        itemPrice: 10000,
      },
      {
        itemName: "V",
        itemPrice: 15000,
      },
      {
        itemName: "W",
        itemPrice: 15000,
      },
      {
        itemName: "X",
        itemPrice: 10000,
      },
    ],
  },
  {
    name: "kerokan kulit",
    id: 7,
    items: [
      {
        itemName: "Y",
        itemPrice: 50000,
      },
      {
        itemName: "Z",
        itemPrice: 10000,
      },
    ],
  },
  {
    name: "swab nasofaring",
    id: 8,
    items: [
      {
        itemName: "Warna",
        itemPrice: 10000,
      },
      {
        itemName: "Kejernihan",
        itemPrice: 15000,
      },
      {
        itemName: "Berat Jenis",
        itemPrice: 15000,
      },
      {
        itemName: "PH",
        itemPrice: 10000,
      },
    ],
  },
];

export default function PenunjangList(props) {
  const [speciments, setSpeciments] = useState(DUMMIES);
  const [selectedSpeciment, setSelectedSpeciment] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const PPN = totalPrice * (10 / 100);
  useEffect(() => {
    const specimentsWithSelectedValue = speciments.map((element, index) => {
      if (index === 0) {
        element.selected = true; // default selected
        setSelectedSpeciment(element);
      } else {
        element.selected = false;
      }
      return element;
    });
    setSpeciments(specimentsWithSelectedValue);
  }, []);

  const specimentStyleBehavior = (speciment) => ({
    container: {
      backgroundColor: speciment.selected ? "#212D3D" : "#2F2F2F",
      borderWidth: 1,
      borderColor: speciment.selected ? "#77BFF4" : "transparent",
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
        speciment.selected = true;
        setSelectedSpeciment(speciment);
      } else {
        speciment.selected = false;
      }
      return speciment;
    });
    setSpeciments(newSpeciments);
  };

  const onSpecimentItemSelected = (itemName) => {
    const newSpeciments = speciments.map((element) => {
      if (selectedSpeciment.id === element.id) {
        const index = selectedSpeciment.items.findIndex(
          (item) => item.itemName === itemName
        );
        const status = selectedSpeciment.items[index].selected;
        const itemPrice = selectedSpeciment.items[index].itemPrice;
        if (status === true) {
          selectedSpeciment.items[index].selected = false;
          setTotalPrice(totalPrice - itemPrice);
        } else {
          selectedSpeciment.items[index].selected = true;
          setTotalPrice(totalPrice + itemPrice);
        }
      }
      return element;
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

  console.log(selectedSpeciment, ">>>>");

  return (
    <>
      <ScrollView style={styles.container}>
        <SearchBar placeholder="Cari test atau sampel" />
        <View style={styles.specimentContainer}>
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
        <ScrollView
          style={styles.specimentItemContainer}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        >
          {selectedSpeciment?.items.map((item, index) => (
            <View
              style={styles.specimentItemSection}
              key={`speciment-item-${index}`}
            >
              <Text style={styles.specimentItemText}>{item.itemName}</Text>
              <Checkbox
                value={item.selected}
                color={item.selected ? "#017EF9" : null}
                onValueChange={() => onSpecimentItemSelected(item.itemName)}
              />
            </View>
          ))}
        </ScrollView>
        {totalPrice !== 0 ? (
          <View style={styles.priceSection}>
            <ScrollView style={styles.costDetailContainer}>
              <Text style={styles.costTitle}>Perkiraan Biaya</Text>
              <View style={styles.costDetailSectionContainer}>
                {speciments.map((speciment) => {
                  const { items } = speciment;
                  const selectedItems = items.map((item) => {
                    if (item.selected === true) {
                      return (
                        <View
                          style={styles.costDetailSection}
                          key={`cost-${speciment.name}-${item.itemName}`}
                        >
                          <Text
                            style={styles.costText}
                          >{`Cek ${item.itemName} ${speciment.name}`}</Text>
                          <Text style={styles.costText}>
                            {formatNumberToRupiah(item.itemPrice)}
                          </Text>
                        </View>
                      );
                    }
                  });
                  return selectedItems;
                })}
                <View style={styles.costDetailSection}>
                  <Text style={{ color: "#B5B5B5" }}>{`PPN`}</Text>
                  <Text style={styles.costText}>
                    {formatNumberToRupiah(PPN)}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.subTotalContainer}>
              <Text style={styles.subTotalTitle}>Sub Total</Text>
              <Text style={styles.subTotalPriceText}>
                {formatNumberToRupiah(totalPrice + PPN)}
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingVertical: 10,
          transform: [{ translateX: 12 }],
        }}
      >
        <TouchableOpacity style={styles.buttonWithIcon}>
          <Text style={styles.buttonWithIconLabel}>Lanjutkan</Text>
          {/* {load ? (
              <ActivityIndicator size={"small"} color="#FFF" />
            ) : (
              )} */}
          <RightArrow />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: "relative",
  },
  title: {
    color: "#DDDDDD",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  specimentContainer: {
    marginBottom: 12,
  },
  specimentItemContainer: {
    backgroundColor: "#2F2F2F",
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 12,
    height: 250,
    marginBottom: 12,
  },
  specimentItemSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#474747",
    paddingBottom: 14,
    marginBottom: 12,
  },
  specimentItemText: {
    fontSize: 16,
    color: "#DDDDDD",
    maxWidth: "70%",
  },
  priceSection: {
    marginBottom: 14,
  },
  itemSection: {
    marginBottom: 12,
    // maxHeight: 250,
  },
  costDetailContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#474747",
    borderRadius: 4,
    maxHeight: 150,
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  costDetailSectionContainer: {
    paddingBottom: 18,
  },
  costDetailSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  costText: {
    fontSize: 14,
    textTransform: "capitalize",
    color: "#B5B5B5",
  },
  costTitle: {
    color: "#F37335",
    textTransform: "uppercase",
    marginBottom: 10,
    fontSize: 12,
  },
  subTotalContainer: {
    alignSelf: "flex-end",
  },
  subTotalTitle: {
    color: "#B5B5B5",
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 6,
    textAlign: "right",
  },
  subTotalPriceText: {
    color: "#DDDDDD",
    fontSize: 16,
    textAlign: "right",
  },
  buttonWithIcon: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#005EA2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: "100%",
  },
  buttonWithIconLabel: {
    color: "#DDDDDD",
    textTransform: "capitalize",
    marginRight: 10,
    fontSize: 14,
  },
});
