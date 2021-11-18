import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextComponent, Dimensions } from 'react-native'
import IconAnt from 'react-native-vector-icons/AntDesign';


// function dayName(num) {
//   switch (num) {
//     case "1":
//       return "senin"
//     case "2":
//       return "selasa"
//     case "3":
//       return "rabu"
//     case "4":
//       return "kamis"
//     case "5":
//       return "jumat"
//     case "6":
//       return "sabtu"

//     default:
//       break;
//   }
// }

function detailSchedule(data) {
  let schedule = ``
  data.forEach(element => {
    if (element < 10) {
      schedule += `0${element}.00 - `
    }
    else if (element >= 10) {
      schedule += `${element}.00 - `
    }
    else if (element == '-') {
      schedule = schedule.substring(0, schedule.length - 3)
      schedule += ' , '
    }
  })
  return schedule.substring(0, schedule.length - 3).split(' , ')
}

const schedule = ({ data }) => {
  const [detail, setDetail] = useState(false)

  return (
    <TouchableOpacity
      onPress={() => setDetail(!detail)}>
      <View>
        <View
          style={viewStyles.hospital_container}
        >
          <Text
            style={textStyles.hospital_name}
          >{data.ID.NAMA_RS}</Text>
          {
            !detail && <IconAnt
              name="down"
              size={20}
              color="black"
              style={textStyles.icon}
            />
          }
          {
            detail && <IconAnt
              name="up"
              size={20}
              color="black"
              style={textStyles.icon}
            />
          }
        </View>
        {
          detail && <View>
            {
              Object.entries(data.JADWAL_PRAKTEK[0][0]).map(([key, val], i) => {
                return (<View key={i}>
                  <Text>{dayName(key)}</Text>
                  <View style={viewStyles.containerSchedule}>
                    {
                      detailSchedule(val).map((el, i) => {
                        return (
                          <View
                            key={i}
                            style={viewStyles.boxSchedule}>
                            <Text>{el}</Text>
                          </View>
                        )
                      })
                    }
                  </View>
                </View>)
              })
            }
          </View>
        }
      </View>
    </TouchableOpacity>
  )
}

const viewStyles = StyleSheet.create({
  hospital_container: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingBottom: 0 
  },
  boxSchedule: {
    borderColor: 'cyan',
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 5,
    minHeight : 30,
    minWidth: 150
  },
  containerSchedule: {
    flexWrap: 'wrap',
    minWidth: Dimensions.get('screen').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
})
const textStyles = StyleSheet.create({
  hospital_name : { 
    fontSize: 16,
    fontWeight: 'bold' 
  },
  icon: { 
    height: 35,
    alignSelf: 'center',
    fontWeight: 'bold' 
  }
})


export default schedule
