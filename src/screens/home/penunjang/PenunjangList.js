import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
  BackHandler,
  Image

} from 'react-native';
import Checkbox from 'expo-checkbox';
import { connect, useDispatch, useSelector } from 'react-redux';
import { formatNumberToRupiah } from '../../../helpers/formatRupiah';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import SearchBar from '../../../components/headers/SearchBar';
import { MedicalServicesDummy } from './dummyData';
import GradientSearchBarHeader from '../../../components/headers/GradientSearchBarHeader';
import { Entypo, FontAwesome, FontAwesome5, } from '@expo/vector-icons'
import { getMedicalServices } from '../../../stores/action'
import LottieLoader from 'lottie-react-native'
import getDistanceFromLatLonInKm from '../../../helpers/latlongToKM'
import keys from '../../../stores/keys';

const { 
    SET_MEDICAL_SERVICES,
    SET_MEDICAL_SERVICES_CURRENTPAGE,
    SET_MEDICAL_SERVICES_TYPE,
    SET_MEDICAL_SERVICES_STATUS,
    SET_MEDICAL_SERVICES_LOADING,
    SET_MEDICAL_SERVICES_ERROR,
} = keys.medicalServicesKeys

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

function MedicalServices({navigation, userData, getMedicalServices, userLocationReducer, medicalServicesReducer}) {
	const dispatch = useDispatch()
	const { medicalServices: medicalServicesR, isLoading, error, type, status, currentPage } = medicalServicesReducer
	const [refreshLoading, setRefreshLoading] = useState(false)
	const [medicalServices, setMedicalServices] = useState(medicalServicesR)

	// "docs",
	// "totalDocs",
	// "limit",
	// "totalPages",
	// "page",
	// "pagingCounter",
	// "hasPrevPage",
	// "hasNextPage",
	// "prevPage",
	// "nextPage",

	useEffect(async () => {
		await searchMedicalServices()
	}, [])

	async function searchMedicalServices(addPage){
		try {
			await getMedicalServices(type, status, currentPage, medicalServicesR, addPage)
			setMedicalServices(medicalServicesR)
		}
		catch(error){
			console.log(error)
			console.log('error di penunjang list')
		}
	}

	async function searchFunction(text){
		if(text){
			const lowerCase = text.toLowerCase()
			const newMedicalServiceList = medicalServicesR.filter(el => el.name.toLowerCase().includes(lowerCase))
			setMedicalServices(newMedicalServiceList)
		}
		else {
			setMedicalServices(medicalServicesR)
		}
	}

	const onRefresh = useCallback(async () => {
		setType('All');
		dispatch({
			type: SET_MEDICAL_SERVICES_TYPE,
			payload: 'All'
		})
		setStatus(true);
		dispatch({
			type: SET_MEDICAL_SERVICES_STATUS,
			payload: true
		})
		setPage(1)
		searchMedicalServices();
	}, [refreshLoading]);

	BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.pop();
		return true;
	});

	function renderMedicalService({item}){
		// const { name, clinicName, address, distance, photo, price, discount } = item
		const { clinic, discount, itemCheck, name, basePrice, price, schedule, status, photo } = item
		const defaultLocation = {
			lat: -6.2416152,
			long: 106.9947997,
		}

		let clinicLocation;

		if(typeof clinic.location === "object"){
			const { coordinates } = clinic.location
			const [long, lat] = coordinates
				clinicLocation = {
					lat,
					long
				}
		} else {
			const parsedLocation = JSON.parse(clinic.location)
			if(parsedLocation){
				const { coordinates } = parsedLocation
				const [long, lat] = coordinates
				clinicLocation = {
					lat,
					long
				}
			} else clinicLocation = defaultLocation
		}
		const { lat: userLat, lng: userLng } = userLocationReducer.userLocation
		const distance = Math.floor(getDistanceFromLatLonInKm(clinicLocation.lat, clinicLocation.long, userLat, userLng))
		
		return (
			<View style={styles.medicalServiceCardContainer}>
				<View style={styles.leftContent}>
					<View>
						<Text style={textStyles.nameColor}>{name}</Text> 
					</View>
					<View style={{flexDirection: 'row', paddingTop: heightPercentageToDP('0.5%')}}>
						<FontAwesome5 name="hospital-alt" size={12} color="#A5A5A5" />
						<Text style={textStyles.greyColorWithPaddingLeftText}>{clinic.name}</Text> 
					</View>
					<View style={{flexDirection: 'row', paddingTop: heightPercentageToDP('0.5%')}}>
						<Entypo name="location" size={12} color="#A5A5A5" />
						<Text numberOfLines={2} style={[textStyles.greyColorWithPaddingLeftText, { width: '90%'}]}>{clinic.address}</Text> 
					</View>
					<View style={{flexDirection: 'row', paddingTop: heightPercentageToDP('0.5%')}}>
						<FontAwesome name="location-arrow" size={12} color="#A5A5A5" />
						<Text style={textStyles.greyColorWithPaddingLeftText}>{distance} Km</Text> 
					</View>

					<TouchableOpacity 
						onPress={() => navigation.navigate('MedicalServiceDetail', { item })}
						style={styles.makeAppointmentButton}>
						<Text style={textStyles.whiteColorText}>Buat Janji</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.rightContent}>
					<Image source={{uri: photo ? photo : 'https://th.bing.com/th/id/OIP.-MMHEFs3KUsUPZMcRrHP-gHaEo?pid=ImgDet&rs=1'}} style={{width:60,height:60}}/>
					<View 
						style={{alignItems: 'flex-end'}}
					>
						{discount ? (
							<View style={styles.promoContainer}>								
								<Text style={textStyles.promoText}>Promo</Text>
							</View>
						): null} 
						<Text style={[textStyles.greyColorText]}>Biaya Mulai Dari</Text>
						<View style={{flexDirection: 'row'}}>
							<Text style={ discount ? textStyles.strikedThroughPrice : textStyles.greyColorText}>{formatNumberToRupiah(basePrice)}</Text>
							{discount ? (
								<Text style={textStyles.discountedPrice}>{formatNumberToRupiah(price)}</Text>
							) : null}
						</View>
					</View>
				</View>
			</View>
		)
	}

	return (
		<View 
			style={styles.container}
		>
			{/* Header */}
			<GradientSearchBarHeader
				navigate={navigation.pop}
				navigateBack = "Home"
				title = "Layanan Medis"
				placeholder={'Cari layanan atau Lab test'}
				searchFunction={searchFunction}
				// option
			/>

			{/* Map Selection */}
			{/* <View style={styles.mapSelectionContainer}>
				<View style={{paddingVertical: heightPercentageToDP('1%'),}}>
					<Text style={textStyles.mapSelectionText}>Sekitar Anda</Text>
				</View>
				<TouchableOpacity
					onPress={() => console.log('Ubah')}
					style={styles.mapSelectionButton}
				>
					<Text style={textStyles.mapSelectionButtonText}>Ubah</Text>
				</TouchableOpacity>
			</View> */}

			{/* Content */}
			{isLoading ? (
				// <ActivityIndicator style={styles.noContentContainer} size={"small"} color={"blue"} />
				<LottieLoader
					source={require('../../animation/loading.json')}
					style={styles.noContentContainer}
					loop
					autoPlay
				/>
			) :
			( medicalServices.length > 0 ? (
				<FlatList
					refreshControl={
						<RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
					}
					style={styles.contentContainer}
					data={medicalServices}
					keyExtractor={(item, index) => String(index)}
					renderItem={renderMedicalService}
					onEndReached={() => {
						if (medicalServices.length >= 10) {
							searchMedicalServices(true);
						}
						}}
						onEndReachedThreshold={1}
				/>
			) :
			(
				<View style={styles.noContentContainer}>
					<Text style={textStyles.whiteColorText}>Tidak ada layanan medis</Text>
				</View>
			)
			)}

			{/* <View style={styles.contentContainer}>
				{MedicalServicesDummy.map((MedicalService, indexMedicalService) => {
					return (
						<MedicalServiceCard key={indexMedicalService} dataDetail={MedicalService}/>
					)
				})}
			</View> */}
		</View>
	)
}

const textStyles = StyleSheet.create({
	mapSelectionText: {
		paddingLeft: widthPercentageToDP('1.5%'), 
		color: '#A5A5A5'
	},

	mapSelectionButtonText: {
		color: '#F37335'
	},

	whiteColorText: {
		color: '#DDDDDD'
	},
	
	greyColorText: {
		color: '#A5A5A5'
	},
	
	greyColorWithPaddingLeftText: {
		color: '#A5A5A5',
		paddingLeft: widthPercentageToDP('1%')
	},
	
	nameColor: {
		color: '#DDDDDD',
		fontWeight: '400',
		fontSize: 16
	},

	promoText: {
		color: '#14AE5F'
	},

	strikedThroughPrice: {
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
		color: '#A5A5A5'
	},

	discountedPrice: {
		color: '#14AE5F',
		paddingLeft: widthPercentageToDP('1%')
	},
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1F1F1F',
		height: dimHeight,
		flex: 1
	},

	mapSelectionContainer: {
		backgroundColor: '#333333',
		paddingHorizontal: widthPercentageToDP('2.5%'),
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	
	mapSelectionButton: {
		paddingVertical: heightPercentageToDP('1%'),
		paddingHorizontal: widthPercentageToDP('2.5%'),
	},

	contentContainer: {
		paddingBottom: heightPercentageToDP('2%'),
		paddingHorizontal: widthPercentageToDP('4%'),
	},

	noContentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 15
	},
	
	medicalServiceCardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: heightPercentageToDP('2%'),
		borderBottomWidth: 1,
		borderBottomColor: '#3E3D3D',
		flex: 1
	},

	leftContent: {
		alignItems: 'flex-start',
		flex: 0.5
	}, 

	makeAppointmentButton: {
		backgroundColor: '#005EA2',
		paddingVertical: heightPercentageToDP('1%'),
		marginTop: heightPercentageToDP('1%'),
		paddingHorizontal: widthPercentageToDP('2%'),
		borderRadius: 8
	},

	rightContent: {
		alignItems: 'flex-end',
		flex: 0.5
	},

	promoContainer: {
		marginVertical: heightPercentageToDP('0.5%'),
		backgroundColor: '#1D3E2D',
		paddingVertical: heightPercentageToDP('0.2%'),
		paddingHorizontal: widthPercentageToDP('1%'),
		borderRadius: 10
	}
});

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
	getMedicalServices
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalServices);
