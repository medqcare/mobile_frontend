import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,
    ImageBackground
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowBack from '../../../assets/svg/ArrowBack'

const MedicalFasility = (props) => {
    const data = props.navigation.getParam('dataMedFac')
    // console.log(data, 'ini data --')
    // console.log(props.navigation.getParam('dataMedFac'), 'ini data --')

    const buatJanji = async () => {
        // console.log('ini untuk buat janji, anti diredirect')
        // console.log(value,'ini valuenya..')
        props.userData ? (
            // console.log('ini bisa di redirect'),
            props.navigation.navigate('MedFacility'),
            props.navigation.navigate('BuatJanji', { data })
        ) : (
                // console.log('gabisa di redirect karena belom login, arahin ke bagian sign'),
                props.navigation.navigate('MedFacility'),
                // console.log(props.navigation, 'ini navigationnya'),
                props.navigation.navigate('Sign')
            )
    }

    const [newData, setNewData] = useState(null)
    const [aktifDay, setAktifDay] = useState(null)
    const [aktifHospital, setAktifHospital] = useState(null)
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    console.log(aktifDay, 'aktif day')

    function parsingData() {
        let day = {}
        data.forEach((el, index) => {
            Object.entries(el.facilitySchedule).forEach((el2, index2) => {
                if (index2 === 0) {
                    day[el.facilityName] = el2
                    // setAktifDay(el2)
                    // console.log(el.facilityName, 'new data')
                }
            })
        })
        setNewData(day)
    }

    function aktifFirst() {
        data.forEach((el, index) => {
            if (index == 0) {
                // console.log(el,'el')
                setAktifHospital(el.facilityName)
            }
        })
    }

    useEffect(() => {
        parsingData()
        // aktifFirst()
    }, [])
    
    console.log(newData, '...=>>> yang ini <<<====')
    return (
        <View style={{ backgroundColor: '#FFF', flex: 1, }}>
            <ScrollView >
                <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                    <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('DetailDoctor')}>
                            <View style={{ flexDirection: 'row', }} >
                                <ArrowBack />
                                <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Medical Facility</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                {
                    data.map((item, keys) => {
                        return (
                            <View style={container.base} key={keys}>
                                <Image source={{ uri: (!item.facilityPhoto) ? 'https://revcycleintelligence.com/images/site/article_headers/_normal/hospital%2C_green.jpg' : item.facilityPhoto }}
                                    // <Image source={{ uri: item.facilityPhoto }}
                                    style={styles.image} />
                                <View style={container.detailHospital}>
                                    <Text style={textStyle.name}>{item.facilityName}</Text>
                                    <Text style={textStyle.address}>{item.facilityAddress}</Text>
                                    <Text style={textStyle.name}>Schedule</Text>
                                    <View>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                            {
                                                Object.entries(item.facilitySchedule).map((el, index) => {
                                                    return (
                                                        <TouchableOpacity key={index} onPress={() => {
                                                            // setAktifHospital(item.facilityName)
                                                            // setAktifDay(el)
                                                            setNewData({ ...newData, [item.facilityName]: el })
                                                        }}>
                                                            { newData !== null && newData[item.facilityName] !== null &&
                                                                <Text style={{
                                                                    marginRight: 10, borderWidth: 1, padding: 10, borderRadius: 10,
                                                                    color: newData[item.facilityName][0] == el[0] ? '#33E204' : '#CDCDCD',
                                                                    borderColor: newData[item.facilityName][0] == el[0] ? '#33E204' : '#CDCDCD',
                                                                }}>{day[+el[0]]}</Text>
                                                            }
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                        <View>
                                            {newData !== null && newData[item.facilityName] !== null &&
                                                Object.entries(newData[item.facilityName][1]).map((el2, index2) => {
                                                    return (
                                                        <View style={{ marginVertical: 5, }} key={index2}>
                                                            <Text>{el2[1]}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        {/* <Text>{JSON.stringify(item._id, null, 2)}</Text> */}
                                    </View>
                                </View>
                                <View style={container.maps} >
                                    <TouchableOpacity onPress={() => alert('ini ke google maps')}>
                                        <MCIcon name={'google-maps'} size={30} color={'#848280'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <TouchableOpacity onPress={() => { buatJanji() }}>
                <View style={{ height: 50, backgroundColor: '#3AD584', borderColor: '#18A85D', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginHorizontal: 10, marginBottom: 10 }}>
                    <Text style={{ color: '#FFF', fontSize: 16 }}>Book Appointment</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const container = StyleSheet.create({
    base: {
        // backgroundColor: '#b8860b',
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        // borderTopColor: '#CACACA'
        borderColor: '#CACACA',
    },
    detailHospital: {
        marginVertical: 5,
        paddingHorizontal: 10,
        // backgroundColor: '#a9a9a9',
        flex: 5,
    },
    maps: {
        // backgroundColor: '#FDCB96',
        flex: 1,
        alignItems: 'center',
    }

})

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        height: 80,
        width: 80,
    }
})

const textStyle = StyleSheet.create({
    name: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
    }
})

export default MedicalFasility