import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'

const listToday = () => {
    const [data, setData] = useState([{
        'RSName': 'RS.ABC',
        'facility': {
            'senin': ['01', '02', '03'],
            'selasa': ['04', '05',]
        }
    },
    {
        'RSName': 'RS.SAYA',
        'facility': {
            'Rabu': ['11', '12', '13'],
        }
    },
    {
        'RSName': 'RS.ANDA',
        'facility': {
            'MINGGU': ['121', '222', '332'],
            'KAMIS': ['asd', 'bnm']
        }
    }])

    const [jadwal, setJadwal] = useState([])
    console.log(jadwal,'ini jadwal')
    const [hospital, setHospital] = useState(null)
    const [show, setShow] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        let newData = {}

        data.map((val, index) => {
            console.log(val,'ini val-')
            // Object.entries(val.facility).forEach((el2, index2) => {
            //     newData[val.RSName] = el2
            // })
        })
    }
    return (
        <ScrollView>
            {
                Object.entries(data).map((el, index) => {
                    return (
                        <View key={index}>
                            {/* <Text style={{ backgroundColor: '#B9B8DC' }}>{JSON.stringify(el)}</Text> */}
                            <Text style={{ backgroundColor: '#B9B8DC' }}>{JSON.stringify(el[1].RSName, null, 2)}</Text>
                            {/* <Text>{JSON.stringify(el[1].facility, null, 2)}</Text> */}
                            {/* <Text>{JSON.stringify(el[1], null, 2)}</Text> */}
                            {
                                Object.keys(el[1].facility).map((el2, index2) => {
                                    return (
                                        <ScrollView horizontal>
                                            <TouchableOpacity style={{ margin: 10, }}
                                                onPress={() => {
                                                    setHospital(el[1].RSName)
                                                    Object.values(el[1].facility).map((el3, index3) => {
                                                        // return (
                                                        <View style={{ margin: 10, backgroundColor: '#AAA0F2' }}>
                                                            {/* {
                                                                el3.map((el4, index4) => {
                                                                    return (
                                                                        <View> */}
                                                                            {index2 === index3 &&
                                                                                setJadwal(el3)
                                                                                // console.log(el4)
                                                                            }
                                                                        {/* </View>
                                                                    )
                                                                })
                                                            } */}
                                                        </View>
                                                        // )
                                                    })
                                                }}
                                            >
                                                <Text style={{ height: 30, backgroundColor: '#CBF2A0' }}>{el2}</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    )
                                })
                            }
                            {
                                Object.values(el[1].facility).map((el3, index3) => {
                                    return (
                                        <View style={{ margin: 10, backgroundColor: '#AAA0F2' }}>
                                            {
                                                el3.map((el4, index4) => {
                                                    return (
                                                        <View>
                                                            {jadwal === el3 &&
                                                                <Text style={{ backgroundColor: '#F2A0B7', margin: 5 }}>{el4}</Text>
                                                            }
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                            {/* {hospital === el[1].RSName &&
                                <Text style={{ backgroundColor: '#ECFB40', margin: 10 }}>{hospital}</Text>
                            } */}
                            {/* <Text style={{ backgroundColor: '#A0F2EC', margin: 10 }}>{jadwal}</Text> */}

                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

export default listToday