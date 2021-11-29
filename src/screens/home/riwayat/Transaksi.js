import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

function Transaksi(props) {
    return (
        <View>
            <Text style={{color: '#fff'}}>Ini riwayat Transaksi</Text>
        </View>
    )
}



const mapStateToProps = (state) => {
    return state;
  };
  
  const mapDispatchToProps = {
  };

export default connect(mapStateToProps, mapDispatchToProps)(Transaksi);