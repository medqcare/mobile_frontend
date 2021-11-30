import React from 'react';
import Modal from 'react-native-modal';
import {
  View, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native'


export default function SelectPatient({modal, setModal, title, accountOwner, family, setSelectedValue } ){
	function smallLengthText(string){
		let result = ''
		for(let i = 0; i < string.length; i++){
			if(i === 9){
				result += '...'
				return result
			} else {
				result += string[i]
			}
		}
	}

	function fullName(object){
		return object.lastName ? 
		object.firstName + ' ' + object.lastName :
		object.firstName
	}
	console.log(accountOwner)
    return (
        <Modal
            isVisible={modal}
            swipeDirection={'down'}
            style={styles.modal}
            animationType="slide"
            onBackdropPress={() => setModal(false)}
            onSwipeComplete={() => setModal(false)}
            onRequestClose={() => setModal(false)}
        >
			
            <View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.toogle} />
					<Text style={styles.title}>
						{title}
					</Text>
				</View>
				<View style={styles.patient}>

					{family.map((lang, itemIndex) => {
                          return (
						<View key={itemIndex}>
							<TouchableOpacity
								style={styles.touchable}
								onPress={() => {
									setSelectedValue(lang)
									setModal(false);
								}}>
								<View>
									<Image
										style={styles.photo}
										source={require('../../assets/png/Profil.png')}
									/>
									<Text style={styles.name}>
										{smallLengthText(fullName(lang))}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					);
					})}
				</View>
          </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        maxHeight: '100%',
        backgroundColor: '#2F2F2F',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
	header: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
	},
	toogle: {
		position: 'absolute',
		borderWidth: 2,
		width: 50,
		borderColor: '#6C6C6C',
		alignContent: 'center',
		marginBottom: 20,
	},
	title: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 20,
	},
	patient: {
		flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20,
	},

	touchable: {
		marginLeft: 35
	},

	photo: {
		width: 65,
		height: 65,
	},

    //   titleP: {
    //     color: 'white',
    //     fontSize: 12,
    //   },
    //   cardName: {
    //     marginTop: 10,
    //     borderColor: '#757575',
    //     borderWidth: 1,
    //     borderRadius: 3,
    //     minHeight: 50,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 10,
    //   },
    //   familyName: {
    //     flexDirection: 'row',
    //   },
    //   photo: {
    //     marginVertical: 7,
    //     width: 35,
    //     height: 35,
    //     borderRadius: 50,
    //     borderWidth: 1,
    //     borderColor: '#4fe39b',
    //   },
      name: {
        marginTop: 15,
        color: '#DDDDDD',
      },
      vector: {
        marginVertical: 20,
      },
      buttonAdd: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      vectorPlus: {
        marginTop: 5,
        marginRight: 5,
      },
      addTitle: {
        color: '#4398D1',
      },
})