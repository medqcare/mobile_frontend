import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoading: state.isLoading
})

function CardTag({ navigation, data }) {

  return (
    <View style={viewStyles.Container}>
      <Text style={{ fontSize: 15 }}>{data.SPESIALIS}</Text>
    </View>
  );
};


const viewStyles = StyleSheet.create({
  Container: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    backgroundColor: 'white',
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 15
  }
})


module.exports = connect(mapStateToProps)(CardTag);