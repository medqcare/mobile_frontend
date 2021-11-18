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
    BackHandler
} from 'react-native'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import getAge from '../../../helpers/getAge'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAlergie } from '../../../stores/action'
import ArrowBack from '../../../assets/svg/ArrowBack'



const detailMedrec = (props) => {
    const [medrec, setMedrec] = useState(props.navigation.state.params.data)
    const [alergies, setAlergies] = useState(null)
    const [registrationID, setRegistrationID] = useState(props.navigation.state.params.data.registrationID)
    const [followUp, setFollowUp] = useState(props.navigation.state.params.data.followUp)
    const [anthropometry, setAnthropometry] = useState(props.navigation.state.params.data.anthropometry)
    const [vitalSign, setVitalSign] = useState(props.navigation.state.params.data.vitalSign)
    const [prescription, setPrescription] = useState(props.navigation.state.params.data.prescription)
    const [treatment, setTreatment] = useState(props.navigation.state.params.data.treatment)
    const [order, setOrder] = useState(props.navigation.state.params.data.order)
    const [patient, setPatient] = useState(props.navigation.state.params.patient)
    var moment = require('moment')
    const [examination, setExam] = useState(null)

    const [visibleAlergies, setVAlergies] = useState(true)
    const [visibleAntrop, setVAntrop] = useState(true)
    const [visibleVitalsign, setVSign] = useState(true)
    const [visibleTreatment, setVTreatment] = useState(true)
    const [visibleFollowUP, setVFollowUp] = useState(true)
    const [visiblePrescription, setVPrescription] = useState(true)
    const [visibleOrder, setVOrder] = useState(true)

    async function _fetchDataAlergi() {
        setAlergies([])
        let token = await AsyncStorage.getItem("token");
        let tempt = []
        console.log(patient, 'id patient')
        props.getAlergie(patient.patientID, JSON.parse(token).token)
            .then(allAlergi => {
                console.log(allAlergi, 'then yang ke 2')
                allAlergi.data.map((el, idx) => {
                    return (
                        el.status == "Active" ? tempt.push(el) : null
                    )
                })
                setAlergies(tempt)
            })
            .catch(error => {
                console.log(error)
                setLoad(false)
            })
    }

    useEffect(() => {
        let itemExam = []
        // console.log(order.contents, "ini contennya")
        order && order.contents && (
            order.contents.map((item, index) => {
                // let x = item.orderDetails.examination.split(',')
                // exam.push({ : itemExam})
                itemExam.push({ [item.facilityDestination.facilityName]: item.orderDetails.examination ? item.orderDetails.examination.split(',') : [] })
            })
            // order.contents.orderDetails.examination.split(',')
        )
        setExam(itemExam)
    }, [order])
    useEffect(() => {
        _fetchDataAlergi()
    }, [])

    BackHandler.addEventListener("hardwareBackPress", () => {
        return props.navigation.navigate('MedResList', { goback: 'Home' })
    })

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 85, }}>
                <View style={{ flex: 1, marginTop: 32, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableHighlight
                        onPress={() => props.navigation.navigate('MedResList')}>
                        <View style={{ flexDirection: 'row', }} >
                            <ArrowBack />
                            <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Detail Medical Resume</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ImageBackground>

            <ScrollView style={{ paddingHorizontal: 10, backgroundColor: '#F5FEF9' }}>
                {medrec.patientCondition &&
                    <View style={styleModal.item}>
                        <Text style={styleModal.headerItem}>Entry Condition</Text>
                        <Text style={styleModal.containItem}>{medrec.patientCondition}</Text>
                    </View>
                }
                {medrec.doctorPermit &&
                    <View>
                        {medrec.primaryDiagnosis && medrec.primaryDiagnosis.length &&
                            <View style={styleModal.item}>
                                <Text style={styleModal.headerItem}>Primary Diagnosis</Text>
                                <Text style={styleModal.containItem}>{medrec.primaryDiagnosis}</Text>
                            </View>
                        }
                        {medrec.secondaryDiagnosis !== "" && medrec.secondaryDiagnosis &&
                            <View style={styleModal.item}>
                                <Text style={styleModal.headerItem}>Secondary Diagnosis</Text>
                                <Text style={styleModal.containItem}>{medrec.secondaryDiagnosis}</Text>
                            </View>
                        }
                        {medrec.complicationDiagnosis &&
                            <View style={styleModal.item}>
                                <Text style={styleModal.headerItem}>Complication Diagnosis</Text>
                                <Text style={styleModal.containItem}>{medrec.complicationDiagnosis}</Text>
                            </View>
                        }
                    </View>
                }
                <TouchableOpacity style={[styleModal.headerTable, { borderBottomWidth: visibleAlergies ? 0 : 1, borderColor: '#e9e9e9' }]} onPress={() => setVAlergies(!visibleAlergies)}>
                    <Text style={styleModal.TextheaderTable}>Alergi</Text>
                    {visibleAlergies ? (
                        <Icon name={'ios-arrow-down'} size={20} color='#5E5C5C' />
                    ) : (
                            <Icon name={'ios-arrow-up'} size={20} color='#5E5C5C' />
                        )
                    }
                </TouchableOpacity>
                {visibleAlergies &&
                    <View>
                        {alergies && alergies.length !== 0 ? (
                            <View style={styleModal.itemTable}>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={alergies}
                                        keyExtractor={(item, index) => String(index)}
                                        renderItem={({ item, idx }) => {
                                            return (
                                                <View style={{ padding: 5 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: '#44E28B', marginRight: 5 }} />
                                                        {item ? <Text>{item.alergie}</Text> : <Text>-</Text>}
                                                    </View>
                                                </View>
                                            )
                                        }} />
                                </View>
                            </View>
                        ) : (
                                <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                                    <Text>There is no alergi</Text>
                                </View>
                            )}
                    </View>
                }
                <TouchableOpacity style={[styleModal.headerTable, { borderBottomWidth: visibleAntrop ? 0 : 1, borderColor: '#e9e9e9' }]} onPress={() => setVAntrop(!visibleAntrop)}>
                    <Text style={styleModal.TextheaderTable}>Anthropometry</Text>
                    {visibleAntrop ? (
                        <Icon name={'ios-arrow-down'} size={20} color='#5E5C5C' />
                    ) : (
                            <Icon name={'ios-arrow-up'} size={20} color='#5E5C5C' />
                        )
                    }
                </TouchableOpacity>
                {visibleAntrop &&
                    <View>
                        {anthropometry && anthropometry.contents && anthropometry.contents.length !== 0 ? (
                            <View style={styleModal.itemTable}>
                                <View style={{ flexDirection: 'row', flex: 1, }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>Taken Date</Text>
                                        </View>
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>Weight</Text>
                                        </View>
                                        {getAge(patient.dob) > 5 &&
                                            <View style={styleModal.headerConten}>
                                                <Text style={styleModal.headerContenText}>Height</Text>
                                            </View>
                                        }
                                        {getAge(patient.dob) < 5 &&
                                            <View style={styleModal.headerConten}>
                                                <Text style={styleModal.headerContenText}>Body Length</Text>
                                            </View>
                                        }
                                        {getAge(patient.dob) < 5 &&
                                            <View style={styleModal.headerConten}>
                                                <Text style={styleModal.headerContenText}>Arm Circum</Text>
                                            </View>
                                        }
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>BMI</Text>
                                        </View>
                                        <View style={{ ...styleModal.headerConten }}>
                                            <Text style={styleModal.headerContenText}>Nutrition State</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styleModal.contenItem}>
                                            <Text style={styleModal.TextheaderTable}>{moment(anthropometry.contents[0].takenDate).format('DD MMM YYYY')}</Text>
                                        </View>
                                        <View style={styleModal.contenItem}>
                                            {anthropometry.contents[0].weight ? <Text style={styleModal.TextheaderTable}>{anthropometry.contents[0].weight}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                        </View>
                                        {getAge(patient.dob) > 5 &&
                                            <View style={styleModal.contenItem}>
                                                {anthropometry.contents[0].height ? <Text style={styleModal.TextheaderTable}>{anthropometry.contents[0].height}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                            </View>
                                        }
                                        {getAge(patient.dob) < 5 &&
                                            < View style={styleModal.contenItem}>
                                                {anthropometry.contents[0].bodyLength ? <Text style={styleModal.TextheaderTable}>{anthropometry.contents[0].bodyLength}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                            </View>
                                        }
                                        {getAge(patient.dob) < 5 &&
                                            < View style={styleModal.contenItem}>
                                                {anthropometry.contents[0].armCircum ? <Text style={styleModal.TextheaderTable}>{anthropometry.contents[0].armCircum}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                            </View>
                                        }
                                        <View style={styleModal.contenItem}>
                                            {anthropometry.contents[0].bmi ? <Text style={styleModal.TextheaderTable}>{anthropometry.contents[0].bmi}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                        </View>
                                        <View style={{ ...styleModal.contenItem }}>
                                            {anthropometry.contents[0].nutritionState ? <Text style={styleModal.TextheaderTable}>{anthropometry.contents[0].nutritionState}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                        </View>
                                    </View>
                                </View>
                                {anthropometry && anthropometry.contents.length > 1 &&
                                    <TouchableOpacity style={{ flex: 1, borderColor: '#33E204', borderWidth: 1, alignItems: 'center', paddingVertical: 10, margin: 10 }}
                                        onPress={() => props.navigation.navigate('ListDetailMedRes', data = { anthropometry })}>
                                        <Text style={{ color: '#33E204', }}> See more (+{anthropometry.contents.length - 1})</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        ) : (
                                <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                                    <Text>There is no anthropometry</Text>
                                </View>
                            )}
                    </View>
                }
                <TouchableOpacity style={[styleModal.headerTable, { borderBottomWidth: visibleVitalsign ? 0 : 1, borderColor: '#e9e9e9' }]} onPress={() => setVSign(!visibleVitalsign)}>
                    <Text style={styleModal.TextheaderTable}>Vital Sign</Text>
                    {visibleVitalsign ? (
                        <Icon name={'ios-arrow-down'} size={20} color='#5E5C5C' />
                    ) : (
                            <Icon name={'ios-arrow-up'} size={20} color='#5E5C5C' />
                        )
                    }
                </TouchableOpacity>
                {visibleVitalsign &&
                    <View>
                        {vitalSign && vitalSign.contents && vitalSign.contents.length !== 0 ? (
                            <View style={styleModal.itemTable}>
                                <View style={{ flexDirection: 'row', flex: 1, }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>Taken Date</Text>
                                        </View>
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>Systole/Diastole</Text>
                                        </View>
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>Heart Rate</Text>
                                        </View>
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>Temperature</Text>
                                        </View>
                                        <View style={styleModal.headerConten}>
                                            <Text style={styleModal.headerContenText}>SP O2</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styleModal.contenItem}>
                                            <Text style={styleModal.TextheaderTable}>{moment(vitalSign.contents[0].takenDate).format('DD MMM YYYY')}</Text>
                                        </View>
                                        <View style={styleModal.contenItem}>
                                            {vitalSign.contents[0].systole && vitalSign.contents[0].diastole ? <Text style={styleModal.TextheaderTable}>{vitalSign.contents[0].systole}/{vitalSign.contents[0].diastole}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                        </View>
                                        <View style={styleModal.contenItem}>
                                            {vitalSign.contents[0].heartRate ? <Text style={styleModal.TextheaderTable}>{vitalSign.contents[0].heartRate}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                        </View>
                                        <View style={styleModal.contenItem}>
                                            {vitalSign.contents[0].temperature ? <Text style={styleModal.TextheaderTable}>{vitalSign.contents[0].temperature} &#8451; </Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                        </View>
                                        <View style={styleModal.contenItem}>
                                            {vitalSign.contents[0].spo2 ? <Text style={styleModal.TextheaderTable}>{vitalSign.contents[0].spo2}</Text> : <Text style={styleModal.TextheaderTable}>-</Text>}
                                        </View>
                                    </View>
                                </View>
                                {vitalSign && vitalSign.contents.length > 1 &&
                                    <TouchableOpacity style={{ flex: 1, borderColor: '#33E204', borderWidth: 1, alignItems: 'center', paddingVertical: 10, margin: 10 }}
                                        onPress={() => props.navigation.navigate('ListDetailVitalSign', data = { vitalSign })}>
                                        <Text style={{ color: '#33E204', }}> See more (+{vitalSign.contents.length - 1})</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        ) : (
                                <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                                    <Text>There is no vital sign</Text>
                                </View>
                            )}
                    </View>
                }

                <TouchableOpacity style={[styleModal.headerTable, { borderBottomWidth: visibleTreatment ? 0 : 1, borderColor: '#e9e9e9' }]} onPress={() => setVTreatment(!visibleTreatment)}>
                    <Text style={styleModal.TextheaderTable}>Treatment</Text>
                    {visibleTreatment ? (
                        <Icon name={'ios-arrow-down'} size={20} color='#5E5C5C' />
                    ) : (
                            <Icon name={'ios-arrow-up'} size={20} color='#5E5C5C' />
                        )
                    }
                </TouchableOpacity>
                {visibleTreatment &&
                    <View>
                        {treatment && treatment && treatment.detailTreatment.length !== 0 ? (
                            <View style={styleModal.itemTable}>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={treatment.detailTreatment}
                                        keyExtractor={(item, index) => String(index)}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ padding: 5 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: '#44E28B', marginRight: 5 }} />
                                                        {item.treatmentName ? <Text>{item.treatmentName}</Text> : <Text>-</Text>}
                                                    </View>
                                                </View>
                                            )
                                        }} />
                                </View>
                            </View>
                        ) : (
                                <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                                    <Text>There is no treatment</Text>
                                </View>
                            )}
                    </View>
                }

                <TouchableOpacity style={[styleModal.headerTable, { borderBottomWidth: visibleFollowUP ? 0 : 1, borderColor: '#e9e9e9' }]} onPress={() => setVFollowUp(!visibleFollowUP)}>
                    <Text style={styleModal.TextheaderTable}>Follow Up</Text>
                    {visibleFollowUP ? (
                        <Icon name={'ios-arrow-down'} size={20} color='#5E5C5C' />
                    ) : (
                            <Icon name={'ios-arrow-up'} size={20} color='#5E5C5C' />
                        )
                    }
                </TouchableOpacity>
                {visibleFollowUP &&
                    <View>
                        {followUp && followUp.followupType ? (
                            <View style={styleModal.itemTable}>
                                {followUp.followupType &&
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e9e9e9', paddingBottom: 5 }}>
                                        <View style={{ width: 10, height: 10, borderRadius: 15, backgroundColor: '#44E28B', marginRight: 3, marginTop: 10 }} />
                                        <View>
                                            <View style={{ ...styleModal.contenItem, alignItems: 'baseline', paddingHorizontal: 5, }}>
                                                <Text>{followUp.followupType}</Text>
                                            </View>
                                            {followUp.controlDate &&
                                                <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                                                    <Text>Control Date : </Text>
                                                    <Text style={{ color: '#707070', fontWeight: 'bold' }}>{moment(followUp.controlDate).format('DD MMM YYYY')}</Text>
                                                </View>
                                            }
                                            {followUp.referralDetail && followUp.referralDetail.referrralInstitution &&
                                                <View>
                                                    <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                                                        <Text>Referral Institution : </Text>
                                                        <Text>{followUp.referralDetail.referrralInstitution}</Text>
                                                    </View>
                                                    <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                                                        <Text>Doctor Name : </Text>
                                                        {followUp.referralDetail.doctor ? <Text>{followUp.referralDetail.doctor}</Text> : <Text>-</Text>}
                                                    </View>
                                                    <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                                                        <Text>Spesialis : </Text>
                                                        {followUp.referralDetail.specialization ? <Text>{followUp.referralDetail.specialization}</Text> : <Text>-</Text>}
                                                    </View>
                                                    <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                                                        <Text>Expired Date : </Text>
                                                        {followUp.referralDetail.expiredDate ? <Text>{moment(followUp.referralDetail.expiredDate).format('DD/MMMM/YYYY')}</Text> : <Text>-</Text>}
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                }
                                {/* <Text>{JSON.stringify(followUp, null, 2)}</Text> */}
                            </View>
                        ) : (
                                <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                                    <Text>There is no Follow Up</Text>
                                </View>
                            )}
                    </View>
                }


                <TouchableOpacity style={[styleModal.headerTable, { borderBottomWidth: visiblePrescription ? 0 : 1, borderColor: '#e9e9e9' }]} onPress={() => setVPrescription(!visiblePrescription)}>
                    <Text style={styleModal.TextheaderTable}>Prescription</Text>
                    {visiblePrescription ? (
                        <Icon name={'ios-arrow-down'} size={20} color='#5E5C5C' />
                    ) : (
                            <Icon name={'ios-arrow-up'} size={20} color='#5E5C5C' />
                        )
                    }
                </TouchableOpacity>
                {visiblePrescription &&
                    <View>
                        {prescription && prescription.detailPrescription && prescription.detailPrescription.length !== 0 ? (
                            <View style={styleModal.itemTable}>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={prescription.detailPrescription}
                                        keyExtractor={(item, index) => String(index)}
                                        renderItem={({ item }) => {
                                            return (
                                                <>
                                                    {item.drugName ? <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e9e9e9', paddingBottom: 5 }}>
                                                        <View style={{ width: 10, height: 10, borderRadius: 15, backgroundColor: '#44E28B', marginRight: 3, marginTop: 10 }} />
                                                        <View>
                                                            <View style={{ ...styleModal.contenItem, alignItems: 'baseline', paddingHorizontal: 5, }}>
                                                                {item.drugName ? <Text>{item.drugName}</Text> : <Text>-</Text>}
                                                            </View>
                                                            <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                                                                <Text>Dose : </Text>
                                                                {item.etiquetteAmmount && item.dose ? <Text style={{ color: '#707070', fontWeight: 'bold' }}>{item.etiquetteAmmount} X {item.dose} /hari </Text> : <Text>-</Text>}
                                                                {item.otherInstruction == "" ? <Text></Text> : !item.otherInstruction ? <Text></Text> : <Text style={{ color: '#707070' }}>  -  {item.otherInstruction}</Text>}
                                                            </View>
                                                        </View>
                                                    </View> : null}
                                                </>
                                            )
                                        }} />
                                </View>
                            </View>
                        ) : (
                                <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                                    <Text>There is no prescription</Text>
                                </View>
                            )}
                    </View>
                }

                <TouchableOpacity style={[styleModal.headerTable, { borderBottomWidth: visibleOrder ? 0 : 1, borderColor: '#e9e9e9' }]} onPress={() => setVOrder(!visibleOrder)}>
                    <Text style={styleModal.TextheaderTable}>Order</Text>
                    {visibleOrder ? (
                        <Icon name={'ios-arrow-down'} size={20} color='#5E5C5C' />
                    ) : (
                            <Icon name={'ios-arrow-up'} size={20} color='#5E5C5C' />
                        )
                    }
                </TouchableOpacity>
                {visibleOrder &&
                    <View>
                        {order && order.contents && order.contents !== 0 ? (
                            <FlatList
                                data={examination}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item, index1 }) => {
                                    return (
                                        <View key={index1} style={{ flexDirection: 'column', backgroundColor: '#FFF' }}>
                                            <View style={{ alignItems: 'baseline', flex: 1, flexWrap: 'nowrap', }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 }}>
                                                    <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: '#44E28B', marginRight: 10, marginTop: 5 }} />
                                                    <Text style={styleModal.TextheaderTable}>{Object.keys(item)}</Text>
                                                </View>
                                            </View>
                                            {Object.values(item).length &&
                                                <View style={{ ...styleModal.contenItem, alignItems: 'baseline', paddingRight: 5, marginLeft: 15, flex: 1, flexWrap: 'nowrap', borderBottomWidth: 1, borderColor: '#e9e9e9' }}>
                                                    {Object.values(item).map((value, index2) => {
                                                        return (
                                                            <View key={index2}>
                                                                {value.map((itemExam, index3) => {
                                                                    return (
                                                                        <View key={index3} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 }}>
                                                                            <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: '#797979', marginRight: 5, marginTop: 5 }} />
                                                                            <Text>{itemExam}</Text>
                                                                        </View>
                                                                    )
                                                                })}
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            }
                                        </View>
                                    )
                                }} />
                        ) : (
                                <View style={{ width: '100%', alignItems: 'center', padding: 20 }}>
                                    <Text>There is no order</Text>
                                </View>
                            )}
                    </View>
                }
                {/* <TouchableHighlight onPress={() => props.navigation.navigate('MedResList')} style={{ flex: 1, backgroundColor: '#d71' }}>
                    <Text>{JSON.stringify(followUp, null, 2)}</Text>
                </TouchableHighlight> */}
            </ScrollView>

        </View>
    )
}

const styleModal = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        borderColor: '#e9e9e9',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    headerItem: {
        marginBottom: 5,
        color: '#9D9D9D'
    },
    containItem: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    headerTable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        width: '100%',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    itemTable: {
        backgroundColor: '#fff',
        borderBottomWidth: 1.5,
        borderColor: '#e9e9e9',
        marginBottom: 5
    },
    TextheaderTable: {
        fontWeight: 'bold',
    },
    headerConten: {
        width: 150,
        // minWidth: '50%',
        // backgroundColor: '#e9e9e9',
        padding: 5
    },
    headerContenText: {
        color: '#9D9D9D'
    },
    headerTreatment: {
        backgroundColor: '#e9e9e9',
        alignItems: 'center',
    },
    contenItem: {
        // backgroundColor: '#de9',
        alignItems: 'flex-end',
        padding: 5,
    },
    itemContenText: {
        paddingVertical: 5,
    },
    date: {
        fontSize: 12,
        color: '#FFF'
    }
})

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = {
    getAlergie,
}

export default connect(mapStateToProps, mapDispatchToProps)(detailMedrec)