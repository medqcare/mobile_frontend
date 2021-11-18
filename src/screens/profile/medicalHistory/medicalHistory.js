import React, { Component, useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity
} from "react-native";

const MyComponent = () => {

    const [slideUpValue, setSlideUp] = useState(new Animated.Value(0))
    _startAnimated = () => {
        return Animated.parallel([
            Animated.timing(slideUpValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    };

    useEffect(() => {
        _startAnimated()
    }, [])

    return (
        <View style={{flex: 1}}>
            <Animated.View
                style={{
                    transform: [
                        {
                            translateX: slideUpValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [600, 0]
                            })
                        }
                    ],
                    flex: 1,
                    backgroundColor: "#c00",
                    justifyContent: "center"
                }}
            >
                <Text style={styles.text}>SlideUp </Text>
            </Animated.View>
            <Animated.View
                style={{
                    transform: [
                        {
                            translateX: slideUpValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-600, 0]
                            })
                        }
                    ],
                    flex: 1,
                    backgroundColor: "#c88",
                    justifyContent: "center"
                }}
            >
                <Text style={styles.text}>SlideUp </Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center"
    },
    item: {},
    btn: {
        backgroundColor: "#480032",
        width: 100,
        height: 40,
        padding: 3,
        justifyContent: "center",
        borderRadius: 6,
        marginTop: 29
    },
    text: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    item1: {
        backgroundColor: "red",
        padding: 20,
        width: 100,
        margin: 10
    },

    textBtn: {
        color: "#f4f4f4",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default MyComponent