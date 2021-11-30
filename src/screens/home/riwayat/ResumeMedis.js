import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { baseURL } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFormattedDate } from "../../../helpers/dateFormat";

import ModalResumeMedis from "../../../components/modals/modalResumeMedis";

function ResumeMedis(props) {
    const [dataMedRes, setDataMedres] = useState(null)
    const [showDetail, setShowDetail] = useState(false)
    const [resumeMedis, setResumeMedis] = useState(null)
    const [activePage, setActivePage] = useState(null)
    const [lengthData, setLengthData] = useState(0)

    useEffect(() => {
        if(dataMedRes){
            setResumeMedis(dataMedRes[activePage])
        }
    },[activePage])

    const _getData = async () => {
        let token = await AsyncStorage.getItem("token");
        let { data } = await axios({
            url: `${baseURL}/api/v1/members/getMedicalResume`,
            method: "POST",
            headers: { Authorization: JSON.parse(token).token },
        });
        setDataMedres(data.data)
        setLengthData(data.data.length)
    };

    useEffect(() => {
        _getData()
    },[])

    return (
        <View>
        <View style={Styles.container}>
            <View style={Styles.cardName}>
                <Text style={Styles.textName}>Gunawan Irawan</Text>
                <TouchableOpacity>
                <Text style={Styles.button}>UBAH</Text>
                </TouchableOpacity>
            </View>
            {
                dataMedRes?.map((item, idx) => {
                    return (
                        <View style={Styles.card} key={idx}>
                            <Text style={{color: '#B5B5B5'}}>Taken Date {getFormattedDate(item.createdAt)}</Text>
                            <TouchableOpacity onPress={() => {
                                setShowDetail(true)
                                setActivePage(idx)
                            }}>
                                <Text style={Styles.button}>LIHAT</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </View>
            <ModalResumeMedis
                modal={showDetail}
                setModal={setShowDetail}
                data={resumeMedis}
                activePage={activePage}
                setActivePage={setActivePage}
                lengthData={lengthData}
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    cardName: {
        borderColor: '#545454',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        height: '14%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#2F2F2F',
        borderRadius: 5,
        paddingHorizontal: 15,
        height: '14%',
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        color: '#F37335'
    },
    textName: {
        color: '#fff',
        fontSize: 16
    }
})



const mapStateToProps = (state) => {
    return state;
  };
  
  const mapDispatchToProps = {
  };

export default connect(mapStateToProps, mapDispatchToProps)(ResumeMedis);