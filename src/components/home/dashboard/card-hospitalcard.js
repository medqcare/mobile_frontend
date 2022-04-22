import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return state
}

const cardCard = (props) => {
    const { ID, NO_REKAM_MEDIS } = props.data
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/Card-Pattern.png')}
                style={{ position: 'absolute', right: 0, resizeMode: 'cover', width: "100%", height: '120%' }}
            />
            {
                props.data && <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.hospitalName}>{ID.NAMA_RS}</Text>
                    </View>
                    <View
                        style={{ borderStyle: 'dotted', borderTopColor: 'gray', borderTopWidth: 0.5, width: "100%", height: 1 }}
                    ></View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={styles.full_name} > {props.userData.firstName + ' ' + props.userData.lastName} </Text>
                        <Text style={styles.reg_number}> {NO_REKAM_MEDIS ? NO_REKAM_MEDIS : '-'} </Text>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: 180,
        height: 120,
        marginHorizontal: 5,
        borderRadius: 3,
        padding: 9,
        flexShrink: 1
    },
    hospitalName: {
        fontSize: 12,
        color: 'black'
    },
    full_name: {
        fontSize: 15,
        color: 'black'
    },
    reg_number: {
        fontSize: 10,
        color: 'gray',
        opacity: 0.9
    }
})

export default connect(mapStateToProps)(cardCard)
