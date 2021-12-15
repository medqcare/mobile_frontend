// import React, { useState } from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   Switch,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from 'react-native';

// //import for the animation of Collapse and Expand
// import * as Animatable from 'react-native-animatable';

// //import for the collapsible/Expandable view
// import Collapsible from 'react-native-collapsible';

// //import for the Accordion view
// import Accordion from 'react-native-collapsible/Accordion';

// //Dummy content to show
// //You can also use dynamic data by calling web service
// const CONTENT = [
//   {
//     title: 'Terms and Conditions',
//     content:
//       'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
//   },
//   {
//     title: 'Privacy Policy',
//     content:
//       'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
//   },
//   {
//     title: 'Return Policy',
//     content:
//       'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
//   },
// ];

// //To make the selector (Something like tabs)
// const SELECTORS = [
//   { title: 'T&C', value: 0 },
//   { title: 'Privacy Policy', value: 1 },
//   { title: 'Return Policy', value: 2 },
//   { title: 'Reset all' },
// ];

// const App = () => {
//   // Ddefault active selector
//   const [activeSections, setActiveSections] = useState([]);
//   // Collapsed condition for the single collapsible
//   const [collapsed, setCollapsed] = useState(true);
//   // MultipleSelect is for the Multiple Expand allowed
//   // True: Expand multiple at a time
//   // False: One can be expand at a time
//   const [multipleSelect, setMultipleSelect] = useState(false);

//   const toggleExpanded = () => {
//     //Toggling the state of single Collapsible
//     setCollapsed(!collapsed);
//   };

//   const setSections = (sections) => {
//     //setting up a active section state
//     setActiveSections(sections.includes(undefined) ? [] : sections);
//   };

//   const renderHeader = (section, _, isActive) => {
//     //Accordion Header view
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.header, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor">
//         <Text style={styles.headerText}>{section.title}</Text>
//       </Animatable.View>
//     );
//   };

//   const renderContent = (section, _, isActive) => {
//     //Accordion Content view
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.content, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor">
//         <Animatable.Text
//           animation={isActive ? 'bounceIn' : undefined}
//           style={{ textAlign: 'center' }}>
//           {section.content}
//         </Animatable.Text>
//       </Animatable.View>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <ScrollView>
//           <Text style={styles.title}>
//             Example of Collapsible/Accordion/Expandable List View in React
//             Native
//           </Text>

//           {/*Code for Single Collapsible Start*/}
//           <TouchableOpacity onPress={toggleExpanded}>
//             <View style={styles.header}>
//               <Text style={styles.headerText}>Single Collapsible</Text>
//               {/*Heading of Single Collapsible*/}
//             </View>
//           </TouchableOpacity>
//           {/*Content of Single Collapsible*/}
//           <Collapsible collapsed={collapsed} align="center">
//             <View style={styles.content}>
//               <Text style={{ textAlign: 'center' }}>
//                 This is a dummy text of Single Collapsible View
//               </Text>
//             </View>
//           </Collapsible>
//           {/*Code for Single Collapsible Ends*/}

//           <View style={{ backgroundColor: '#000', height: 1, marginTop: 10 }} />
//           <View style={styles.multipleToggle}>
//             <Text style={styles.multipleToggle__title}>
//               Multiple Expand Allowed?
//             </Text>
//             <Switch
//               value={multipleSelect}
//               onValueChange={(multipleSelect) =>
//                 setMultipleSelect(multipleSelect)
//               }
//             />
//           </View>
//           <Text style={styles.selectTitle}>
//             Please select below option to expand
//           </Text>

//           {/*Code for Selector starts here*/}
//           <View style={styles.selectors}>
//             {SELECTORS.map((selector) => (
//               <TouchableOpacity
//                 key={selector.title}
//                 onPress={() => setSections([selector.value])}
//                 //on Press of any selector sending the selector value to
//                 // setSections function which will expand the Accordion accordingly
//               >
//                 <View style={styles.selector}>
//                   <Text
//                     style={
//                       activeSections.includes(selector.value) &&
//                       styles.activeSelector
//                     }>
//                     {selector.title}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//           {/*Code for Selector ends here*/}

//           {/*Code for Accordion/Expandable List starts here*/}
//           <Accordion
//             activeSections={activeSections}
//             //for any default active section
//             sections={CONTENT}
//             //title and content of accordion
//             touchableComponent={TouchableOpacity}
//             //which type of touchable component you want
//             //It can be the following Touchables
//             //TouchableHighlight, TouchableNativeFeedback
//             //TouchableOpacity , TouchableWithoutFeedback
//             expandMultiple={multipleSelect}
//             //Do you want to expand mutiple at a time or single at a time
//             renderHeader={renderHeader}
//             //Header Component(View) to render
//             renderContent={renderContent}
//             //Content Component(View) to render
//             duration={400}
//             //Duration for Collapse and expand
//             onChange={setSections}
//             //setting the state of active sections
//           />
//           {/*Code for Accordion/Expandable List ends here*/}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     paddingTop: 30,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '300',
//     marginBottom: 20,
//   },
//   header: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   headerText: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   content: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   active: {
//     backgroundColor: 'rgba(255,255,255,1)',
//   },
//   inactive: {
//     backgroundColor: 'rgba(245,252,255,1)',
//   },
//   selectors: {
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   selector: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   activeSelector: {
//     fontWeight: 'bold',
//   },
//   selectTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     padding: 10,
//     textAlign: 'center',
//   },
//   multipleToggle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 30,
//     alignItems: 'center',
//   },
//   multipleToggle__title: {
//     fontSize: 16,
//     marginRight: 8,
//   },
// });





import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  NativeModules,
  ActivityIndicator,
  Button
} from "react-native";
import { connect } from "react-redux";
import GreyHeader from '../../../components/headers/GreyHeader'
import { MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import withZero from '../../../helpers/withZero'

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function AddReminderForm(props) {

	const [drugData, setDrugData] = useState({
		drugName: '',
		frequency: '',
		dose: '',
		duration: '',
		notes: '',
	})

	

	const newDate = new Date()
	const hours = newDate.getHours()
	const minutes = newDate.getMinutes()
	const [displayDate, setDisplayDate] = useState(`${withZero(hours)}:${withZero(minutes)}`)
	
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('time');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		const hours = currentDate.getHours()
		const minutes = currentDate.getMinutes()
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		setDisplayDate(`${withZero(hours)}:${withZero(minutes)}`);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const [load, setLoad] = useState(false)

	const [time, setTime] = useState({time: ''})

	
  	return (
		<View style={styles.container}>
			<GreyHeader
				navigate={props.navigation.navigate}
				navigateBack="Reminder"
				title="Tambah Pengingat Obat"
				// hidden={false}
			/>
			<View style={styles.content}>
				<View style={styles.inputFormContainer}>
					{/* Drug Name */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
									style={styles.inputText}
									autoCapitalize={'none'}
									autoFocus={false}
									placeholder={'Nama Obat'}
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.drugName}
								/>
						</View>
					</View>

					{/* Frequency */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<Text style={styles.inputText}>Seharusnya ini modal picker</Text>
						</View>
					</View>

					{/* Dose */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
									style={styles.inputText}
									autoCapitalize={'none'}
									autoFocus={false}
									placeholder={'Dosis'}
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.dose}
								/>
						</View>
					</View>

					{/* Duration */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
									style={styles.inputText}
									autoCapitalize={'none'}
									autoFocus={false}
									placeholder={'Berapa lama dikonsumsi'}
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.duration}
								/>
						</View>
					</View>

					{/* Optional Notes */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
									style={styles.inputText}
									autoCapitalize={'none'}
									autoFocus={false}
									placeholder={'Contoh: Minum dengan air putih setelah makan'}
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.notes}
								/>
						</View>
					</View>
				</View>
				<View style={styles.reminderFormContainer}>
					{/* Title */}
					<View style={styles.reminderTitle}>
						<Text style={styles.lightText}>Atur waktu pengingat</Text>
					</View>

					{/* Reminder time */}
					<View style={{paddingTop: 14,}}>
						<View style={styles.reminderTimeContainer}>
							<View style={{paddingHorizontal: 10}}>
								<View style={styles.reminderTopContainer}>
									<Text style={styles.lightText}>Jam pertama</Text>
								</View>
								<View style={styles.reminderLowerContainer}>
									<View style={{flexDirection: "row"}}>
										<MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
										<Text style={styles.reminderTimeText}>{displayDate}</Text>
									</View>
									<TouchableOpacity 
											onPress={showTimepicker} 
											// onPress={() => createCalendar()} 
											title="Show time picker!" 
										>
										<MaterialCommunityIcons name="pencil" size={24} color="rgba(128, 128, 128, 1)" />
									</TouchableOpacity>
									{show && (
										<DateTimePicker
											testID="dateTimePicker"
											value={date}
											mode={mode}
											is24Hour={true}
											display="default"
											onChange={onChange}
										/>
									)}
								</View>
							</View>
						</View>
					</View>
					{/* <View style={{paddingTop: 14}}>
						<View style={styles.reminderTimeContainer}>
							<View style={{paddingHorizontal: 10}}>
								<View style={styles.reminderTopContainer}>
									<Text style={styles.lightText}>Jam kedua</Text>
								</View>
								<View style={styles.reminderLowerContainer}>
									<View style={{flexDirection: "row"}}>
										<MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
										<Text style={styles.reminderTimeText}>13:00</Text>
									</View>
									<TouchableOpacity
										onPress={() => create()}
									>
										<MaterialCommunityIcons name="pencil" size={24} color="rgba(128, 128, 128, 1)" />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<View style={{paddingTop: 14}}>
						<View style={styles.reminderTimeContainer}>
							<View style={{paddingHorizontal: 10}}>
								<View style={styles.reminderTopContainer}>
									<Text style={styles.lightText}>Jam ketiga</Text>
								</View>
								<View style={styles.reminderLowerContainer}>
									<View style={{flexDirection: "row"}}>
										<MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
										<Text style={styles.reminderTimeText}>18:00</Text>
									</View>
									<TouchableOpacity
										onPress={() => create()}
									>
										<MaterialCommunityIcons name="pencil" size={24} color="rgba(128, 128, 128, 1)" />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View> */}
				</View>
				<View style={styles.buttonContainer}>
					
					<TouchableOpacity
						onPress={() => console.log('add reminder')}
						style={styles.button}
					>
						{load ? (
						<ActivityIndicator size={"small"} color="#FFF" />
						) : (
						<Text style={styles.buttonText}>Simpan Pengingat</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
  	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#4EB151",
		paddingVertical: 11,
		paddingHorizontal: 17,
		borderRadius: 3,
		marginVertical: 50
	},

	container: {
		flex: 1,
		backgroundColor: "#1F1F1F",
	},
	
	content: {
		height: dimHeight * 0.88,
		justifyContent: "flex-start",
		alignItems: 'center',
	},

	inputFormContainer: {
		paddingVertical: dimHeight * 0.02452,
		width: dimWidth * 0.9
	},

	inputContainer: {
		paddingTop: 10
	},

	input: {
        height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: 'rgba(84, 84, 84, 1)',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center'
    },

	inputText: {
		color: '#DDDDDD'
	},

	// SET ALL NUMBER TO DIMWIDTH OR DIMHEIGHT
	reminderFormContainer: {
		paddingTop: 16,
		width: dimWidth * 0.9
	},

	reminderTitle: {
		alignSelf: "flex-start",
	},

	reminderTimeContainer: {
		borderBottomWidth: 2,
		borderBottomColor: 'rgba(71, 71, 71, 1)',
		paddingBottom: 10
		// backgroundColor: 'red'
	},

	reminderTopContainer: {
		alignSelf: "flex-start",
		backgroundColor: 'rgba(47, 47, 47, 1)',
		paddingVertical: 4,
		paddingHorizontal: 6
	},

	reminderLowerContainer: {
		flexDirection: "row",
		width: '100%',
		justifyContent: "space-between",
		paddingTop: 10
	},

	reminderTimeText: {
		color: 'rgba(181, 181, 181, 1)',
		fontSize: 20,
		fontWeight: '500',
		paddingLeft: 5
	},
	
	
	// SET ALL NUMBER TO DIMWIDTH OR DIMHEIGHT

	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: dimHeight * 0.07353,
	},

	button: {
		height: dimHeight * 0.05,
		width: dimWidth * 0.9,
		backgroundColor: "#005ea2",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: dimHeight * 0.012256,
	},

	buttonText: {
		color: 'rgba(221, 221, 221, 1)',
		fontWeight: '500',
		fontSize: 18
	},
	
	lightText: {
		color: 'rgba(181, 181, 181, 1)'	
	},
});




const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(AddReminderForm)