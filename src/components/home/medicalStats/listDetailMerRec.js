import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableHighlight,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
} from 'react-native'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import getAge from '../../../helpers/getAge'
import ArrowBack from '../../../assets/svg/ArrowBack'

const ListdetailMedrec = (props) => {
    const [data, setData] = useState(props.navigation.state.params)
    var moment = require('moment')

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableHighlight
                        onPress={() => props.navigation.navigate('DetailMedRes')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', textTransform: 'capitalize' }}>{Object.keys(data)}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ImageBackground>

            <ScrollView >
                <FlatList
                    data={Object.values(data)}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index1 }) => {
                        return (
                            <View>
                                {item.contents ?
                                    (
                                        item.contents.map((anthropometry, index) => {
                                            return (
                                                <View key={index} style={{
                                                    flexDirection: 'row', flex: 1,
                                                    borderBottomWidth: 1.5,
                                                    borderColor: '#e9e9e9',
                                                    paddingHorizontal: 10
                                                }}>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <View style={styles.headerConten}>
                                                            <Text style={styles.headerContenText}>Taken Date</Text>
                                                        </View>
                                                        <View style={styles.headerConten}>
                                                            <Text style={styles.headerContenText}>Weight</Text>
                                                        </View>
                                                        {getAge(patient.dob) > 5 &&
                                                            <View style={styles.headerConten}>
                                                                <Text style={styles.headerContenText}>Height</Text>
                                                            </View>
                                                        }
                                                        {getAge(patient.dob) < 5 &&
                                                            <View style={styles.headerConten}>
                                                                <Text style={styles.headerContenText}>Body Length</Text>
                                                            </View>
                                                        }
                                                        {getAge(patient.dob) < 5 &&
                                                            <View style={styles.headerConten}>
                                                                <Text style={styles.headerContenText}>Arm Circum</Text>
                                                            </View>
                                                        }
                                                        <View style={styles.headerConten}>
                                                            <Text style={styles.headerContenText}>BMI</Text>
                                                        </View>
                                                        <View style={{ ...styles.headerConten }}>
                                                            <Text style={styles.headerContenText}>Nutrition State</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <View style={styles.contenItem}>
                                                            <Text style={styles.TextheaderTable}>{moment(anthropometry.takenDate).format('DD MMM YYYY')}</Text>
                                                        </View>
                                                        <View style={styles.contenItem}>
                                                            {anthropometry.weight ? <Text style={styles.TextheaderTable}>{anthropometry.weight}</Text> : <Text style={styles.TextheaderTable}>-</Text>}
                                                        </View>
                                                        {getAge(patient.dob) > 5 &&
                                                            <View style={styles.contenItem}>
                                                                {anthropometry.height ? <Text style={styles.TextheaderTable}>{anthropometry.height}</Text> : <Text style={styles.TextheaderTable}>-</Text>}
                                                            </View>
                                                        }
                                                        {getAge(patient.dob) < 5 &&
                                                            < View style={styles.contenItem}>
                                                                {anthropometry.bodyLength ? <Text style={styles.TextheaderTable}>{anthropometry.bodyLength}</Text> : <Text style={styles.TextheaderTable}>-</Text>}
                                                            </View>
                                                        }
                                                        {getAge(patient.dob) < 5 &&
                                                            < View style={styles.contenItem}>
                                                                {anthropometry.armCircum ? <Text style={styles.TextheaderTable}>{anthropometry.armCircum}</Text> : <Text style={styles.TextheaderTable}>-</Text>}
                                                            </View>
                                                        }
                                                        <View style={styles.contenItem}>
                                                            {anthropometry.bmi ? <Text style={styles.TextheaderTable}>{anthropometry.bmi}</Text> : <Text style={styles.TextheaderTable}>-</Text>}
                                                        </View>
                                                        <View style={{ ...styles.contenItem }}>
                                                            {anthropometry.nutritionState ? <Text style={styles.TextheaderTable}>{anthropometry.nutritionState}</Text> : <Text style={styles.TextheaderTable}>-</Text>}
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    ) : (null)}
                            </View>

                        )
                    }
                    }
                />

                {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerConten: {
        width: 150,
        padding: 5
    },
    headerContenText: {
        color: '#9D9D9D'
    },
    contenItem: {
        alignItems: 'flex-end',
        padding: 5,
    },
    TextheaderTable: {
        fontWeight: 'bold',
    },
})

const mapStateToProps = state => {
    return state;
};

export default (ListdetailMedrec)