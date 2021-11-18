import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const mapStateToProps = state => ({
  isLoading: state.isLoading
})

function CardArticle({ navigation, data }) {

  return (
    <TouchableOpacity style={viewStyle.card} >
      {
        data.url &&
        <Image
          style={ viewStyle.image }
          source={data.url}
        />
      }
      {
        !data.url &&
        <Image
          style={viewStyle.image}
          source={{ uri: "https://www.isteducation.com/wp-content/plugins/learnpress/assets/images/no-image.png" }}
        />
      }

    </TouchableOpacity>
  );
};

const viewStyle = StyleSheet.create({
  image: {
    width: wp('60%'),
    height: hp('20%'),
    resizeMode: 'stretch',
    borderRadius: 3
  },
  card: {
    width: wp('60%'),
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginRight: 10
  }
})

module.exports = connect(mapStateToProps)(CardArticle);