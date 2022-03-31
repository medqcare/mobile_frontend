import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
} from 'react-native';
import ActiveActivity from '../../components/activity/activeActivity';
import IcDokter from '../../assets/svg/ic_dokter';


const activity = (props) => {
	const { data } = props

	BackHandler.addEventListener('hardwareBackPress', () => {
		return props.navigation.navigate('Home');
	});

  	return (
		data && (
			<View style={{ marginBottom: 16 }}>
				{data.doctor ? (
					<View style={Styles.middleBox}>
						<Text style={Styles.text}>Dokter </Text>
						<View
							style={{
								flexDirection: 'row',
								marginTop: 10,
								alignItems: 'center',
							}}
						>
							<IcDokter />
							<Text style={{ color: '#FFF', fontSize: 14, marginLeft: 10 }}>
								{data?.doctor.doctorName}
							</Text>
						</View>
					</View>
				) : (
					<View style={Styles.middleBox}>
						<Text style={Styles.text}>Layanan Medis</Text>
						<View
							style={{
								flexDirection: 'row',
								marginTop: 10,
								alignItems: 'center',
							}}
						>
							<View>
								<IcDokter />
							</View>
							<Text
								style={{
									color: '#FFF',
									fontSize: 14,
									marginLeft: 10,
									textTransform: 'uppercase',
								}}
							>
								{data?.services.name}
							</Text>
						</View>
					</View>
				)}
				<ActiveActivity
					data={data}
				/>
			</View>
		)
  	);
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  middleBox: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#3C3C3C',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text: {
    color: '#B5B5B5',
    marginTop: 5,
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(activity);
