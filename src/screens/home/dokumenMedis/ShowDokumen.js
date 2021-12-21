import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from 'react-native-webview'
import Header from '../../../components/headers/GradientHeader'
import { connect } from "react-redux";
import PDFReader from 'rn-pdf-reader-js'

const dimHeight = Dimensions.get("window").height;

function ShowDocument(props) {
  const {uri, name} = props.navigation.state.params
  
  return (
    <View style={{flex: 1}}>
      <Header title={name.length > 20 ? name.slice(0,20) + ' ...' : name} navigate={props.navigation.navigate} navigateBack={'ListDokumenMedis'}/>
      <PDFReader
          source={{
            uri
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  }
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDocument);
