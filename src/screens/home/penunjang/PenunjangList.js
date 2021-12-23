import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { connect } from 'react-redux';
import { formatNumberToRupiah } from '../../../helpers/formatRupiah';
import RightArrow from '../../../assets/svg/RightArrow';
import InformationIcon from '../../../assets/svg/information';
import ClearableSearchBar from '../../../components/headers/ClearableSearchBar';
import LottieLoader from 'lottie-react-native';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;
const DUMMIES_TEST = [
  {
    test_id: '94c1182c-83e2-4455-a4de-b539794c2f73',
    test_name: 'Amylase Urine',
    speciment: 'Lain - Lain',
    price: 73900,
  },
  {
    test_id: '0a48fbbb-10da-4bc5-b7a3-0925845aca30',
    test_name: 'Kultur Faeces',
    speciment: 'Lain - Lain',
    price: 54300,
  },
  {
    test_id: '9d9d2c9d-2dd0-418d-9d4a-a5c30871930b',
    test_name: 'Billirubin Total',
    speciment: 'Serum',
    price: 34900,
  },
  {
    test_id: '4d2c19e0-f57e-4415-ae21-5fee457f4cd0',
    test_name: 'Bilirubin Direct',
    speciment: 'Serum',
    price: 74200,
  },
  {
    test_id: '62feceff-d696-4c83-b002-385f068ce020',
    test_name: 'Bilirubin Indirect',
    speciment: 'Serum',
    price: 75500,
  },
  {
    test_id: '065f7b8c-d790-43bb-b869-34f9ab294e0a',
    test_name: 'HBsAg',
    speciment: 'Serum',
    price: 62900,
  },
  {
    test_id: '92ce10f6-6c11-4e6f-9ca8-8ffaf0eeff2a',
    test_name: 'IgM Anti CMV',
    speciment: 'Lain - Lain',
    price: 71000,
  },
  {
    test_id: '9332250e-01d9-4bb3-ada4-d15da00fde19',
    test_name: 'CRP Kwalitatif ',
    speciment: 'Lain - Lain',
    price: 94400,
  },
  {
    test_id: 'b882fe3d-464f-4837-add8-9651f84acf82',
    test_name: 'Antibodi Tiroglobulin',
    speciment: 'Serum',
    price: 63700,
  },
  {
    test_id: 'd6b9ae89-f00f-453b-8c0f-43c118959f7f',
    test_name: 'Trombosit ',
    speciment: 'Darah',
    price: 69400,
  },
  {
    test_id: 'cc65e3dd-c902-4a15-8fef-a2652707e96b',
    test_name: 'Basofil',
    speciment: 'Darah',
    price: 98700,
  },
  {
    test_id: 'e681b6a3-8af7-451f-b7bd-b7c0fd836ffe',
    test_name: 'Limfosit',
    speciment: 'Darah',
    price: 90800,
  },
  {
    test_id: '68cfe969-7e38-4055-b9db-8510ad18c3bc',
    test_name: 'Hematokrit',
    speciment: 'Darah',
    price: 70000,
  },
  {
    test_id: '67a8a9f7-67eb-4d8b-84c5-28ffcbada3f8',
    test_name: 'Test LE',
    speciment: 'Darah',
    price: 89600,
  },
  {
    test_id: 'f492002a-6839-4180-8845-89f71e32c2dd',
    test_name: 'Glucosa Urine',
    speciment: 'Urine',
    price: 71400,
  },
  {
    test_id: 'b329250f-ee1c-4ce5-ad8b-b21c1d826cdd',
    test_name: 'Bakteri',
    speciment: 'Darah',
    price: 34800,
  },
  {
    test_id: 'a160cc48-e8e9-4ad9-a3dc-86ce09c74a59',
    test_name: 'Albumin-Creatinin Ratio (uACR) Sewaktu',
    speciment: 'Lain - Lain',
    price: 40800,
  },
  {
    test_id: '7f91e806-6179-4d00-8a50-cafa78dafcaa',
    test_name: 'Cholesterol Total',
    speciment: 'Serum',
    price: 40800,
  },
  {
    test_id: '4766c386-1ed4-45c6-9141-2f5e328c0d34',
    test_name: 'Glukosa 2 Jam PP',
    speciment: 'Lain - Lain',
    price: 91100,
  },
  {
    test_id: '19513345-d538-4558-9bb0-0a72c75714f6',
    test_name: 'Gambaran Sumsum Tulang',
    speciment: 'Darah',
    price: 84600,
  },
  {
    test_id: 'c5844608-e351-4c01-8ad9-6b667b50fcb3',
    test_name: 'Waktu Pendarahan',
    speciment: 'Darah',
    price: 70500,
  },
  {
    test_id: 'f53d4ed2-73c2-4620-9bf7-dcb1f2d62401',
    test_name: 'Waktu Pembekuan',
    speciment: 'Darah',
    price: 92800,
  },
  {
    test_id: '07e87362-9071-4a16-91e0-737b6d85747f',
    test_name: 'Waktu Protrombin',
    speciment: 'Darah',
    price: 34700,
  },
  {
    test_id: 'f48bbfde-9f28-4766-b81b-1a565c7948bc',
    test_name: 'APTT',
    speciment: 'Darah',
    price: 70800,
  },
  {
    test_id: '9997d28c-7466-4cdf-9144-13d4f02bc312',
    test_name: 'Fibrinogen',
    speciment: 'Darah',
    price: 78600,
  },
  {
    test_id: 'd15b5c25-39f9-4809-9245-edf5d34865a8',
    test_name: 'Tes Agregasi',
    speciment: 'Darah',
    price: 70500,
  },
  {
    test_id: '6fa819af-461a-4a75-a289-1644757381c1',
    test_name: 'Lekosit',
    speciment: 'Urine',
    price: 98100,
  },
  {
    test_id: '3346846e-0cc7-4a42-aa05-b7d2b77c8dbf',
    test_name: 'Glukosa Ad Random ',
    speciment: 'Lain - Lain',
    price: 91000,
  },
  {
    test_id: 'f2231973-22d9-4c53-a1df-dddc3ef989a2',
    test_name: 'Diplococcus ',
    speciment: 'Lain - Lain',
    price: 54200,
  },
  {
    test_id: '243b7c7e-085e-4230-b6c6-3a8928c1931f',
    test_name: 'INR',
    speciment: 'Darah',
    price: 59100,
  },
  {
    test_id: '6df8715a-34ac-444d-9ce6-18011f988866',
    test_name: 'Berat Jenis',
    speciment: 'Urine',
    price: 69900,
  },
  {
    test_id: '327336b6-66d6-45f3-b369-c01dd70ea34d',
    test_name: 'Leukosit',
    speciment: 'Urine',
    price: 37600,
  },
  {
    test_id: '80c5091e-7080-41b1-855e-070f25efae51',
    test_name: 'Blood',
    speciment: 'Urine',
    price: 72900,
  },
  {
    test_id: '51f9f7bf-2f99-4611-ac26-a9f8f8f9228a',
    test_name: 'Epitel',
    speciment: 'Urine',
    price: 51500,
  },
  {
    test_id: '3934f6b9-5fb8-4772-a002-7cd1a0fcf201',
    test_name: 'Kristal',
    speciment: 'Urine',
    price: 89200,
  },
  {
    test_id: 'dffccb68-16ae-453b-914f-ba638d703e91',
    test_name: 'Insulin',
    speciment: 'Urine',
    price: 48300,
  },
  {
    test_id: 'b16cd6ab-6b45-41f6-84aa-7e3bc2947335',
    test_name: 'IgG Anti HAV',
    speciment: 'Serum',
    price: 33800,
  },
  {
    test_id: '0d2839fc-7655-4e58-ae47-452cb93cae46',
    test_name: 'Anti HSV 2 IgM',
    speciment: 'Lain - Lain',
    price: 30400,
  },
  {
    test_id: 'b8044b35-3c7e-48d5-af13-e913bc88c865',
    test_name: 'Anti HSV 1 IgG',
    speciment: 'Lain - Lain',
    price: 44700,
  },
  {
    test_id: 'ab585a38-8f85-436b-8a9f-ed9f44a1175f',
    test_name: 'Pengecatan Gram ',
    speciment: 'Lain - Lain',
    price: 76700,
  },
  {
    test_id: 'b3ea6d5e-2bf7-4015-b64b-ff4f652e793d',
    test_name: 'Sputum BTA 1x Serial',
    speciment: 'Lain - Lain',
    price: 80300,
  },
  {
    test_id: 'd74d167e-056b-41c8-b0d9-6fd2c5c6b450',
    test_name: 'BTA Hari ke - 1',
    speciment: 'Lain - Lain',
    price: 46200,
  },
  {
    test_id: 'f6cad4d3-dd1d-455e-8ed3-b4535614c71d',
    test_name: 'BTA Hari ke - 3',
    speciment: 'Lain - Lain',
    price: 80300,
  },
  {
    test_id: 'cfcc1187-1714-4cea-8c9b-6bcca0002171',
    test_name: 'TCO2',
    speciment: 'Serum',
    price: 88800,
  },
  {
    test_id: '8de27e7b-ef10-4889-be7e-ca7d4c0e7818',
    test_name: 'PH Agda',
    speciment: 'Serum',
    price: 44800,
  },
  {
    test_id: '010c6198-9cba-4fe6-9a8e-a79831c3c9aa',
    test_name: 'Hemoglobin',
    speciment: 'Darah',
    price: 56000,
  },
  {
    test_id: 'e5ff9d9e-44f6-4655-ac2e-3c7920ab1fb1',
    test_name: 'Lekosit',
    speciment: 'Darah',
    price: 49100,
  },
  {
    test_id: '8a29cce9-7a4b-4d6c-a5fe-fd6d61ca97f0',
    test_name: 'MCHC',
    speciment: 'Darah',
    price: 72200,
  },
  {
    test_id: '8062fa61-b788-4d84-a1e1-3fc51c59b0eb',
    test_name: 'Hitung Jenis',
    speciment: 'Darah',
    price: 80100,
  },
  {
    test_id: '8a7d79f3-2af6-4420-9a46-95b5ccb11c49',
    test_name: 'Laju Endap Darah',
    speciment: 'Darah',
    price: 91800,
  },
  {
    test_id: 'c8ba19f4-218e-4f5a-9a71-c61dd965b612',
    test_name: 'Keton',
    speciment: 'Urine',
    price: 31400,
  },
  {
    test_id: '7a108f3e-4736-49ac-9098-f3797fbbe105',
    test_name: 'Chlorida Urine',
    speciment: 'Urine',
    price: 90800,
  },
  {
    test_id: 'e5299dc8-97c4-4d44-bb41-a182815e4639',
    test_name: 'Volume Urine',
    speciment: 'Serum',
    price: 52000,
  },
  {
    test_id: '055ce6a4-b3ca-45f1-84a6-217ba062240e',
    test_name: 'Test Darah Samar',
    speciment: 'Feaces',
    price: 38100,
  },
  {
    test_id: 'ffa7b594-7d02-4312-b095-cdc677c509ca',
    test_name: 'HBeAg',
    speciment: 'Serum',
    price: 78300,
  },
  {
    test_id: '442109de-24dd-45a1-9f83-bb234ac44d17',
    test_name: 'Morfologi',
    speciment: 'Lain - Lain',
    price: 40900,
  },
  {
    test_id: '2d5c561d-061e-40dd-8aee-86ac1e863a60',
    test_name: 'Pergerakan Aktif',
    speciment: 'Lain - Lain',
    price: 94000,
  },
  {
    test_id: '4e0c28fd-655e-4d6b-89f7-8b7083f7111f',
    test_name: 'Pergerakan Mati',
    speciment: 'Lain - Lain',
    price: 46900,
  },
  {
    test_id: 'c9954735-0ee6-4927-a82e-7e2bf18bbbcd',
    test_name: 'PH',
    speciment: 'Lain - Lain',
    price: 93800,
  },
  {
    test_id: '595bdf49-bb4e-4df7-9be6-0b4bd5858112',
    test_name: 'SH',
    speciment: 'Lain - Lain',
    price: 37700,
  },
  {
    test_id: '9a6831ef-6b7d-46ab-aa1d-7ed18ff3c6d3',
    test_name: 'Kreatinin Pre HD',
    speciment: 'Serum',
    price: 70400,
  },
  {
    test_id: '91362576-e0ac-4772-8365-327124a101c1',
    test_name: 'Phenytoin Darah',
    speciment: 'Lain - Lain',
    price: 76100,
  },
  {
    test_id: 'bb102f88-8021-4962-8868-e9752e9bce61',
    test_name: 'Kejernihan',
    speciment: 'Urine',
    price: 39000,
  },
  {
    test_id: 'ba2a770e-8fbe-49f2-9ee7-16c430a08d2b',
    test_name: 'PH',
    speciment: 'Urine',
    price: 56300,
  },
  {
    test_id: 'ea108806-7e55-4a72-b94e-25236f28e305',
    test_name: 'Protein Urine',
    speciment: 'Urine',
    price: 75400,
  },
  {
    test_id: 'c74a8200-7725-478d-ba91-e7243da904d6',
    test_name: 'Silinder',
    speciment: 'Urine',
    price: 92000,
  },
  {
    test_id: '39f8ca44-2118-452d-a338-23d9486d62a7',
    test_name: 'Mikroalbuminuria (MAU)',
    speciment: 'Urine',
    price: 47500,
  },
  {
    test_id: '2f263e26-1267-4bec-802d-5e1933183bc8',
    test_name: 'Darah',
    speciment: 'Feaces',
    price: 51600,
  },
  {
    test_id: '211e9a78-64d6-4558-b358-27f3b70d27e0',
    test_name: 'Lendir',
    speciment: 'Feaces',
    price: 86500,
  },
  {
    test_id: '9501e8a7-af84-4a2a-98a9-6dd256d57a4f',
    test_name: 'Konsistensi',
    speciment: 'Feaces',
    price: 88800,
  },
  {
    test_id: 'e9abdc22-a880-474c-bd04-5129c87a38aa',
    test_name: 'Telur Cacing',
    speciment: 'Feaces',
    price: 51000,
  },
  {
    test_id: '073b92e7-0369-43eb-8069-f29fec709d88',
    test_name: 'Amoeba',
    speciment: 'Feaces',
    price: 59100,
  },
  {
    test_id: '6a523133-5468-4b7d-940c-8298c4a03429',
    test_name: 'Sel Leukosit',
    speciment: 'Feaces',
    price: 46500,
  },
  {
    test_id: 'b188d988-bcd3-4529-9b2d-6feba0769476',
    test_name: 'Sel Eritrosit',
    speciment: 'Feaces',
    price: 57800,
  },
  {
    test_id: '4b4dfd3f-e49b-419d-93a9-1c826ff45541',
    test_name: 'Warna',
    speciment: 'Feaces',
    price: 82500,
  },
  {
    test_id: '8b298f82-763c-4cd1-8b5b-a80edc31a45b',
    test_name: 'IgM Anti HAV',
    speciment: 'Serum',
    price: 93100,
  },
  {
    test_id: '44a397c3-664b-4368-954b-f0f135ad2274',
    test_name: 'Anti HSV 2 IgG',
    speciment: 'Lain - Lain',
    price: 40200,
  },
  {
    test_id: 'e457dc19-19a2-4133-8402-b85c63f35312',
    test_name: 'IgM Anti Toksoplasma ',
    speciment: 'Lain - Lain',
    price: 63300,
  },
  {
    test_id: '2d21ca52-15e1-4f24-bb75-9f6459fc5ed9',
    test_name: 'IgG Anti CMV',
    speciment: 'Lain - Lain',
    price: 55000,
  },
  {
    test_id: '97a27a11-fdd5-4915-a51b-e5507c6a2639',
    test_name: 'PA Kecil BAHAN dr Brayan status SOSIAL',
    speciment: 'Lain - Lain',
    price: 49400,
  },
  {
    test_id: '383747dc-eff3-46be-8d71-204717ae9aa7',
    test_name: 'Golongan Darah',
    speciment: 'Darah',
    price: 39600,
  },
  {
    test_id: '726adf87-082a-4131-994f-600c1b752730',
    test_name: 'G6PD',
    speciment: 'Darah',
    price: 74200,
  },
  {
    test_id: '2240e361-3b32-48d8-b8a7-75134a5df2d1',
    test_name: "Coomb's Test Direct",
    speciment: 'Darah',
    price: 89300,
  },
  {
    test_id: 'eca5f2c3-658a-4c24-ad0d-088e732b3f69',
    test_name: "Coomb's Test Indirect",
    speciment: 'Darah',
    price: 83000,
  },
  {
    test_id: '75691a1d-4372-4d3d-8500-40b73a897617',
    test_name: 'Malaria',
    speciment: 'Darah',
    price: 62200,
  },
  {
    test_id: '244b2459-71b1-4aa7-991f-8be110a8cc14',
    test_name: 'Eritrosit',
    speciment: 'Urine',
    price: 47400,
  },
  {
    test_id: '025fca26-9e8a-429f-aafe-79ee864328b7',
    test_name: 'FNAB (Biopsi Aspirasi)',
    speciment: 'Lain - Lain',
    price: 55800,
  },
  {
    test_id: '6efd8559-04f5-4543-ac59-f10356197bb8',
    test_name: 'Ureum',
    speciment: 'Serum',
    price: 48900,
  },
  {
    test_id: 'df88abeb-1653-4483-89b8-9595a34441c6',
    test_name: 'ANA (IF)',
    speciment: 'Lain - Lain',
    price: 99700,
  },
  {
    test_id: '6ff38793-6406-4827-8539-736a558137fa',
    test_name: 'ANA Profile',
    speciment: 'Lain - Lain',
    price: 95800,
  },
  {
    test_id: '70405e19-c368-4c85-8417-5b9c3269cdbb',
    test_name: 'NS 1',
    speciment: 'Lain - Lain',
    price: 97200,
  },
  {
    test_id: '24793ab6-810f-4182-a9e6-dbb652de126b',
    test_name: 'Test Kehamilan',
    speciment: 'Urine',
    price: 69500,
  },
  {
    test_id: 'e1ddb2de-9cd5-474c-b92e-7f75bf2287ca',
    test_name: 'Kalium Urine',
    speciment: 'Urine',
    price: 52200,
  },
  {
    test_id: '0aaadc9c-2bd3-42c9-84eb-742cfba311c3',
    test_name: 'Asam Urat Urine',
    speciment: 'Urine',
    price: 55700,
  },
  {
    test_id: '2724bc2f-af9c-4825-870b-dc9b114998b1',
    test_name: 'Calsium Urine',
    speciment: 'Urine',
    price: 96600,
  },
  {
    test_id: '6068e8a5-0445-4c23-8bf4-548857160955',
    test_name: 'Natrium Urine',
    speciment: 'Urine',
    price: 57000,
  },
  {
    test_id: '784586c0-5e78-4305-998c-fc03ec84940a',
    test_name: 'Protein Urine Kwalitatif',
    speciment: 'Urine',
    price: 52000,
  },
  {
    test_id: '117a089f-3a4e-4fce-98e0-4e09d656af03',
    test_name: 'Kholinesterase',
    speciment: 'Serum',
    price: 80000,
  },
  {
    test_id: '4e2165d1-bfcc-4fc4-bfbc-1ed43f317fa3',
    test_name: 'Kreatinin',
    speciment: 'Lain - Lain',
    price: 87600,
  },
  {
    test_id: '03bfd09a-0822-448a-bc3a-2cbe20f30598',
    test_name: 'Kreatinin Klirens',
    speciment: 'Serum',
    price: 82400,
  },
  {
    test_id: 'bae7b354-0598-4c20-83d2-9ff399332e78',
    test_name: 'Hepatitis C ( HCV )',
    speciment: 'Serum',
    price: 40400,
  },
  {
    test_id: 'f1c39831-18a0-411b-b902-f81f433aaaec',
    test_name: 'IgG Anti Calameydia ',
    speciment: 'Lain - Lain',
    price: 34000,
  },
  {
    test_id: '7acbfeb4-82c6-4c14-81c8-2e321f1b75b3',
    test_name: 'IgM Anti Calameydia ',
    speciment: 'Lain - Lain',
    price: 44300,
  },
  {
    test_id: '4b1b8599-5822-48d4-ab09-114978228d44',
    test_name: 'Kultur Darah',
    speciment: 'Lain - Lain',
    price: 87300,
  },
  {
    test_id: '18884341-70f3-44a5-b44b-17104fe0f8be',
    test_name: 'Sedimen Urine',
    speciment: 'Urine',
    price: 65100,
  },
  {
    test_id: '02b8cdec-0a27-44d0-b928-51a5140aefdd',
    test_name: 'Lain - Lain',
    speciment: 'Urine',
    price: 81000,
  },
  {
    test_id: 'e122f31d-eeb4-423b-aebe-1ef3e94a4187',
    test_name: 'SGOT',
    speciment: 'Serum',
    price: 68100,
  },
  {
    test_id: '321975a2-f441-4c6f-b5c1-4285d687f322',
    test_name: 'SGPT',
    speciment: 'Serum',
    price: 72800,
  },
  {
    test_id: '9fe59e76-e7c7-48ee-8a92-579cfaa2654e',
    test_name: 'Albumin',
    speciment: 'Serum',
    price: 51600,
  },
  {
    test_id: 'c1c42a44-452d-4eef-8974-0c2a933b079c',
    test_name: 'Elektroforesa Protein',
    speciment: 'Serum',
    price: 89000,
  },
  {
    test_id: 'b2ff0a83-b656-42b1-a84f-d7cfac5e4239',
    test_name: 'Asam Urat',
    speciment: 'Serum',
    price: 54700,
  },
  {
    test_id: 'be78e035-0a97-44f2-8743-3973266ac375',
    test_name: 'Anti HBs',
    speciment: 'Serum',
    price: 68600,
  },
  {
    test_id: 'bdd6ae8d-3615-49ca-b615-a282d1e916bf',
    test_name: 'Anti HSV 1 IgM',
    speciment: 'Lain - Lain',
    price: 64900,
  },
  {
    test_id: '89442a6b-f96d-4e65-8d5c-df3dc4a1bb1c',
    test_name: 'IgG Anti DHF(Dengue)',
    speciment: 'Lain - Lain',
    price: 95600,
  },
  {
    test_id: 'd0e37723-b592-49e2-8ff4-330ae97b7cfe',
    test_name: 'Warna',
    speciment: 'Urine',
    price: 65900,
  },
  {
    test_id: '2201897c-6bef-4513-8abe-2031edd2206e',
    test_name: 'Urobilinogen',
    speciment: 'Urine',
    price: 61400,
  },
  {
    test_id: 'c605dc33-d3f1-4af2-a569-6125c09f78e2',
    test_name: 'Ureum Urine',
    speciment: 'Serum',
    price: 48100,
  },
  {
    test_id: '2c1064c2-b63e-4ba8-bae9-8fd652f08d85',
    test_name: 'Gamma GT',
    speciment: 'Serum',
    price: 49500,
  },
  {
    test_id: 'eb5a7790-a28e-491b-b935-69f1a3a26a98',
    test_name: 'Fosfatase Alkali',
    speciment: 'Serum',
    price: 82500,
  },
  {
    test_id: 'fd92e837-802e-4443-98f2-504e5ec492d3',
    test_name: 'Total Protein',
    speciment: 'Serum',
    price: 54500,
  },
  {
    test_id: '4cd0c970-3358-41fb-a5be-d716ec1787fb',
    test_name: 'Globulin',
    speciment: 'Serum',
    price: 58600,
  },
  {
    test_id: 'c6d626bc-5de5-4e76-97c4-bd5f58284a61',
    test_name: 'Gamma Globulin',
    speciment: 'Serum',
    price: 91000,
  },
  {
    test_id: 'ceaf535a-055c-4a15-8e65-a59fa1dd4440',
    test_name: 'HBsAg (Positif/Negatif)',
    speciment: 'Serum',
    price: 82500,
  },
  {
    test_id: 'e3efe3f0-3686-400a-b468-bc8f43ffb43f',
    test_name: 'Anti HAV',
    speciment: 'Serum',
    price: 97300,
  },
  {
    test_id: '2a48c87b-1544-419c-8cae-f906cc98d0ac',
    test_name: 'Anti HBc IgM',
    speciment: 'Serum',
    price: 97600,
  },
  {
    test_id: '25d3e020-a0d5-4220-9e32-b3e241705c17',
    test_name: 'Kreatinin Darah',
    speciment: 'Serum',
    price: 98300,
  },
  {
    test_id: '7bf62e48-74eb-44aa-bc98-18b263ccc19c',
    test_name: 'lge total',
    speciment: 'Lain - Lain',
    price: 95500,
  },
  {
    test_id: '44f50dfd-2ccf-47c8-a909-dff382795864',
    test_name: 'MCH',
    speciment: 'Darah',
    price: 37100,
  },
  {
    test_id: 'd83c985f-e1b2-4eb9-b9e0-973806f379c3',
    test_name: 'Retikulosit',
    speciment: 'Darah',
    price: 31300,
  },
  {
    test_id: 'ae308e15-86f5-4ff9-ac31-df5f1dc16792',
    test_name: 'Ferous',
    speciment: 'Darah',
    price: 72200,
  },
  {
    test_id: '3276678d-ca00-43b7-8c96-d2ee15faaae1',
    test_name: 'TIBC',
    speciment: 'Darah',
    price: 67500,
  },
  {
    test_id: 'f8adae0f-6c69-4ae2-844b-c3efa6b25b3f',
    test_name: 'Vitamin B12',
    speciment: 'Darah',
    price: 56100,
  },
  {
    test_id: '3821afdf-3aae-48f8-a427-7ac68ab32e63',
    test_name: 'Elektroforesis Hb',
    speciment: 'Lain - Lain',
    price: 91500,
  },
  {
    test_id: 'e932c01d-822b-4ecd-94a3-01a739681dfd',
    test_name: 'Sel LE',
    speciment: 'Darah',
    price: 74000,
  },
  {
    test_id: 'a0bd98d1-1828-4c1f-8ad9-9682991b7028',
    test_name: 'IgM Anti HCV',
    speciment: 'Serum',
    price: 79300,
  },
  {
    test_id: '629e2841-82c3-4ad2-8e1e-0999b5eb6725',
    test_name: 'Anti HBc',
    speciment: 'Serum',
    price: 89000,
  },
  {
    test_id: '793d7131-c116-4eeb-91cb-414eb7ae1af0',
    test_name: 'Anti-DHF Rapid',
    speciment: 'Lain - Lain',
    price: 82100,
  },
  {
    test_id: 'a831f540-d70c-4dc8-93c7-19d5d566dc46',
    test_name: 'UIBC',
    speciment: 'Darah',
    price: 34200,
  },
  {
    test_id: 'e6bc2fb8-4de8-4f36-8af5-d87f3f61e782',
    test_name: 'Monosit',
    speciment: 'Darah',
    price: 72800,
  },
  {
    test_id: '68055d21-93f7-4733-8b2c-d2ef1887ac66',
    test_name: 'Ferritin',
    speciment: 'Darah',
    price: 36300,
  },
  {
    test_id: '961bc5a1-661e-4ca0-8604-87c410748593',
    test_name: 'Gambaran Darah Tepi',
    speciment: 'Darah',
    price: 74000,
  },
  {
    test_id: 'a90cfb2b-6313-4f3f-965c-b6299c03d627',
    test_name: 'D-Dimer',
    speciment: 'Darah',
    price: 44000,
  },
  {
    test_id: '614802c9-2fe4-4c4e-8149-8ea9a524f79c',
    test_name: 'Viskositas Darah',
    speciment: 'Darah',
    price: 72300,
  },
  {
    test_id: 'fced27ad-3a17-477c-9475-d75eb347f902',
    test_name: 'Natrium',
    speciment: 'Serum',
    price: 96600,
  },
  {
    test_id: '1141bcc5-0538-4b48-921c-8ba5d0550f11',
    test_name: 'CEA ',
    speciment: 'Lain - Lain',
    price: 30900,
  },
  {
    test_id: 'd35b6175-8e01-4be4-844a-056d82f88fb1',
    test_name: 'CA 19-9',
    speciment: 'Lain - Lain',
    price: 82600,
  },
  {
    test_id: '84c70121-4dc7-49c9-bed7-4bc161e69050',
    test_name: 'Free PSA',
    speciment: 'Lain - Lain',
    price: 40100,
  },
  {
    test_id: '3522f3fa-5f42-42b8-add7-f9549251740b',
    test_name: 'Neuron Spesifik Enolase',
    speciment: 'Lain - Lain',
    price: 47400,
  },
  {
    test_id: '4b0b2229-448d-4fc5-9c16-2554ef5b9243',
    test_name: 'Trigliserida',
    speciment: 'Serum',
    price: 59500,
  },
  {
    test_id: '8f0d6e63-4303-40fe-93a8-bfbd57f100e5',
    test_name: 'HDL Cholesterol ',
    speciment: 'Lain - Lain',
    price: 99200,
  },
  {
    test_id: 'e98d0194-d7b3-4657-975a-eacf522b6d20',
    test_name: 'Total Lipid',
    speciment: 'Lain - Lain',
    price: 86800,
  },
  {
    test_id: 'de24fedf-ac42-4250-9dc1-0c2a74497664',
    test_name: 'Glukosa Puasa ',
    speciment: 'Lain - Lain',
    price: 50100,
  },
  {
    test_id: 'f5dbb401-1e02-4cdd-b966-b89a7b243fb1',
    test_name: 'Glukosa Sewaktu ',
    speciment: 'Lain - Lain',
    price: 97800,
  },
  {
    test_id: '610b63b0-ce89-4853-ab60-a3e09fbe594f',
    test_name: 'Kalium',
    speciment: 'Serum',
    price: 37400,
  },
  {
    test_id: '14be4e3a-806f-461e-bc7d-cd10a454e9a5',
    test_name: 'Chlorida',
    speciment: 'Serum',
    price: 64300,
  },
  {
    test_id: '9fda166a-8fe3-4566-a8d5-c5e2085eeb0d',
    test_name: 'Fosfor Anorganik (P)',
    speciment: 'Serum',
    price: 84100,
  },
  {
    test_id: '22f312b2-8ac0-4b7c-913f-f518bada6153',
    test_name: 'Alphafeto Protein (AFP)',
    speciment: 'Lain - Lain',
    price: 57700,
  },
  {
    test_id: 'eb3c317d-8230-4d77-b9db-c62155215445',
    test_name: 'SCC',
    speciment: 'Lain - Lain',
    price: 93000,
  },
  {
    test_id: 'bda878a7-251f-489f-b91f-ddb283d4326a',
    test_name: 'Paps Smear Liquid',
    speciment: 'Lain - Lain',
    price: 92100,
  },
  {
    test_id: 'f1fb1f29-a3b9-42e8-8628-660f3c6b7529',
    test_name: 'Apo B',
    speciment: 'Darah',
    price: 48800,
  },
  {
    test_id: 'a0602379-3754-4219-a2f5-c48e08905011',
    test_name: 'C-Peptide',
    speciment: 'Lain - Lain',
    price: 70700,
  },
  {
    test_id: 'a15cb907-7deb-4ff0-9908-f733ead6c749',
    test_name: 'Glukosa (Stik)',
    speciment: 'Lain - Lain',
    price: 70100,
  },
  {
    test_id: '741c0ff3-c140-4d70-9873-eb99a117bd41',
    test_name: 'Glukosa Toleransi Test',
    speciment: 'Lain - Lain',
    price: 89800,
  },
  {
    test_id: 'f760fac2-4600-469b-807e-16db202b80ab',
    test_name: 'ASTO Kwalitatif',
    speciment: 'Lain - Lain',
    price: 74700,
  },
  {
    test_id: '22971591-7cdb-4990-9507-e959521e0ffd',
    test_name: 'Rheumatoid Artritis Kwalitatif ',
    speciment: 'Lain - Lain',
    price: 44200,
  },
  {
    test_id: 'b39265cb-8b27-4352-83f8-46f00ee81638',
    test_name: 'Seramoeba',
    speciment: 'Lain - Lain',
    price: 40000,
  },
  {
    test_id: '41660119-95e6-46c8-945b-eb738ece922c',
    test_name: 'CA 125',
    speciment: 'Lain - Lain',
    price: 39900,
  },
  {
    test_id: '29e13019-889a-4999-a1cb-bfe1f3991bb7',
    test_name: 'Estradiol',
    speciment: 'Lain - Lain',
    price: 36600,
  },
  {
    test_id: 'be2fa356-c5e2-4e55-a937-df3f9ee2dc95',
    test_name: 'FSH',
    speciment: 'Lain - Lain',
    price: 65700,
  },
  {
    test_id: '1a32fb56-0cc5-47db-b5e9-7fc9cfff770e',
    test_name: 'LH',
    speciment: 'Lain - Lain',
    price: 96900,
  },
  {
    test_id: '97b560cd-bfb1-450c-818c-9a5a6a0df8a1',
    test_name: 'Progesteron',
    speciment: 'Lain - Lain',
    price: 72700,
  },
  {
    test_id: '69060edc-7863-46d0-96ed-6f46c5ece2dd',
    test_name: 'Kreatinine Urine',
    speciment: 'Urine',
    price: 41400,
  },
  {
    test_id: 'f73d2288-1f7e-468a-828c-4241510caaa0',
    test_name: 'Protein Urine Kwantitatif',
    speciment: 'Urine',
    price: 72600,
  },
  {
    test_id: '66f476ee-3a12-4ce8-bbe0-4dcdef1a8a46',
    test_name: 'Salmonella H Paratyphi (a)',
    speciment: 'Lain - Lain',
    price: 98000,
  },
  {
    test_id: 'b60efa24-72ab-4bf0-97db-af3232a73e69',
    test_name: 'Salmonella H Paratyphi (b)',
    speciment: 'Lain - Lain',
    price: 93900,
  },
  {
    test_id: '68a6e02a-c337-46c0-be3b-df0807965955',
    test_name: 'ASTO Kwantitatif',
    speciment: 'Lain - Lain',
    price: 50700,
  },
  {
    test_id: 'fce11516-717c-47ea-a61c-0bb497798afe',
    test_name: 'Anti DS DNA',
    speciment: 'Lain - Lain',
    price: 92800,
  },
  {
    test_id: 'b51cd62b-30fd-48f1-a949-c1f273768c48',
    test_name: 'B-HCG Kuantitatif',
    speciment: 'Lain - Lain',
    price: 78000,
  },
  {
    test_id: 'fdce3e44-cbf9-40d3-91b7-770b9f88a7ff',
    test_name: 'Analisa Sperma',
    speciment: 'Lain - Lain',
    price: 89200,
  },
  {
    test_id: 'a159f0c8-8f3c-45dc-8cc8-784da0c7f644',
    test_name: 'Amylase Darah',
    speciment: 'Lain - Lain',
    price: 70500,
  },
  {
    test_id: '96953c88-7631-40d8-97a8-2083bcf6a3bb',
    test_name: 'Lipase Darah',
    speciment: 'Lain - Lain',
    price: 98100,
  },
  {
    test_id: 'd788c7db-4a1e-4ee5-a37f-12bae9105b59',
    test_name: 'Magnesium',
    speciment: 'Serum',
    price: 76200,
  },
  {
    test_id: '0aed0f3a-538c-4d67-b354-16280ac2c468',
    test_name: 'Creatine Kinase',
    speciment: 'Lain - Lain',
    price: 75900,
  },
  {
    test_id: 'ac41dd75-bff0-4789-b35e-7a647032e83c',
    test_name: 'VDRL (Kwalitatif)',
    speciment: 'Lain - Lain',
    price: 78600,
  },
  {
    test_id: '370adcbb-8d06-4e06-9311-bd562cf5ce84',
    test_name: 'H. Pylori IgG',
    speciment: 'Lain - Lain',
    price: 83900,
  },
  {
    test_id: '5bac2cee-a09a-40d6-945a-e85d607964bb',
    test_name: 'TPHA (Kwalitatif)',
    speciment: 'Lain - Lain',
    price: 59900,
  },
  {
    test_id: '64241b72-1b92-4957-bfb3-c759ffaf4d59',
    test_name: 'IgM Anti DHF(Dengue)',
    speciment: 'Lain - Lain',
    price: 75000,
  },
  {
    test_id: '3d9b18da-fdaf-4965-b327-32f29cb510a0',
    test_name: 'TSH',
    speciment: 'Lain - Lain',
    price: 95900,
  },
  {
    test_id: '9c0b2ffd-8ab5-44ef-a72f-cf19faee7c77',
    test_name: 'Free T4',
    speciment: 'Lain - Lain',
    price: 30200,
  },
  {
    test_id: '847685c9-2366-4572-b91b-73ea58f46459',
    test_name: 'T3',
    speciment: 'Lain - Lain',
    price: 89800,
  },
  {
    test_id: '0ea9e2ac-eeeb-453c-9001-a95fbdeed738',
    test_name: 'Thyroid Binding Globulin',
    speciment: 'Darah',
    price: 67900,
  },
  {
    test_id: '4b71489c-f816-47ca-a610-46f6d6a408fa',
    test_name: 'Bilirubbin Urine',
    speciment: 'Urine',
    price: 94500,
  },
  {
    test_id: '9242b881-9333-4a8e-ac54-256f73da208b',
    test_name: 'Paps Smear Konvensional',
    speciment: 'Lain - Lain',
    price: 52300,
  },
  {
    test_id: '0471d0da-b601-440a-9460-0a86bbf6cd91',
    test_name: 'HCV RNA Genotipyng',
    speciment: 'Lain - Lain',
    price: 34600,
  },
  {
    test_id: '2af4313c-cec9-4ddf-aefa-dec7a1818454',
    test_name: 'Tes HIV 3 Metode',
    speciment: 'Lain - Lain',
    price: 97400,
  },
  {
    test_id: '7337aeaf-2533-4c30-aa41-d18c5a18f583',
    test_name: 'Rheumatoid Artritis Kwantitatif',
    speciment: 'Lain - Lain',
    price: 51400,
  },
  {
    test_id: 'bad4c04b-f1e7-45cc-b2a8-88e35088aacc',
    test_name: 'Rapid Antibodi Covid-19',
    speciment: 'Lain - Lain',
    price: 85600,
  },
  {
    test_id: '8b36eb59-3334-45cf-a7de-d1634310708e',
    test_name: 'Rapid Antigen Covid-19 (Swab)',
    speciment: 'Lain - Lain',
    price: 67200,
  },
  {
    test_id: '4ba8b03d-3738-450a-8f28-41170a452c2a',
    test_name: 'C4-Complemen',
    speciment: 'Lain - Lain',
    price: 86400,
  },
  {
    test_id: 'c9a72063-ee1c-4adb-8a44-812355b1b38f',
    test_name: 'Anti CCP',
    speciment: 'Lain - Lain',
    price: 58200,
  },
  {
    test_id: 'e71c03f7-a5c0-47c3-a11b-192a2b81748d',
    test_name: 'IgE Total',
    speciment: 'Lain - Lain',
    price: 97500,
  },
  {
    test_id: 'b533c740-0b13-4a71-9795-a515c380a284',
    test_name: 'Lp (a)',
    speciment: 'Lain - Lain',
    price: 46100,
  },
  {
    test_id: 'ef9150c8-6e1e-49d3-9002-5e7e83e56d0e',
    test_name: 'HbA1C',
    speciment: 'Lain - Lain',
    price: 44300,
  },
  {
    test_id: 'dbdb9b4c-74a3-4b97-a0e0-e452ff922912',
    test_name: 'LDH',
    speciment: 'Lain - Lain',
    price: 93900,
  },
  {
    test_id: '2f651134-da30-47b1-9dc5-a3dea73bedf8',
    test_name: 'CKMB',
    speciment: 'Lain - Lain',
    price: 58200,
  },
  {
    test_id: '4ad77852-3873-44da-a1d6-9dbefae26a38',
    test_name: 'Troponin-T',
    speciment: 'Lain - Lain',
    price: 77100,
  },
  {
    test_id: '4d9c5286-1837-41b9-8fc6-97c9d811bfde',
    test_name: 'Anti HIV (Rapid)',
    speciment: 'Lain - Lain',
    price: 68100,
  },
  {
    test_id: 'f826319b-a4a1-4bdf-afbe-87fd6dc30048',
    test_name: 'IgG  ACA ',
    speciment: 'Lain - Lain',
    price: 70700,
  },
  {
    test_id: 'c773940c-8a23-46f6-b8d8-3194ccc8c063',
    test_name: 'ANA Test',
    speciment: 'Lain - Lain',
    price: 96700,
  },
  {
    test_id: 'ee45ffa3-cedb-4da6-89f8-7ce6357cd2eb',
    test_name: 'Helicobacter Pylori Antibody',
    speciment: 'Lain - Lain',
    price: 30400,
  },
  {
    test_id: '2a0feed2-5d9d-49d3-8377-76d6770cdc40',
    test_name: 'ICT-TB',
    speciment: 'Lain - Lain',
    price: 87200,
  },
  {
    test_id: 'd56871bf-98f9-40e3-be23-1f4bc49b17ce',
    test_name: 'LDH  Cairan',
    speciment: 'Lain - Lain',
    price: 87700,
  },
  {
    test_id: '675441d6-e91d-4c5a-85df-9acdf2b3ccd2',
    test_name: 'Nitrit',
    speciment: 'Urine',
    price: 49200,
  },
  {
    test_id: '3b67989f-6c6d-480a-97de-48b55f05bdc3',
    test_name: 'Biopsi Jaringan',
    speciment: 'Lain - Lain',
    price: 70400,
  },
  {
    test_id: '9d399c53-9bf5-4081-8b8a-8f6a50f92d05',
    test_name: 'Fosfatase Asam (ACP)',
    speciment: 'Lain - Lain',
    price: 87900,
  },
  {
    test_id: 'c16b3ad7-59ca-40d6-8fe9-def76f399de7',
    test_name: 'Calsium Ion',
    speciment: 'Serum',
    price: 97600,
  },
  {
    test_id: 'cc459bfe-5e91-4db8-8f9f-538dbe4b97fa',
    test_name: 'Calsium Total',
    speciment: 'Serum',
    price: 74700,
  },
  {
    test_id: '8dd9c8fe-ee6c-4b7f-91c1-3230ce9d2dba',
    test_name: 'T3 Uptake',
    speciment: 'Urine',
    price: 46300,
  },
  {
    test_id: '041dcb3d-1508-4c05-a748-6110859d8f0f',
    test_name: 'T4',
    speciment: 'Serum',
    price: 47500,
  },
  {
    test_id: 'c1c7f244-348a-424a-a4a8-caa75c49d67f',
    test_name: 'Sputum BTA 3x Serial',
    speciment: 'Lain - Lain',
    price: 98300,
  },
  {
    test_id: 'bcc928a0-ef93-4932-a581-47764090a637',
    test_name: 'BTA Hari ke - 2',
    speciment: 'Lain - Lain',
    price: 44400,
  },
  {
    test_id: '59e169f0-aa7c-4c56-9dde-39469ddd93b1',
    test_name: 'Alkali Reserve (HCO3)',
    speciment: 'Serum',
    price: 90100,
  },
  {
    test_id: 'a19d1a1a-edb6-4abc-8488-ef9052d03151',
    test_name: 'PCO2',
    speciment: 'Serum',
    price: 54300,
  },
  {
    test_id: '9fe041cf-e8ed-44ea-aedc-72897ce3530e',
    test_name: 'PO2',
    speciment: 'Serum',
    price: 51300,
  },
  {
    test_id: 'bbbab8ae-c279-40ed-bc1e-612766ea5c59',
    test_name: 'HCO3',
    speciment: 'Serum',
    price: 80700,
  },
  {
    test_id: 'c924df07-efc7-49aa-8b73-adfc6745ed20',
    test_name: 'B exes',
    speciment: 'Serum',
    price: 93100,
  },
  {
    test_id: 'd6bfbbc5-b3ac-4888-bdbf-9803e97a9ff9',
    test_name: 'VDRL',
    speciment: 'Lain - Lain',
    price: 34400,
  },
  {
    test_id: '7cff8119-5828-4474-ac22-a2006b92411c',
    test_name: 'Kultur Throat Swab',
    speciment: 'Lain - Lain',
    price: 75500,
  },
  {
    test_id: '9867498a-a15a-46e8-8e77-519e6d1401f9',
    test_name: 'Kultur Sekret',
    speciment: 'Lain - Lain',
    price: 73700,
  },
  {
    test_id: '3e44d827-e00e-4da2-b7a6-e1b0b48038fb',
    test_name: 'Kultur Cairan ',
    speciment: 'Lain - Lain',
    price: 91300,
  },
  {
    test_id: '17f35d19-ab6d-4400-88f6-4756697baf47',
    test_name: 'Kultur Pus',
    speciment: 'Lain - Lain',
    price: 76800,
  },
  {
    test_id: 'b7a21342-75af-4ceb-9969-a1097d182a51',
    test_name: 'Kultur Sputum ',
    speciment: 'Lain - Lain',
    price: 50000,
  },
  {
    test_id: 'b14c2f5d-8abc-4d4d-9245-012ad8049441',
    test_name: 'Kultur BTA ',
    speciment: 'Lain - Lain',
    price: 67400,
  },
  {
    test_id: '396029b3-b1d5-45da-9ad8-225cb85af721',
    test_name: 'KOH 10%',
    speciment: 'Lain - Lain',
    price: 95900,
  },
  {
    test_id: '685d082f-0d43-4790-b095-afec097fecf9',
    test_name: 'BTA ',
    speciment: 'Lain - Lain',
    price: 71800,
  },
  {
    test_id: '5de2dc39-66be-4b4f-9c4d-10446a357787',
    test_name: 'Trichomonas  ',
    speciment: 'Lain - Lain',
    price: 44500,
  },
  {
    test_id: '67015823-69cb-4ac8-81c0-b7e9c65748bd',
    test_name: 'Candida Albican/Jamur',
    speciment: 'Lain - Lain',
    price: 82000,
  },
  {
    test_id: 'b8cff996-ccaf-40ac-98bc-7116b53d93b9',
    test_name: 'Rhesus',
    speciment: 'Darah',
    price: 40900,
  },
  {
    test_id: '0685f812-b8f3-4a81-8b64-ced865606e64',
    test_name: 'Eritrosit',
    speciment: 'Darah',
    price: 95000,
  },
  {
    test_id: 'c3f70ef0-b7a8-4a80-af97-32195f3a5d7e',
    test_name: 'MCV',
    speciment: 'Darah',
    price: 45300,
  },
  {
    test_id: 'b7f5a3e2-2bfa-489f-8843-24fa17833d18',
    test_name: 'H. Pylori IgM ',
    speciment: 'Lain - Lain',
    price: 92200,
  },
  {
    test_id: '10f5af36-efa5-4503-9a4a-ff64e890aa8a',
    test_name: 'Transferin',
    speciment: 'Darah',
    price: 62000,
  },
  {
    test_id: 'f66a5c99-0c0d-444c-84c0-528c14980d8c',
    test_name: 'Asam Folat',
    speciment: 'Darah',
    price: 57100,
  },
  {
    test_id: '975b57a3-066e-4984-81aa-0293bcd53e63',
    test_name: 'Trombosit Owren',
    speciment: 'Darah',
    price: 77500,
  },
  {
    test_id: '91ed34ed-7f2f-4a5a-9f5b-b171b69590c9',
    test_name: 'Jumlah Trombosit',
    speciment: 'Darah',
    price: 71600,
  },
  {
    test_id: '913a7f3a-0805-4bf3-be33-78d240150318',
    test_name: 'IgG Anti Rubella',
    speciment: 'Lain - Lain',
    price: 41600,
  },
  {
    test_id: '1e9368a6-90b9-4303-bf47-64d80c8a50cb',
    test_name: 'IgM Anti Rubella',
    speciment: 'Lain - Lain',
    price: 72800,
  },
  {
    test_id: '9a6a4dfb-6eac-4791-aec5-e4d41edf08c0',
    test_name: 'IgG Anti Toksoplasma ',
    speciment: 'Lain - Lain',
    price: 55300,
  },
  {
    test_id: '0386c930-36bc-4229-820b-f42bb287e1ff',
    test_name: 'CRP Kwantitatif',
    speciment: 'Lain - Lain',
    price: 77800,
  },
  {
    test_id: '7734430b-6334-4aa6-a6ba-65999a1a777a',
    test_name: 'IgA',
    speciment: 'Lain - Lain',
    price: 69600,
  },
  {
    test_id: '51838736-e038-462d-8f36-d3c2c9d2ecef',
    test_name: 'Pergerakan',
    speciment: 'Lain - Lain',
    price: 53400,
  },
  {
    test_id: 'c9d68dc1-7c1e-4a09-a343-78868c77b1b1',
    test_name: 'Apo A1',
    speciment: 'Darah',
    price: 64700,
  },
  {
    test_id: 'e1a89ca6-e46f-4c48-bc9f-c9ba7568f820',
    test_name: 'Salmonella Typhi O',
    speciment: 'Lain - Lain',
    price: 75400,
  },
  {
    test_id: 'aa170d6a-af94-463e-9e05-42db2ba8de67',
    test_name: 'Salmonella O Paratyphi (a) ',
    speciment: 'Lain - Lain',
    price: 65400,
  },
  {
    test_id: 'ba4a1ae3-73b0-41f3-8188-ff7f2c3555b2',
    test_name: 'Salmonella O Paratyphi (b)',
    speciment: 'Lain - Lain',
    price: 87900,
  },
  {
    test_id: '7778ac1d-c8a3-4296-9fdf-1ede7410e297',
    test_name: 'Salmonella O Paratyphi (c)',
    speciment: 'Lain - Lain',
    price: 33000,
  },
  {
    test_id: 'd8284c6f-0757-4e2c-9589-723b0c4e9a66',
    test_name: 'Salmonella Typhi H',
    speciment: 'Lain - Lain',
    price: 88200,
  },
  {
    test_id: 'bf49c5a9-1039-47d1-a2c7-fdb9ee5485ac',
    test_name: 'Salmonella H Paratyphi (c)',
    speciment: 'Lain - Lain',
    price: 33700,
  },
  {
    test_id: '2473a1c6-198f-4ef1-9e50-915f3c58b75a',
    test_name: 'IgM  ACA ',
    speciment: 'Lain - Lain',
    price: 79700,
  },
  {
    test_id: 'a91345e8-cc1b-4b9c-9896-c97c1a80112b',
    test_name: 'IgM Anti Salmonella Typhi',
    speciment: 'Lain - Lain',
    price: 88000,
  },
  {
    test_id: 'c42b9dff-7907-4153-a79c-7e9bfd95faa8',
    test_name: 'Microfilaria',
    speciment: 'Darah',
    price: 74300,
  },
  {
    test_id: 'c4ecccd0-d95c-441e-9ab9-4abcc427e41e',
    test_name: 'ICT Malaria',
    speciment: 'Darah',
    price: 94300,
  },
  {
    test_id: '946cd572-f179-43fe-87da-ca04a945ad7d',
    test_name: 'CA 15-3',
    speciment: 'Lain - Lain',
    price: 61300,
  },
  {
    test_id: '1763860d-0b1f-422b-bd2a-e977f96a81b7',
    test_name: 'PSA Total',
    speciment: 'Lain - Lain',
    price: 76500,
  },
  {
    test_id: 'd090bfc8-cac9-4262-ad89-16b75ec4b7a7',
    test_name: 'PA Jaringan Besar u/ BAHAN dr RSMF Brayan dgn status UMUM ',
    speciment: 'Lain - Lain',
    price: 96400,
  },
  {
    test_id: '0c6463ec-8a56-4d43-8844-add5988cdd91',
    test_name: 'Testosteron ',
    speciment: 'Lain - Lain',
    price: 90300,
  },
  {
    test_id: 'cb4294d0-a1da-428d-a335-259ea3448fb3',
    test_name: 'Kultur Jamur',
    speciment: 'Lain - Lain',
    price: 89400,
  },
  {
    test_id: '41d69030-1fc5-47a0-98dc-c9098df3adf7',
    test_name:
      'PA Jaringan Kecil u/ BAHAN dr RSMF Brayan dgn status PERUSAHAAN',
    speciment: 'Lain - Lain',
    price: 37200,
  },
  {
    test_id: '1a9604b8-c5e6-437a-9c67-e7492fd51078',
    test_name: 'PA Potong Beku (FC) Kecil/Frozen Section',
    speciment: 'Lain - Lain',
    price: 67400,
  },
  {
    test_id: 'c707d141-bd90-46b1-8f10-39d62ecfc84d',
    test_name: 'PA Radikal u/ BAHAN dr RSMF Brayan dgn status UMUM ',
    speciment: 'Lain - Lain',
    price: 43600,
  },
  {
    test_id: 'b36838ba-a73d-4db4-bb07-e2f7dbae3ac1',
    test_name: 'Cytologi Cairan BAHAN RSMF Brayan status SOSIAL',
    speciment: 'Lain - Lain',
    price: 60800,
  },
  {
    test_id: '4f32945b-87fc-44b8-989f-580938b02bbb',
    test_name:
      'PA Jaringan Besar u/ BAHAN dr RSMF Brayan dgn status PERUSAHAAN',
    speciment: 'Lain - Lain',
    price: 63400,
  },
  {
    test_id: '9fbbdfc1-7e1c-447c-96a4-394a91bbd0ef',
    test_name: 'PA Radikal u/ BAHAN dr RSMF Brayan dgn status PERUSAHAAN',
    speciment: 'Lain - Lain',
    price: 62500,
  },
  {
    test_id: 'e718e4d3-66cc-497b-8be5-62ad8fbf08b5',
    test_name: 'Imprint Cytologi (Durante Operasi)',
    speciment: 'Lain - Lain',
    price: 37000,
  },
  {
    test_id: '4c8a8198-69c2-4733-8d55-a4df42c1dfdc',
    test_name: "Gram's Stain Urine",
    speciment: 'Urine',
    price: 88100,
  },
  {
    test_id: 'cbe41a79-dbc7-45f3-8fa2-b291d818347e',
    test_name: 'Protein Urine 24 Jam',
    speciment: 'Urine',
    price: 49400,
  },
  {
    test_id: 'f54890e8-2c59-4432-a81b-2a92e0d1a57c',
    test_name: 'Swab PCR Covid-19',
    speciment: 'Lain - Lain',
    price: 58500,
  },
  {
    test_id: 'd9d6aee3-88c8-4430-8694-1aa9dbe2c44e',
    test_name: 'hs-CRP',
    speciment: 'Lain - Lain',
    price: 87200,
  },
  {
    test_id: '886e020a-8ad4-4975-82d5-eedbb1d98b10',
    test_name: 'Patologi Anatomi ',
    speciment: 'Lain - Lain',
    price: 65600,
  },
  {
    test_id: '702a54f6-dac0-4e53-97d7-25a0ee193381',
    test_name: 'PA Potong Beku (FC) Besar/Frozen Section',
    speciment: 'Lain - Lain',
    price: 90100,
  },
  {
    test_id: '9760cc5e-20bb-4b1b-83cf-25142f1aceb1',
    test_name: 'T3 / RSMF Brayan',
    speciment: 'Lain - Lain',
    price: 66200,
  },
  {
    test_id: '9cc99f1e-4ef7-4034-af48-7ab2ca2e878b',
    test_name: 'Alpha-1 Globulin',
    speciment: 'Serum',
    price: 60900,
  },
  {
    test_id: '66780549-a204-40d5-ad91-636cf9ba6dcd',
    test_name: 'Alpha-2 Globulin',
    speciment: 'Serum',
    price: 44600,
  },
  {
    test_id: 'de9f3401-2ab9-4609-a815-4c543585dc06',
    test_name: 'Kreatinin Post HD',
    speciment: 'Serum',
    price: 76100,
  },
  {
    test_id: '1048dcc4-73cb-43f7-9885-22d4cfeb7fc3',
    test_name: 'Beta - Globulin',
    speciment: 'Serum',
    price: 54600,
  },
  {
    test_id: '4546653f-d58e-43dc-a1d7-6499c36edae0',
    test_name: 'T4 / RSMF Brayan',
    speciment: 'Lain - Lain',
    price: 45000,
  },
  {
    test_id: '726d87b5-a0c0-433b-86c0-7cd7fd028584',
    test_name: 'TSH / RSMF Brayan',
    speciment: 'Lain - Lain',
    price: 94500,
  },
  {
    test_id: 'd2648747-0825-4144-afa9-39e1258582a7',
    test_name: 'Protein cairan',
    speciment: 'Lain - Lain',
    price: 41400,
  },
  {
    test_id: 'e1267c29-648a-4810-81d2-4269b9fea520',
    test_name: 'IgG Anti HSF',
    speciment: 'Lain - Lain',
    price: 96500,
  },
  {
    test_id: '1303e9a9-87af-41d4-a86b-8b8ed0504e22',
    test_name: 'IgM Anti HSF',
    speciment: 'Lain - Lain',
    price: 80200,
  },
  {
    test_id: '4557cc9e-d7db-44c1-9c17-3ba4bdd1cde1',
    test_name: 'CPK / CK-NAC ',
    speciment: 'Lain - Lain',
    price: 45300,
  },
  {
    test_id: '86e0e4f5-4913-489f-92a3-a847ab6e7553',
    test_name: 'Total protein Liquor',
    speciment: 'Lain - Lain',
    price: 34400,
  },
  {
    test_id: '3256e0c1-b310-409e-828d-0de65821290f',
    test_name: 'Kristal - T Phospat',
    speciment: 'Urine',
    price: 92200,
  },
  {
    test_id: 'a33f7f0d-ce81-4be2-9e0a-a3f8dc388f27',
    test_name: 'Analisa Cairan Otak',
    speciment: 'Lain - Lain',
    price: 67900,
  },
  {
    test_id: '09d1a788-a8a9-43e3-a232-499ab04c100e',
    test_name: 'Reduksi',
    speciment: 'Urine',
    price: 58500,
  },
  {
    test_id: '6206edf7-8c3d-4de5-98e5-a9de9b05d50e',
    test_name: 'Urobilin',
    speciment: 'Urine',
    price: 70600,
  },
  {
    test_id: '0e70d736-ee4a-49d6-80bd-a4efdeb1b0e6',
    test_name: 'Kristal - Ca.Oxalat',
    speciment: 'Urine',
    price: 41200,
  },
  {
    test_id: '6c489269-41b3-4f43-9219-45a8c9317f6c',
    test_name: 'Cytologi Cairan u/ BAHAN dr RSMF Brayan status UMUM',
    speciment: 'Lain - Lain',
    price: 71900,
  },
  {
    test_id: '9c144369-23b8-4ec2-b7ca-96374cc7c61e',
    test_name: 'Prolaktin',
    speciment: 'Lain - Lain',
    price: 35900,
  },
  {
    test_id: '4dd44323-7209-4020-bb89-fc8e3e7fa07a',
    test_name: 'IgE Rast Debu Rumah',
    speciment: 'Lain - Lain',
    price: 51500,
  },
  {
    test_id: '6a6fed93-6e60-4d4a-b575-6653eb369821',
    test_name: 'IgE Rast Udang',
    speciment: 'Lain - Lain',
    price: 37700,
  },
  {
    test_id: 'b72dd5ee-02f4-4f38-bcca-e5446dc5b369',
    test_name: 'Pengecatan BTA ',
    speciment: 'Lain - Lain',
    price: 46300,
  },
  {
    test_id: '41f627b3-553b-405b-8c4e-7ac1f9482c71',
    test_name: 'HbA',
    speciment: 'Darah',
    price: 64300,
  },
  {
    test_id: '55c3c8d2-21b9-41a2-b217-f65d2cb5ed63',
    test_name: 'Analisa Cairan Pleura',
    speciment: 'Lain - Lain',
    price: 44300,
  },
  {
    test_id: 'ba35bbac-9458-4675-8c59-7b453b7904ae',
    test_name: 'Warna Liquor',
    speciment: 'Lain - Lain',
    price: 38800,
  },
  {
    test_id: 'c339068d-099c-4c5b-b0aa-5cd9072159b3',
    test_name: 'Protein Liquor',
    speciment: 'Lain - Lain',
    price: 52900,
  },
  {
    test_id: '07b5d326-5a7f-4912-b712-88398a5b266f',
    test_name: 'O2Saturasi',
    speciment: 'Serum',
    price: 43900,
  },
  {
    test_id: '61ab0942-24d9-4b21-b12e-77f7f4bf7efb',
    test_name: 'Sel Lekosit',
    speciment: 'Lain - Lain',
    price: 76600,
  },
  {
    test_id: 'bb8baac7-9c53-43b0-8291-85a26e181d84',
    test_name: 'Pandy',
    speciment: 'Lain - Lain',
    price: 39800,
  },
  {
    test_id: '8e16d77c-4959-46f1-8ada-25699c184395',
    test_name: 'Analisa Cairan Ascites',
    speciment: 'Lain - Lain',
    price: 32600,
  },
  {
    test_id: '9011b4c1-0563-45ce-afa1-3fb55d7fe487',
    test_name: 'Nonne',
    speciment: 'Lain - Lain',
    price: 98300,
  },
  {
    test_id: 'fba8d9d0-a745-49e5-bcdd-d8d4d909d8db',
    test_name: 'Analisa Cairan Lumbal',
    speciment: 'Lain - Lain',
    price: 50100,
  },
  {
    test_id: '6d5ef72d-0e05-488e-abc3-70a29c94bf1c',
    test_name: 'Patologi Anatomi Jaringan Kecil ',
    speciment: 'Lain - Lain',
    price: 68500,
  },
  {
    test_id: '8d207fb6-6439-4fb7-92eb-98d4437f4519',
    test_name: 'Jumlah Sel Cairan',
    speciment: 'Lain - Lain',
    price: 66200,
  },
  {
    test_id: 'ca7e4c81-1246-4b9e-ab47-f7848f095178',
    test_name: 'Glukosa Cairan',
    speciment: 'Lain - Lain',
    price: 83800,
  },
  {
    test_id: '1542176f-75fe-43c6-a379-7100708767be',
    test_name: 'PMN Sel',
    speciment: 'Lain - Lain',
    price: 47100,
  },
  {
    test_id: 'f3042cad-817f-419a-a81c-de986fd2a69e',
    test_name: 'Cholesterol Cairan',
    speciment: 'Lain - Lain',
    price: 39700,
  },
  {
    test_id: '08f56cb8-8913-4484-af5a-00873e5256cb',
    test_name: 'MN Sel',
    speciment: 'Lain - Lain',
    price: 79000,
  },
  {
    test_id: '4a1edf44-77e7-4066-9bae-e34a2b681c2c',
    test_name: 'Trigliserida Cairan',
    speciment: 'Lain - Lain',
    price: 66100,
  },
  {
    test_id: '7c877906-0967-4239-a6c2-734dcf4f2d00',
    test_name: 'Morfologi Abnormal',
    speciment: 'Lain - Lain',
    price: 52000,
  },
  {
    test_id: 'cc47297b-a903-4482-83f3-de9669826420',
    test_name: 'Cytologi Cairan',
    speciment: 'Lain - Lain',
    price: 92700,
  },
  {
    test_id: '8e67d606-3e84-4ff6-9cd5-c3c2672200de',
    test_name: 'Ureum Post HD',
    speciment: 'Serum',
    price: 66000,
  },
  {
    test_id: '5ee664fa-3757-43cf-9f6d-2c3de1181436',
    test_name: 'Paps Smear u/ BAHAN dr RSMF Brayan dgn status UMUM',
    speciment: 'Lain - Lain',
    price: 39400,
  },
  {
    test_id: '1099c497-01df-4912-82c2-90ce7c544af2',
    test_name: 'Fosfatase Prostat',
    speciment: 'Lain - Lain',
    price: 30600,
  },
  {
    test_id: '680ff869-4e27-412a-86e1-10a109a14b4b',
    test_name: 'Tiroglobulin',
    speciment: 'Urine',
    price: 38100,
  },
  {
    test_id: 'beaf1869-efae-4cab-a677-9ab13174ec15',
    test_name: 'Free T3',
    speciment: 'Lain - Lain',
    price: 98600,
  },
  {
    test_id: '5fdcb90e-c037-4b71-9518-07ed2166ad35',
    test_name: 'Kultur lain-lain',
    speciment: 'Lain - Lain',
    price: 74100,
  },
  {
    test_id: 'e6f8ec6b-c911-46b4-b86a-8ae10d44843a',
    test_name: 'B-Crosslap (CTx)',
    speciment: 'Lain - Lain',
    price: 77700,
  },
  {
    test_id: '113cdda1-e88e-4267-8329-f1821e497746',
    test_name: 'Analisa Batu Ginjal',
    speciment: 'Lain - Lain',
    price: 65100,
  },
  {
    test_id: 'd66371be-447b-41f1-852c-6fa9c5e10154',
    test_name: 'Pergerakan Lemah',
    speciment: 'Lain - Lain',
    price: 43200,
  },
  {
    test_id: '672f2a35-88d1-4916-b0de-aa590ee0719d',
    test_name: 'Ureum Pre HD',
    speciment: 'Serum',
    price: 41700,
  },
  {
    test_id: '092ca472-b033-435d-b292-834b7f7ef5af',
    test_name: 'Morfologi Normal',
    speciment: 'Lain - Lain',
    price: 94100,
  },
  {
    test_id: '853a7b7d-343e-435e-b1b6-4e996fb580f6',
    test_name: 'Screening HD',
    speciment: 'Lain - Lain',
    price: 48500,
  },
  {
    test_id: '95b41e5f-8632-42fd-b5e1-5ca30630dbe5',
    test_name: 'Patologi Anatomi Jaringan Besar',
    speciment: 'Lain - Lain',
    price: 67600,
  },
  {
    test_id: '3d3fb799-d299-4929-9ea1-70625b2eb74a',
    test_name: 'Kekentalan',
    speciment: 'Lain - Lain',
    price: 41100,
  },
  {
    test_id: 'a3ac968c-53ae-48b3-af92-8a89280b3d4a',
    test_name: 'Pemeriksaan IHC',
    speciment: 'Lain - Lain',
    price: 49100,
  },
  {
    test_id: 'c98889f4-51c0-4e11-a1f5-ccaae826cc0f',
    test_name: 'PA Jaringan Kecil u/ BAHAN dr RSMF Brayan dgn status UMUM',
    speciment: 'Lain - Lain',
    price: 75400,
  },
  {
    test_id: '6940a4a1-9244-4b93-96c6-bb659d46e4f7',
    test_name: 'Patologi Anatomi Radikal',
    speciment: 'Lain - Lain',
    price: 61100,
  },
  {
    test_id: '5d5a2bf4-69c4-4e21-b2a3-a4663db92136',
    test_name: 'PA Jaringan Sedang u/ BAHAN dr RSMF Brayan dgn status UMUM ',
    speciment: 'Lain - Lain',
    price: 78500,
  },
  {
    test_id: '50d6701c-8366-45d4-9540-8e67d778e737',
    test_name: 'Volume',
    speciment: 'Lain - Lain',
    price: 85200,
  },
  {
    test_id: '1db2b382-fd30-416d-8322-22f1d695af0e',
    test_name: 'Bikarbonat',
    speciment: 'Lain - Lain',
    price: 43400,
  },
  {
    test_id: 'cc81bae3-6a57-4642-83ee-a7c7ccfe412d',
    test_name: 'C3-Complemen',
    speciment: 'Lain - Lain',
    price: 90200,
  },
  {
    test_id: '3dd730ee-033e-41aa-b61a-0e9e1c4c15d1',
    test_name: 'Prep Gram',
    speciment: 'Lain - Lain',
    price: 93700,
  },
  {
    test_id: '0db45c1c-f38e-4029-9c04-9cd4af8706ed',
    test_name: 'UBT',
    speciment: 'Lain - Lain',
    price: 52400,
  },
  {
    test_id: 'e51925ed-199a-49cf-81f0-c81f6de8d67a',
    test_name: 'Retraksi Bekuan',
    speciment: 'Darah',
    price: 99800,
  },
  {
    test_id: '44bdcc8d-8974-4692-9c30-46659167cbd1',
    test_name: 'Neutrofil Segmen',
    speciment: 'Darah',
    price: 44900,
  },
  {
    test_id: '6abef7fd-add0-4cc6-8bc0-6484fa0f3d80',
    test_name: 'HbF',
    speciment: 'Darah',
    price: 85300,
  },
  {
    test_id: '968566bd-458e-4490-b348-8e94e7c15aa1',
    test_name: 'Agregasi Trombosit (ADP)',
    speciment: 'Darah',
    price: 79200,
  },
  {
    test_id: 'c1ac0bd3-1cfd-4865-a2a6-5f984751167a',
    test_name: 'HbA2',
    speciment: 'Darah',
    price: 37700,
  },
  {
    test_id: '05d82281-370c-4d2c-8795-b94423062a1d',
    test_name: 'Warna Cairan',
    speciment: 'Lain - Lain',
    price: 96300,
  },
  {
    test_id: '7adafc49-b5f1-4236-828b-7f7da8978bfc',
    test_name: 'Amylase Cairan',
    speciment: 'Lain - Lain',
    price: 37500,
  },
  {
    test_id: '92d8075b-87c6-49d2-b7e0-96aeff1ddeee',
    test_name: 'Alphafeto Protein (AFP) u/ BAHAN dr RSMF Brayan',
    speciment: 'Lain - Lain',
    price: 44400,
  },
  {
    test_id: '3bc1f8b3-7617-427b-a90c-795028705467',
    test_name: 'Total',
    speciment: 'Serum',
    price: 37600,
  },
  {
    test_id: '06dbfcf4-ff02-4fd1-ab90-4eb05f22dde0',
    test_name: 'Jumlah Spermatozoa',
    speciment: 'Lain - Lain',
    price: 77900,
  },
  {
    test_id: 'aa38622f-9c3f-4504-af26-44a9d58d7177',
    test_name: 'Mycobacterium Tuberculosis  PCR',
    speciment: 'Lain - Lain',
    price: 84200,
  },
  {
    test_id: '3c36b3b2-4dd2-4024-8b87-ceca2a44e0ca',
    test_name: 'Jamur Mikroskopis',
    speciment: 'Lain - Lain',
    price: 43700,
  },
  {
    test_id: 'fada0997-62b4-45b3-bea6-d2129e0d7eff',
    test_name: 'PA Tulang',
    speciment: 'Lain - Lain',
    price: 80800,
  },
  {
    test_id: 'bc127cb4-8244-4b53-bed1-6b54f970bda4',
    test_name: 'Resistensi Osmotik',
    speciment: 'Darah',
    price: 34300,
  },
  {
    test_id: '5f5f05f9-2681-4818-b20c-a7c6c6b60b3b',
    test_name:
      'PA Jaringan Sedang u/ BAHAN dr RSMF Brayan dgn status PERUSAHAAN',
    speciment: 'Lain - Lain',
    price: 60500,
  },
  {
    test_id: '61ad2727-5e12-44f9-8cd9-43b53fb96e84',
    test_name: 'PA Besar BAHAN dr Brayan status SOSIAL',
    speciment: 'Lain - Lain',
    price: 53000,
  },
  {
    test_id: '55aca268-4954-416b-89e2-97fdb0804fca',
    test_name: 'Cytologi Cairan u/ BAHAN dr RSMF Brayan status PERUSAHAAN',
    speciment: 'Lain - Lain',
    price: 38400,
  },
  {
    test_id: 'a112e570-a4e5-4cde-be02-c10a0564c9fe',
    test_name: 'Urea Clearance ',
    speciment: 'Serum',
    price: 74500,
  },
  {
    test_id: 'fe8edc49-f623-4c1e-8a5e-53cc17db500f',
    test_name: 'N-Mid Osteocalcin',
    speciment: 'Lain - Lain',
    price: 36400,
  },
  {
    test_id: '5ba4d0a8-0fbb-455a-bc80-ce234212a1da',
    test_name: 'Paps Smear u/ BAHAN dr RSMF Brayan dgn status PERUSAHAAN',
    speciment: 'Lain - Lain',
    price: 39800,
  },
  {
    test_id: '074c96b1-3315-4e52-8233-8895dfc50d2b',
    test_name: 'Berat jenis Cairan',
    speciment: 'Lain - Lain',
    price: 31100,
  },
  {
    test_id: '5df07739-c5c7-47bb-aab0-65002cc33b3d',
    test_name: 'Neutrofil batang',
    speciment: 'Darah',
    price: 94200,
  },
  {
    test_id: 'aad72cfd-138e-41ee-b9f3-f79552192a6c',
    test_name: 'Bence Jones',
    speciment: 'Urine',
    price: 56500,
  },
];

function PenunjangList(props) {
  const [speciments, setSpeciments] = useState([]);
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [search, setSearch] = useState('');
  const [specimentSelected, setSpecimentSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [isPreparation, setIsPreparation] = useState(true);
  const PPN = totalPrice * (10 / 100);

  useEffect(() => {
    setTests(DUMMIES_TEST);
    setFilteredTests([]);
  }, []);

  useEffect(() => {
    if (search === '' && specimentSelected) {
      const testsBySpeciment = tests.filter(
        (test) => test.speciment === specimentSelected.speciment_name
      );
      setFilteredTests(testsBySpeciment);
    }
  }, [search]);

  useEffect(() => {
    if (selectedTests.length !== 0) {
      setIsLoading(false);
      props.navigation.navigate('FindClinic', { tests: selectedTests });
    }
  }, [selectedTests]);

  useEffect(() => {
    if (speciments.length === 0 && tests.length !== 0) {
      let objectWithKeySpecimentName = {};
      for (let i = 0; i < tests.length; i++) {
        const { speciment } = tests[i];

        if (!objectWithKeySpecimentName[speciment]) {
          objectWithKeySpecimentName[speciment] = {
            speciment_name: speciment,
            selected: false,
          };
        }
      }
      const speciments = Object.values(objectWithKeySpecimentName);
      setSpeciments(speciments);
    }
    setIsPreparation(false);
  }, [tests]);

  const toScreenClinic = () => {
    setIsLoading(true);
    const newSelectedTests = tests.filter((test) => test.selected === true);
    setSelectedTests(newSelectedTests);
  };

  const specimentStyleBehavior = (speciment) => ({
    container: {
      backgroundColor: speciment.selected ? '#212D3D' : '#2F2F2F',
      borderWidth: 1,
      borderColor: speciment.selected ? '#77BFF4' : 'transparent',
      padding: 10,
      borderRadius: 4,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 6,
    },
    text: {
      color: speciment.selected ? '#77BFF4' : '#B5B5B5',
      fontSize: 14,
      textTransform: 'capitalize',
    },
  });

  const onSpecimentSelected = (specimentName) => {
    let newSpecimentSelected = null;
    const newSpeciments = speciments.map((speciment) => {
      if (speciment.speciment_name === specimentName) {
        speciment.selected = true;
        newSpecimentSelected = speciment;
      } else {
        speciment.selected = false;
      }
      return speciment;
    });
    const testsFilteredBySpecimentName = [];
    let newTotalPrice = 0;
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];

      if (test.selected === true) {
        newTotalPrice += test.price;
      }

      if (test.speciment === specimentName) {
        testsFilteredBySpecimentName.push(test);
      }
    }

    setSpecimentSelected(newSpecimentSelected);
    setFilteredTests(testsFilteredBySpecimentName);
    setTotalPrice(newTotalPricer);
    setSpeciments(newSpeciments);
  };

  const onTestSelected = (testId) => {
    let newTotalPrice = totalPrice;
    const newTests = tests.map((test) => {
      if (test.test_id === testId) {
        const isSelected = test.selected;

        if (isSelected === true) {
          test.selected = false;
          newTotalPrice -= test.price;
        } else {
          test.selected = true;
          newTotalPrice += test.price;
        }
      }
      return test;
    });
    setTotalPrice(newTotalPrice);
    setTests(newTests);
  };

  const searchHandler = (text) => {
    const textLower = text.toLowerCase();
    if (text === '') {
      setSearch('');
      setFilteredTests([]);
    } else {
      const results = tests.filter((test) => {
        const testName = test.test_name.toLowerCase();
        return testName.startsWith(textLower);
      });
      setSearch(text);
      setFilteredTests(results);
    }
  };

  const renderItem = ({ item }) => {
    const { speciment_name } = item;
    const { container, text } = specimentStyleBehavior(item);
    return (
      <TouchableOpacity
        style={container}
        onPress={() => onSpecimentSelected(speciment_name)}
      >
        <Text style={text}>{speciment_name}</Text>
      </TouchableOpacity>
    );
  };

  const renderTests = ({ item }) => {
    return (
      <View style={styles.specimentItemSection}>
        <Text style={styles.specimentItemText}>{item.test_name}</Text>
        <Checkbox
          value={item.selected}
          color={item.selected ? '#017EF9' : null}
          onValueChange={() => onTestSelected(item.test_id)}
        />
      </View>
    );
  };

  console.log(filteredTests, '>>>>> ini adalah filtered tests');

  return (
    <SafeAreaView style={styles.container}>
      {isPreparation ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <>
          <View>
            <ClearableSearchBar
              placeholder="Cari test atau sampel"
              onChangeText={searchHandler}
              setSearch={setSearch}
            />

            {/* speciment */}
            {search === '' && speciments.length !== 0 ? (
              <View style={styles.specimentContainer}>
                <Text style={styles.title}>pilih kategori</Text>
                <View style={{ flexDirection: 'row' }}>
                  <FlatList
                    data={speciments}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => `${index}-speciment`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            ) : null}

            {/* test by speciment */}
            {filteredTests.length !== 0 ? (
              <FlatList
                data={filteredTests}
                style={styles.specimentItemContainer}
                renderItem={renderTests}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
                keyExtractor={(item) => `${item.test_id}-test`}
              ></FlatList>
            ) : null}
          </View>

          {/* button action */}
          <View>
            {/* price preview */}
            {totalPrice !== 0 ? (
              <View style={styles.priceSection}>
                <ScrollView style={styles.topPriceContainer}>
                  <Text style={styles.costTitle}>Perkiraan Biaya</Text>
                  <View style={styles.costDetailSectionContainer}>
                    {tests.map((test) => {
                      if (test.selected === true) {
                        return (
                          <View
                            style={styles.costDetailSection}
                            key={`cost-${test.test_name}-${test.test_id}`}
                          >
                            <Text
                              style={styles.costText}
                            >{`Cek ${test.test_name} ${test.speciment}`}</Text>
                            <Text style={styles.costText}>
                              {formatNumberToRupiah(test.price)}
                            </Text>
                          </View>
                        );
                      }
                    })}
                    <View style={styles.costDetailSection}>
                      <Text style={{ color: '#B5B5B5' }}>{`PPN`}</Text>
                      <Text style={styles.costText}>
                        {formatNumberToRupiah(PPN)}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
                <View style={styles.bottomPriceContainer}>
                  <View style={styles.informationContainer}>
                    <InformationIcon />
                    <Text
                      style={{
                        color: '#B5B5B5',
                        fontSize: 11,
                        marginLeft: 8,
                        fontStyle: 'italic',
                      }}
                      numberOfLines={2}
                    >
                      Harga akan berbeda di setiap tempat praktik
                    </Text>
                  </View>
                  <View style={styles.subTotalContainer}>
                    <Text style={styles.subTotalTitle}>Sub Total</Text>
                    <Text style={styles.subTotalPriceText}>
                      {formatNumberToRupiah(totalPrice + PPN)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
            <TouchableOpacity
              style={styles.buttonWithIcon}
              onPress={() => toScreenClinic()}
            >
              {isLoading ? (
                <ActivityIndicator size={'small'} color="#FFF" />
              ) : (
                <>
                  <Text style={styles.buttonWithIconLabel}>Lanjutkan</Text>
                  <RightArrow />
                </>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 14,
    justifyContent: 'space-between',
    backgroundColor: '#1F1F1F',
  },
  title: {
    color: '#DDDDDD',
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  specimentContainer: {
    marginBottom: 12,
  },
  specimentItemContainer: {
    backgroundColor: '#2F2F2F',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    maxHeight: 250,
    marginBottom: 12,
  },
  specimentItemSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#474747',
    paddingBottom: 14,
    marginBottom: 12,
  },
  specimentItemText: {
    fontSize: 16,
    color: '#DDDDDD',
    maxWidth: '70%',
  },
  itemSection: {
    marginBottom: 12,
    // maxHeight: 250,
  },
  priceSection: {
    marginBottom: 14,
  },
  topPriceContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#474747',
    borderRadius: 4,
    maxHeight: 150,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  costDetailSectionContainer: {
    paddingBottom: 18,
  },
  costDetailSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  costText: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#B5B5B5',
  },
  costTitle: {
    color: '#F37335',
    textTransform: 'uppercase',
    marginBottom: 10,
    fontSize: 12,
  },
  costInformationContainer: {},
  bottomPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  informationContainer: {
    alignItems: 'center',
    backgroundColor: '#3B340B',
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    maxWidth: dimWidth * 0.44,
    borderRadius: 4,
  },
  subTotalContainer: {
    alignSelf: 'flex-end',
  },
  subTotalTitle: {
    color: '#B5B5B5',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 6,
    textAlign: 'right',
  },
  subTotalPriceText: {
    color: '#DDDDDD',
    fontSize: 16,
    textAlign: 'right',
  },
  buttonWithIcon: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#005EA2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: '100%',
  },
  buttonWithIconLabel: {
    color: '#DDDDDD',
    textTransform: 'capitalize',
    marginRight: 10,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(PenunjangList);
