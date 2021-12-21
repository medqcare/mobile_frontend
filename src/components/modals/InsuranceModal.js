import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";

import Vector from "../../assets/svg/Vector";

const INSURANCES = [{ name: "Umum" }, { name: "BPJS" }, { name: "Asuransi" }];

export default function InsuranceModal({
  isVisible,
  onInsuranceSelected,
  setIsVisible,
}) {
  const onPressHandler = (insuranceName) => {
    if (typeof onInsuranceSelected === "function") {
      onInsuranceSelected(insuranceName);
    }
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={"down"}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
      onSwipeComplete={() => setIsVisible(false)}
      animationType="slide"
    >
      <View style={viewModalP.container}>
        <View style={viewModalP.header}>
          <View style={viewModalP.toogle} />
          <Text style={viewModalP.title}>Pilih Insurance</Text>
        </View>
        <View style={viewModalP.patient}>
          {INSURANCES.map((insurance) => (
            <TouchableOpacity
              onPress={() => onPressHandler(insurance.name)}
              key={`${insurance.name}-type`}
            >
              <View style={viewModalP.cardName}>
                <View style={viewModalP.familyName}>
                  <Text style={viewModalP.name}>{insurance.name}</Text>
                </View>
                <View style={viewModalP.vector}>
                  <Vector />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const viewModalP = StyleSheet.create({
  container: {
    maxHeight: "100%",
    backgroundColor: "#2F2F2F",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toogle: {
    position: "absolute",
    borderWidth: 2,
    width: 50,
    borderColor: "#6C6C6C",
    alignContent: "center",
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
  },
  patient: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  titleP: {
    color: "white",
    fontSize: 12,
  },
  cardName: {
    marginTop: 10,
    borderColor: "#757575",
    borderWidth: 1,
    borderRadius: 3,
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  familyName: {
    flexDirection: "row",
  },
  photo: {
    marginVertical: 7,
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#4fe39b",
  },
  name: {
    marginTop: 15,
    marginLeft: 15,
    color: "#DDDDDD",
  },
  vector: {
    marginVertical: 20,
  },
  buttonAdd: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  vectorPlus: {
    marginTop: 5,
    marginRight: 5,
  },
  addTitle: {
    color: "#4398D1",
  },
});
