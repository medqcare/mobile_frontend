import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { retrieveData } from '../../stores/action'
import axios from 'axios'
import StopOver from '../../components/stopoverRegist'

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = {
    retrieveData
}

const loadingCard = (props) => {
    // console.log(props.userData,'ini props is loginnya ya dari loadingCard.js')
    let token = null
    const _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem('token');
            if (value !== null) {
                props.retrieveData(value, props.navigation)
                // props.navigation.navigate('ProfileSwitch')
            }
            else {
                props.navigation.navigate('Sign')
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }

    async function fetchData() {
        token = await AsyncStorage.getItem('token');
        if (!token) {
            props.navigation.navigate('Sign')
        } else if (token && props.userData) {
            props.navigation.navigate('Card_landing')
        }
    }

    useEffect(() => {
        fetchData()
    }, [props.navigation.getParam('date')])

    return (
        <View>
            {!props.userData &&
                <StopOver navigation={props.navigation} />
            }
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(loadingCard)
