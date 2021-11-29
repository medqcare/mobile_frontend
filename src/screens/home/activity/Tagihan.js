import React, { useState, useEffect } from "react";
import { Text, View, StatusBar } from "react-native";
import { connect } from "react-redux";
import Header from '../../../components/headers/GradientHeader'

function Tagihan(props) {
    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>
        <StatusBar hidden />
        <Header title='Detail Transaksi' navigate={props.navigation.navigate} navigateBack='Home' />
            <Text style={{color: '#F37335'}}>Ini halaman tagihan</Text>
        </View>
    )
}



const mapStateToProps = (state) => {
    return state;
  };
  
  const mapDispatchToProps = {
  };

export default connect(mapStateToProps, mapDispatchToProps)(Tagihan);