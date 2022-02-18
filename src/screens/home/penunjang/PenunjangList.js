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
import { connect, useSelector } from 'react-redux';
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

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

function MedicalServices({navigation, userData, getMedicalServices}) {
	const [type, setType] = useState('UMUM')
	const [status, setStatus] = useState(true)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [refreshLoading, setRefreshLoading] = useState(false)
	const [medicalServices, setMedicalServices] = useState([])

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
			console.log('Application trying to find avaliable medical services')
			const result = await getMedicalServices(type, status, page)
			setLoading(false)
			if(result.length === 0) {
				console.log(`Application didn't find any available services`)
				return setMedicalServices([])
			}
			if (page == 1) {
				setMedicalServices(result.docs)
			} else {
				setMedicalServices(medicalServices.concat(result.docs));
			}
			console.log(`Application found ${result.docs.length} medical service(s)`)
			setLoading(false);

			if(addPage){
				const nextPage = page + 1;
				setPage(nextPage);
			}

			console.log('All data fetched, no need to add page')
		}
		catch(error){
			console.log(error)
			console.log('error di penunjang list')
		}
	}

	const onRefresh = useCallback(async () => {
		setLoading(true)
		setType('All');
		setStatus(true);
		setPage(1)
		searchMedicalServices();
	}, [refreshLoading]);

	BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.pop();
		return true;
	});

	function renderMedicalService({item}){
		// const { name, clinicName, address, distance, photo, price, discount } = item
		const { clinic, discount, itemCheck, name, price, schedule, status, photo } = item
		const discountedPrice = price * (100-discount)/100

		return (
			<View
				onPress={() => navigation.navigate('MedicalServiceDetail', { item })}
				style={styles.medicalServiceCardContainer}
			>
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
						<Text style={textStyles.greyColorWithPaddingLeftText}>{clinic.address}</Text> 
					</View>
					<View style={{flexDirection: 'row', paddingTop: heightPercentageToDP('0.5%')}}>
						<FontAwesome name="location-arrow" size={12} color="#A5A5A5" />
						<Text style={textStyles.greyColorWithPaddingLeftText}>Jarak Km</Text> 
					</View>

					<TouchableOpacity 
						onPress={() => navigation.navigate('MedicalServiceDetail', { dataDetail })}
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
							<Text style={ discount ? textStyles.strikedThroughPrice : textStyles.greyColorText}>{formatNumberToRupiah(price)}</Text>
							{discount ? (
								<Text style={textStyles.discountedPrice}>{formatNumberToRupiah(discountedPrice)}</Text>
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
				// option
			/>

			{/* Map Selection */}
			<View style={styles.mapSelectionContainer}>
				<View style={{paddingVertical: heightPercentageToDP('1%'),}}>
					<Text style={textStyles.mapSelectionText}>Sekitar Anda</Text>
				</View>
				<TouchableOpacity
					onPress={() => console.log('Ubah')}
					style={styles.mapSelectionButton}
				>
					<Text style={textStyles.mapSelectionButtonText}>Ubah</Text>
				</TouchableOpacity>
			</View>

			{/* Content */}
			{loading ? (
				<ActivityIndicator size={"small"} color={"blue"} />
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
				<View style={styles.contentContainer}>
					<Text style={textStyles.whiteColorText}></Text>
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
		height: heightPercentageToDP('100%')
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
	
	medicalServiceCardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: heightPercentageToDP('2%'),
		borderBottomWidth: 1,
		borderBottomColor: '#3E3D3D'
	},

	leftContent: {
		alignItems: 'flex-start'

	}, 

	makeAppointmentButton: {
		backgroundColor: '#005EA2',
		paddingVertical: heightPercentageToDP('1%'),
		marginTop: heightPercentageToDP('1%'),
		paddingHorizontal: widthPercentageToDP('2%'),
		borderRadius: 8
	},

	rightContent: {
		alignItems: 'flex-end'
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
