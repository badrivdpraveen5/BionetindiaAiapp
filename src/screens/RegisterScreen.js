import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

import styles from '../styles/Register.styles';

import * as Location from 'expo-location';

import { Picker } from '@react-native-picker/picker';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useUser } from '../contexts/UserContext';

import { useLanguage } from '../contexts/LanguageContext';

import { register } from '../services/api';


// =========================
// ROLE OPTIONS
// =========================

const roleOptions = [
  {
    value: 'Community User',
    translationKey: 'register.communityUser',
  },
  {
    value: 'Verified User',
    translationKey: 'register.verifiedUser',
  },
  {
    value: 'Researcher',
    translationKey: 'register.researcher',
  },
];


// =========================
// LANGUAGES
// =========================

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
];


export default function RegisterScreen() {

  const navigation = useNavigation();

  const { setUser } = useUser();

  const { t } = useLanguage();


  // =========================
  // STATES
  // =========================

  const [loading, setLoading] = useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);


  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({

    name: '',

    email: '',

    phone: '',

    password: '',

    role: 'Community User',

    state: '',

    district: '',

    gramPanchayat: '',

    village: '',

    preferredLanguage: 'en',

  });


  // =========================
  // UPDATE FIELD
  // =========================

  const updateField = (key, value) => {

    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));

  };


  // =========================
  // GET GPS LOCATION
  // =========================

  const getCurrentLocation = async () => {

    try {

      setLocationLoading(true);


      const { status } =
        await Location.requestForegroundPermissionsAsync();


      if (status !== 'granted') {

        Alert.alert(
          t('register.permissionDenied'),
          t('register.locationPermissionRequired')
        );

        return;
      }


      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });


      const reverseGeocode =
        await Location.reverseGeocodeAsync({

          latitude:
            location.coords.latitude,

          longitude:
            location.coords.longitude,

        });


      console.log(
        'LOCATION =>',
        reverseGeocode
      );


      if (reverseGeocode.length > 0) {

        const place = reverseGeocode[0];


        setFormData(prev => ({

          ...prev,

          district:
            place.city ||
            place.subregion ||
            '',

          state:
            place.region ||
            '',

        }));

      }

    } catch (error) {

      console.log(
        'LOCATION ERROR =>',
        error
      );


      Alert.alert(
        t('register.locationError'),
        t('register.unableToFetchLocation')
      );

    } finally {

      setLocationLoading(false);

    }

  };


  // =========================
  // AUTO LOCATION
  // =========================

  useEffect(() => {

    getCurrentLocation();

  }, []);


  // =========================
  // EMAIL VALIDATION
  // =========================

  const isValidEmail = (email) => {

    return /\S+@\S+\.\S+/.test(email);

  };


  // =========================
  // REGISTER
  // =========================

  const handleRegister = async () => {


    // =========================
    // REQUIRED FIELD VALIDATION
    // =========================

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.state ||
      !formData.district ||
      !formData.gramPanchayat ||
      !formData.village
    ) {

      Alert.alert(
        t('register.validation'),
        t('register.fillAllRequiredFields')
      );

      return;

    }


    // =========================
    // EMAIL VALIDATION
    // =========================

    if (!isValidEmail(formData.email)) {

      Alert.alert(
        t('register.validation'),
        t('register.validEmail')
      );

      return;

    }


    // =========================
    // PASSWORD VALIDATION
    // =========================

    if (formData.password.length < 6) {

      Alert.alert(
        t('register.validation'),
        t('register.passwordMinimum')
      );

      return;

    }


    try {

      setLoading(true);


      // =========================
      // API PAYLOAD
      // =========================

      const payload = {

        email:
          formData.email.trim(),

        phone:
          formData.phone.trim(),

        password:
          formData.password,

        name:
          formData.name.trim(),

        role:
          formData.role,

        state:
          formData.state.trim(),

        district:
          formData.district.trim(),

        gramPanchayat:
          formData.gramPanchayat.trim(),

        village:
          formData.village.trim(),

        preferredLanguage:
          formData.preferredLanguage,

      };


      console.log(
        'REGISTER PAYLOAD =>',
        payload
      );


      // =========================
      // API CALL
      // =========================

      const response =
        await register(payload);


      console.log(
        'REGISTER RESPONSE =>',
        response
      );


      // =========================
      // SAVE USER
      // =========================

      if (response?.data?.user) {

        await setUser(
          response.data.user
        );

      }


      // =========================
      // SUCCESS
      // =========================

      Alert.alert(
        t('register.success'),
        t('register.accountCreated')
      );


      navigation.navigate('Login');


    } catch (error) {

      console.log(
        'REGISTER ERROR =>',
        error.response?.data ||
        error.message
      );


      Alert.alert(

        t('register.registrationFailed'),

        error.response?.data?.message?.[0] ||

        error.response?.data?.message ||

        t('register.somethingWentWrong')

      );


    } finally {

      setLoading(false);

    }

  };


  // =========================
  // UI
  // =========================

  return (

    <KeyboardAvoidingView

      style={styles.container}

      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }

    >

      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={
          styles.scroll
        }

      >

        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.header}>

          <View style={styles.logoContainer}>

            <Image

              source={require('../../assets/icon.png')}

              style={styles.logo}

            />

          </View>


          <Text style={styles.title}>

            {t('register.title')}

          </Text>


          <Text style={styles.subtitle}>

            {t('register.subtitle')}

          </Text>

        </View>


        {/* =========================
            FORM
        ========================= */}

        <View style={styles.form}>


          {/* NAME */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="person"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.fullName')
              }

              style={styles.input}

              value={formData.name}

              onChangeText={(text) =>
                updateField(
                  'name',
                  text
                )
              }

            />

          </View>


          {/* EMAIL */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="mail"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.email')
              }

              style={styles.input}

              keyboardType="email-address"

              autoCapitalize="none"

              value={formData.email}

              onChangeText={(text) =>
                updateField(
                  'email',
                  text
                )
              }

            />

          </View>


          {/* PHONE */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="call"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.phoneNumber')
              }

              style={styles.input}

              keyboardType="phone-pad"

              value={formData.phone}

              onChangeText={(text) =>
                updateField(
                  'phone',
                  text
                )
              }

              maxLength={10}

            />

          </View>


          {/* PASSWORD */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="lock-closed"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.password')
              }

              style={styles.input}

              secureTextEntry={
                !showPassword
              }

              value={formData.password}

              onChangeText={(text) =>
                updateField(
                  'password',
                  text
                )
              }

            />


            <TouchableOpacity

              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }

            >

              <Ionicons

                name={
                  showPassword
                    ? 'eye-off'
                    : 'eye'
                }

                size={22}

                color="#6b7280"

              />

            </TouchableOpacity>

          </View>


          {/* ROLE */}

          <View style={styles.dropdownContainer}>

            <Ionicons

              name="people"

              size={20}

              color="#6b7280"

              style={styles.dropdownIcon}

            />


            <Picker

              selectedValue={
                formData.role
              }

              onValueChange={(itemValue) =>
                updateField(
                  'role',
                  itemValue
                )
              }

              style={styles.picker}

            >

              {roleOptions.map(item => (

                <Picker.Item

                  key={item.value}

                  label={
                    t(item.translationKey)
                  }

                  value={item.value}

                />

              ))}

            </Picker>

          </View>


          {/* STATE */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="map"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.state')
              }

              style={styles.input}

              value={formData.state}

              onChangeText={(text) =>
                updateField(
                  'state',
                  text
                )
              }

            />

          </View>


          {/* DISTRICT */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="location"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.district')
              }

              style={styles.input}

              value={formData.district}

              onChangeText={(text) =>
                updateField(
                  'district',
                  text
                )
              }

            />

          </View>


          {/* GRAM PANCHAYAT */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="business"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.gramPanchayat')
              }

              style={styles.input}

              value={
                formData.gramPanchayat
              }

              onChangeText={(text) =>
                updateField(
                  'gramPanchayat',
                  text
                )
              }

            />

          </View>


          {/* VILLAGE */}

          <View style={styles.inputContainer}>

            <Ionicons

              name="home"

              size={20}

              color="#6b7280"

              style={styles.icon}

            />


            <TextInput

              placeholder={
                t('register.village')
              }

              style={styles.input}

              value={formData.village}

              onChangeText={(text) =>
                updateField(
                  'village',
                  text
                )
              }

            />

          </View>


          {/* PREFERRED LANGUAGE */}

          <View style={styles.dropdownContainer}>

            <Ionicons

              name="language"

              size={20}

              color="#6b7280"

              style={styles.dropdownIcon}

            />


            <Picker

              selectedValue={
                formData.preferredLanguage
              }

              onValueChange={(itemValue) =>
                updateField(
                  'preferredLanguage',
                  itemValue
                )
              }

              style={styles.picker}

            >

              {languages.map(item => (

                <Picker.Item

                  key={item.code}

                  label={item.name}

                  value={item.code}

                />

              ))}

            </Picker>

          </View>


          {/* GPS LOCATION */}

          <TouchableOpacity

            style={
              styles.locationButton
            }

            onPress={
              getCurrentLocation
            }

          >

            {locationLoading ? (

              <ActivityIndicator
                color="#10b981"
              />

            ) : (

              <>

                <Ionicons

                  name="locate"

                  size={18}

                  color="#10b981"

                />


                <Text
                  style={
                    styles.locationText
                  }
                >

                  {t(
                    'register.fetchGpsLocation'
                  )}

                </Text>

              </>

            )}

          </TouchableOpacity>


          {/* REGISTER BUTTON */}

          <TouchableOpacity

            style={
              styles.registerButton
            }

            onPress={
              handleRegister
            }

            disabled={loading}

          >

            {loading ? (

              <ActivityIndicator
                color="#ffffff"
              />

            ) : (

              <Text
                style={
                  styles.buttonText
                }
              >

                {t(
                  'register.register'
                )}

              </Text>

            )}

          </TouchableOpacity>

        </View>


        {/* =========================
            LOGIN
        ========================= */}

        <View
          style={
            styles.bottomContainer
          }
        >

          <Text
            style={
              styles.bottomText
            }
          >

            {t(
              'register.alreadyHaveAccount'
            )}

          </Text>


          <TouchableOpacity

            onPress={() =>
              navigation.navigate(
                'Login'
              )
            }

          >

            <Text
              style={
                styles.loginText
              }
            >

              {t('register.login')}

            </Text>

          </TouchableOpacity>

        </View>


      </ScrollView>

    </KeyboardAvoidingView>

  );

}