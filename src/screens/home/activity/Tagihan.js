import React, { useState, useEffect } from "react";
import { Text, View, StatusBar } from "react-native";
import { connect } from "react-redux";
import Header from '../../../components/headers/GradientHeader'

function Tagihan(props) {
    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>
        <StatusBar hidden />
        <Header title='Detail Transaksi' navigate={props.navigation.navigate} navigateBack='Home' />
            <View style={{alignItems: 'center', marginTop: 25}}>
                <Text style={{color: '#fff'}}>Belum ada tagihan</Text>
            </View>
        </View>
    )
}



const mapStateToProps = (state) => {
    return state;
  };
  
  const mapDispatchToProps = {
  };

export default connect(mapStateToProps, mapDispatchToProps)(Tagihan);