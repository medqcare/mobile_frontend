import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import Header from "../../../components/headers/GradientHeader";
import { connect } from "react-redux";
import PDFReader from "rn-pdf-reader-js";

const dimHeight = Dimensions.get("window").height;

function ShowDocument(props) {
  const { uri, name, base64, backTo, option } = props.navigation.state.params;

  const source = {};

  if (uri) {
    source.uri = uri;
  } else {
    source.base64 = base64;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={name.length > 20 ? name.slice(0, 20) + " ..." : name}
        navigate={props.navigation.navigate}
        navigateBack={backTo}
        option={option}
      />
      <PDFReader source={source} withPinchZoom={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDocument);
