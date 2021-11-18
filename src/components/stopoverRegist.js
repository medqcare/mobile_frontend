import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

const StopOverRegist = ({navigation}) => {
    console.log(navigation, 'ini props di stopOver')
    return (
        <View style={{ height:'100%', width:'100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Silahkan Registrasi Terlebih Dulu</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Sign')}
                    style={{ marginHorizontal: 10 }}>
                    <Text>Sign</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('RegistrationUser')}>
                    <Text>Lanjutkan</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return state
}
export default connect(mapStateToProps)(StopOverRegist)