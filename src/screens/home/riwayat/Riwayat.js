import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import SearchBar from "../../../components/headers/SearchBar";
import ArrowBack from "../../../assets/svg/ArrowBack";

import Pemesanan from "./Pemesanan";
import Transaksi from "./Transaksi";

function RiwayatPage(props) {
  const [page, setPage] = useState("Pemesanan");
  const tipeRiwayat = ["Pemesanan", "Transaksi"];

  BackHandler.addEventListener("hardwareBackPress", () => {
    return props.navigation.pop();
  });

  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior="height"
      enabled={false}
    >
      <StatusBar hidden />

      {/* Header */}
      <View style={{ height: "15%" }}>
        <ImageBackground
          source={require("../../../assets/background/RectangleHeader.png")}
          style={{ flex: 1 }}
        >
          <View style={{ marginTop: 20, marginHorizontal: 20, flex: 1 }}>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginTop: 3 }}>
                  <ArrowBack />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#ffff",
                    position: "relative",
                    marginLeft: 10,
                  }}
                >
                  Riwayat {page}
                </Text>
              </View>
            </TouchableOpacity>
            <SearchBar
              placeholder={"cari riwayat"}
              onChangeText={(text) => _textChange(text)}
            />
          </View>
        </ImageBackground>
      </View>


      <View style={{ height: 40, margin: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tipeRiwayat.map((item) => {
            return (
              <TouchableOpacity onPress={() => setPage(item)} key={item}>
                <View
                  style={{
                    backgroundColor: item === page ? "#005EA2" : null,
                    borderRadius: 30,
                    borderWidth: item !== page ? 1 : null,
                    borderColor: item !== page ? "#DDDDDD" : null,
                    height: 40,
                    padding: 10,
                    marginRight: 5,
                  }}
                >
                  <Text style={{ color: "#DDDDDD" }}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      { page === 'Pemesanan' && <Pemesanan /> }
      { page === 'Transaksi' && <Transaksi /> }
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 0,
    marginTop: 0,
    flex: 1,
    backgroundColor: "#181818",
  },
  Icon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "20%",
    marginBottom: "10%",
  },
  HeaderBar: {
    minHeight: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3c9d9b",
    padding: 5,
  },
  SearchBar: {
    padding: 10,
    minWidth: "100%",
  },
  Category: {
    borderStyle: "solid",
    borderWidth: 0.7,
    borderColor: "gray",
    backgroundColor: "#fff",
    minHeight: "10%",
    marginBottom: "10%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingTop: "5%",
  },
  searchBar: {
    borderColor: "#DDDDDD",
    borderWidth: 0.8,
    padding: 5,
    height: 50,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 25,
    flexDirection: "row",
    width: "90%",
  },
  containerBottom: {
    flexDirection: "row",
    width: "100%",
    borderTopColor: "#DCD6D6",
    borderTopWidth: 1,
    backgroundColor: "#FFF",
  },
  filterBottom: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RiwayatPage);
