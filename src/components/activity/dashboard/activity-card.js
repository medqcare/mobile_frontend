import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import token from '../../../helpers/getToken'
import day from '../../../helpers/getDay'
import getTotalPrice from '../../../helpers/getTotalPrice'
import rupiah from '../../../helpers/rupiah'
import { baseURL } from '../../../config'

const mapStateToProps = state => state

function CardActivity({ navigation, data }) {
  const [user, setUser] = useState(null)
  const [hospital, setHospital] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [billing, setBilling] = useState(null)

  useEffect(() => {
    token()
      .then(async token => {
        let { data } = await axios({
          method: 'GET',
          url: `${baseURL}/api/users`,
          headers: { token: JSON.parse(token).token }
        })
        setUser(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    let ayam = data
    if (data.registerID) {
      token()
        .then(async token => {
          let { data } = await axios({
            method: 'GET',
            url: `${baseURL}/api/payments/findByActivity/${ayam._id}`,
            headers: { token: JSON.parse(token).token }
          })
          setBilling(data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [])

  useEffect(() => {
    axios.get(`${baseURL}/api/doctors/${data.doctorID}`)
      .then(({ data }) => {
        setDoctor(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios.get(`${baseURL}/api/hospitals/${data.hospitalID}`)
      .then(({ data }) => {
        setHospital(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const date = day(data.date).split(' ')

  return (
    <TouchableOpacity style={styles.Container}>
      <View
        style={{ ...styles.statusColor, backgroundColor: (data.status == 'REGISTERED') ? 'red' : 'green' }}
      >
      </View>
      <View
        style={styles.contentBox}
      >
        {
          (doctor != null && hospital != null) && <View
            style={styles.smallContentBox}
          >
            {
              doctor !== null && <Text
                style={{ fontSize: 20, fontWeight: 'bold' }}>{doctor.NAMA_DOKTER}</Text>
            }
            {
              doctor !== null && <Text
              >{doctor.SPESIALIS}</Text>
            }
            {
              hospital !== null && <Text>{hospital.NAMA_RS}</Text>
            }
          </View>
        }
        {
          (user != null) && <View
            style={styles.smallContentBox}
          >
            {
              user !== null && <Text>{user.firstName + ' ' + user.lastName}</Text>
            }
          </View>
        }
        {
          (billing != null) && <View
            style={{ ...styles.smallContentBox, alignSelf: 'flex-end' }}
          >
            {
              billing !== null && <View>
                <View
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>
                    biaya:
                </Text>
                </View>
                <Text
                  style={{ fontWeight: 'bold' }}
                > Rp {rupiah(getTotalPrice(billing.billingStatus))}</Text>
              </View>
            }
          </View>
        }
      </View>
      <View
        style={styles.boxDate}
      >
        <View
          style={{
            height: '10%',
            width: '100%',
            backgroundColor: 'red',
            position: 'absolute',
            top: 0,
          }}
        >
        </View>
        <Text
          style={{ fontSize: 30 }}
        >{date[1]}</Text>
        <Text
          style={{ fontSize: 16 }}
        >{date[2]} {date[3]}</Text>
      </View>


    </TouchableOpacity>
  );
};

const dimHeight = Dimensions.get('screen').height
const dimWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  Container: {
    marginBottom: dimHeight * 0.01,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: dimHeight * 0.2,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    flex: 1
  },
  boxDate: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#e9e9e9'
  },
  contentBox: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    flex: 3,
    height: '100%',
    padding: 5
  },
  statusColor: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    height: '100%',
    width: '5%'
  },
  smallContentBox: {
    // borderStyle: 'solid',
    borderRadius: 6,
    // borderWidth: 1,
    padding: 5,
    marginVertical: 2,
  }
})


module.exports = connect(mapStateToProps)(CardActivity);