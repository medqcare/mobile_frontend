import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ImageBackground
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import IcShare from "../../assets/svg/ic_share"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from './SearchBar'
import ArrowBack from '../../assets/svg/ArrowBack'
import FilterIcon from '../../assets/svg/ic_filter'

export default function GradientSearchBarHeader({
    navigate,
    navigateBack = "Home",
    title = "Enter Title Here",
    placeholder,
    option,
    searchFunction
}) {
    const start = {
        x: 0,
        y: 0,
    };
    
    const end = {
        x: 1,
        y: 0,
    };
    
    const colors = ["#073B88", "#048FBB"];

    return (
        <View>
            <StatusBar
                barStyle="light-content"
                translucent={true}
                backgroundColor={"transparent"}
                // hidden
            />
            <View style={{ height: hp('18%') }}>
                <ImageBackground
                    source={require('../../assets/background/RectangleHeader.png')}
                    style={{
                        flex: 1,
                        paddingTop: hp('5%'),
                    }}
                >
                    <View style={{ marginHorizontal: 20, flex: 1 }}>
                        <TouchableOpacity onPress={() => navigate()}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginTop: 3 }}>
                                <ArrowBack />
                            </View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#ffff',
                                    // position: 'relative',
                                    marginLeft: 10,
                                }}
                            >
                                {title}
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: wp('85%')}}>
                                <SearchBar
                                    placeholder={placeholder}
                                    onChangeText={(text) => searchFunction(text)}
                                />
                            </View>
                            {/* <TouchableOpacity 
                                onPress={() => console.log('filter')}
                                style={{justifyContent: "center", paddingLeft: wp('2%')}}
                            >    
                                <FilterIcon/>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        height: hp("11%"),
    },
  
    innerContainer: {
        flex: 1,
        position: "relative",
        paddingTop: 25,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between"
    },
  
    content: {
        flexDirection: "row",
        marginBottom: 10,
    },
  
    backArrow: {
        paddingHorizontal: 17.64,
    },
  
    iconShare: {
        padding: 10,
        marginTop: -10,
        marginRight: 8,
        borderRadius: 20
    },
  
    text: {
        fontSize: 20,
        color: "#ffff",
        position: "relative",
    },
});