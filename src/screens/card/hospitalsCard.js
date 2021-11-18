import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import QRCode from 'react-native-qrcode-svg'

const hospitalsCard = (props) => {
    const [historyTogle, setHistoryTogle] = useState(false)
    const [dummy, setDummy] = useState(['hello', 'saya', 'mayuko', 'nama', 'kamu', 'siapa', 'emang', 'kalo', 'boleh', 'tau'])

    // console.log(props.navigation.state.params, 'ini props yang dari card landing+_+_+_+__+_')
    let dataWanted = props.navigation.state.params

    props.navigation.state.params.dummy = dummy
    // console.log(props.navigation.state.params)

    return (
        <View style={style.container}>
            <View style={style.card}>
                {
                    dataWanted.regHos.NO_REKAM_MEDIS !== null && <View>
                        <View style={style.top}>
                            <View >
                                <Text style={style.topLeft}>{dataWanted.regHos.ID.NAMA_RS}</Text>
                                <Text style={style.topLeftTitle}>{dataWanted.regHos.ID.ALAMAT}</Text>
                            </View>
                        </View>
                        <View style={style.bottom}>
                            <View style={style.bottomLeft}>
                                <Text style={style.userName}> {dataWanted.patient.name} </Text>
                                <Text style={style.userNo}> {dataWanted.regHos.NO_REKAM_MEDIS !== null ? dataWanted.regHos.NO_REKAM_MEDIS : '----'} </Text>
                            </View>
                            <View style={style.bottomRight}>
                                {/* <View> */}
                                <Text></Text>
                            </View>
                        </View>
                    </View>
                }
                {
                    dataWanted.regHos.NO_REKAM_MEDIS == null && <View style={{ alignSelf: 'center', marginTop : '5%', justifyContent: 'center', alignItems: 'center' }}>
                        <QRCode
                            size={120}
                            value={JSON.stringify({
                                data: dataWanted.patient.id
                            })}
                        />
                        <Text> </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>To get your medical record number please scan this barcode at hospital</Text>
                    </View>
                }

            </View>

            <TouchableOpacity
                onPress={() => {
                    setHistoryTogle(!historyTogle)
                }}>
                <View style={historyTogle ? { ...style.history, borderBottomStartRadius: 0, borderBottomEndRadius: 0 } : style.history}>
                    <Text style={textStyle.historyButtonText}> History</Text>
                    <Icon
                        name={historyTogle ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={'#3C9D9B'}
                        style={textStyle.chevronRight}
                    />
                </View>
            </TouchableOpacity>
            {
                historyTogle ? (
                    <ScrollView style={viewStyle.scrollView}>
                        {
                            dummy.map((dumdum, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            console.log('pencet detail historynya')
                                            props.navigation.navigate('HospitalDetail', {
                                                data: props.navigation.state.params
                                            })
                                        }}>
                                        <View style={index === dummy.length - 1 ? { ...style.historytrue, borderBottomStartRadius: 13, borderBottomEndRadius: 13, marginBottom: 25 } : style.historytrue}>
                                            <Text>History {dumdum} </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                ) : (
                        <View></View>
                    )
            }
            {/* <TouchableOpacity 
            onPress={() => {
                console.log('hehe ke detail dooong')
                props.navigation.navigate('HospitalDetail')
            }}
            style={style.button}>
                <Text>Ke Detail</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const viewStyle = StyleSheet.create({
    scrollView: {
        maxHeight: hp('35%')
    }
})
const textStyle = StyleSheet.create({
    chevronRight: {
        marginHorizontal: 10
    },
    historyButtonText: {
        color: '#3C9D9B',
        fontWeight: 'bold'
    }
})
const style = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        minHeight: '100%',
        alignItems: 'center'
    },
    card: {
        width: wp('90%'),
        height: hp('30%'),
        backgroundColor: 'steelblue',
        borderRadius: 13,
        marginTop: 19,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        padding: 10,
        justifyContent: 'space-between'
    },
    history: {
        width: wp('85%'),
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        fontWeight: 'bold',
        borderRadius: 13,
        marginBottom: 2,
        flexDirection: 'row'
    },
    historyfalse: {
        width: wp('85%'),
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 25,
        fontWeight: 'bold',
        marginVertical: 20,
        borderRadius: 13,
    },
    historytrue: {
        width: wp('85%'),
        minHeight: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 25,
        fontWeight: 'bold',
        borderRadius: 0,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%',
        marginHorizontal: '2%'
    },
    topLeft: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
    },
    topLeftTitle: {
        color: 'white',
        fontSize: 16,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5%',
        marginHorizontal: '4%'
    },
    bottomRight: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 90,
        backgroundColor: 'grey',
        width: 100,
        height: 100
    },
    userName: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    userNo: {
        color: 'white',
        fontSize: 12
    }
})
export default hospitalsCard
