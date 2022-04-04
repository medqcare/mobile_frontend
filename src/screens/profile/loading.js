import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = {
}

const loading = (props) => {
    // console.log(props.userData,'ini props is loginnya ya dari loading.js')
    // let navigationTo = props.navigation.state.params.data
    const [error, setError] = useState(false)
    const _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('token');
            if (value !== null) {
                props.retrieveData(value, props.navigation)
                // props.navigation.navigate('RegistrationUser')
            }
            else {
                props.navigation.navigate('Sign')
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
            setError(true)
        }
    }

    // useEffect(() => {
    //     try {
    //         if (props.userData) {
    //             props.navigation.navigate(`${props.navigation.state.params.data}`)
    //         } else {
    //             _retrieveData()
    //         }
    //     } catch (error) {
    //         console.log(error, 'diloading')
    //         setError(true)
    //     }
    // }, [new Date()])

    return (
        <View style={{ justifyContent: 'center', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {error ?
                <Text>Please try again letter</Text> :
                <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
                    <ActivityIndicator size='large' color={'blue'} />
                </View>
            }
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(loading)
