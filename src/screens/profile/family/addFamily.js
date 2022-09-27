import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Header from '../../../components/headers/GradientHeader';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';

//component
import FamilyList from '../../../components/profile/dashboard/family-list-card';

//mapToProps
const mapStateToProps = (state) => {
  return state;
};

const addFamily = (props) => {
  const { darkMode } = props.userDataReducer

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop();
    return true;
  });
  return (
    <View style={darkMode ? style.container : style.containerLight}>
      <Header
        title={'Daftar Keluarga'}
        navigate={props.navigation.navigate}
        navigateBack={'ProfileStack'}
      />
      <ScrollView style={{ flex: 1, flexGrow: 1 }}>
        <View style={style.familyMember}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AddFamilyForm');
            }}
            style={darkMode ? viewStyles.outer : viewStyles.outerLight}
          >
            <View style={viewStyles.toAdd}>
              <IconFont5
                name={'plus'}
                size={22}
                style={{ paddingVertical: 8, color: '#1380C3' }}
              />
            </View>
          </TouchableOpacity>
          <FamilyList navigateTo={props.navigation.navigate} />
        </View>
      </ScrollView>
    </View>
  );
};

const viewStyles = StyleSheet.create({
  outer: {
    borderRadius: 6,
    backgroundColor: '#1F1F1F',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
    width: '97%',
    height: 95,
    marginTop: 25,
    marginHorizontal: 7,
    alignItems: 'center',
    paddingTop: 30,
  },
  outerLight: {
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
    width: '97%',
    height: 95,
    marginTop: 25,
    marginHorizontal: 7,
    alignItems: 'center',
    paddingTop: 30,
  },
  toAdd: {
    width: 80,
    height: 40,
    borderRadius: 50,
    borderStyle: 'dashed',
    borderColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const style = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#1F1F1F',
  },
  containerLight: {
    minHeight: '100%',
    backgroundColor: '#ffffff',
  },
  content: {
    height: 85,
  },
  section: {
    flex: 1,
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addNewFamily: {
    width: 200,
    height: 50,
    backgroundColor: '#3C9D9B',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyMember: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    paddingBottom: 15,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 4,
    marginLeft: 10,
  },
  footer: {
    marginBottom: 10,
  },
});
export default connect(mapStateToProps, null)(addFamily);
