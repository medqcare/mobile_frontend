import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Dimensions, StatusBar, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons'
import SearchIcon from '../../../assets/svg/Search'
import DokumenList from "./DokumenList";

const dimHeight = Dimensions.get("window").height;

function DokumenMedisList(props) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={"transparent"}
      />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => props.navigation.pop()}
          style={styles.arrow}>
          <Ionicons 
              name="arrow-back" 
              color="#fff" 
              size={25} 
              style={styles.backArrow} 
          />
        </TouchableOpacity>
        <View style={styles.searchArea}>
          <View >
            <SearchIcon />
          </View>
          <TextInput
            style={styles.textinput}
            placeholder='Cari Dokumen'
            placeholderTextColor='#A2A2A2'
          />
          <Image
              style={{
                height: dimHeight * 0.04,
                width: dimHeight * 0.04,
                resizeMode: 'stretch',
              }}
              source={require('../../../assets/png/Profil.png')}
            />
        </View>
      </View>
      <DokumenList navigation={props.navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
  header: {
    flexDirection: 'row',
    height: dimHeight * 0.12,
    paddingTop: dimHeight * 0.045,
    backgroundColor: "#2F2F2F",
  },
  arrow: {
    flex: 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchArea: {
    flex: 0.88,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    height: dimHeight * 0.05,
    padding: dimHeight * 0.01,
    margin: dimHeight * 0.01,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    marginStart: 10,
    fontSize: 14,
    flex: 1,
    color: "#A2A2A2",
  }
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DokumenMedisList);
