import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

import * as Location from 'expo-location';

import { Picker } from '@react-native-picker/picker';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useUser } from '../contexts/UserContext';

import { register } from '../services/api';

const roleOptions = [
  {
    label: 'Community User',
    value: 'Community User',
  },
  {
    label: 'Verified User',
    value: 'Verified User',
  },
  {
    label: 'Researcher',
    value: 'Researcher',
  },
];

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

  const [loading, setLoading] = useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

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
          'Permission Denied',
          'Location permission is required'
        );

        return;
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy:
            Location.Accuracy.High,
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
            place.region || '',
        }));
      }

    } catch (error) {

      console.log(
        'LOCATION ERROR =>',
        error
      );

      Alert.alert(
        'Location Error',
        'Unable to fetch location'
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
  // REGISTER API
  // =========================

  const handleRegister = async () => {

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
        'Validation',
        'Please fill all required fields'
      );

      return;
    }

    if (!isValidEmail(formData.email)) {

      Alert.alert(
        'Validation',
        'Please enter valid email'
      );

      return;
    }

    if (formData.password.length < 6) {

      Alert.alert(
        'Validation',
        'Password must be minimum 6 characters'
      );

      return;
    }

    try {

      setLoading(true);

      // =========================
      // API PAYLOAD
      // =========================

      const payload = {

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        password: formData.password,

        name: formData.name.trim(),

        role: formData.role,

        state: formData.state.trim(),

        district: formData.district.trim(),

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

      Alert.alert(
        'Success',
        'Account created successfully'
      );

      navigation.navigate('Login');

    } catch (error) {

      console.log(
        'REGISTER ERROR =>',
        error.response?.data ||
        error.message
      );

      Alert.alert(
        'Registration Failed',
        error.response?.data?.message?.[0] ||
        error.response?.data?.message ||
        'Something went wrong'
      );

    } finally {

      setLoading(false);
    }
  };

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
        contentContainerStyle={styles.scroll}
      >

        {/* HEADER */}

        <View style={styles.header}>

          <View style={styles.logoContainer}>

            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
            />

          </View>

          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Join Bio-net India Platform
          </Text>

        </View>

        {/* FORM */}

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
              placeholder="Full Name"
              style={styles.input}
              value={formData.name}
              onChangeText={(text) =>
                updateField('name', text)
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
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) =>
                updateField('email', text)
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
              placeholder="Phone Number"
              style={styles.input}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) =>
                updateField('phone', text)
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
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) =>
                updateField('password', text)
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
              selectedValue={formData.role}
              onValueChange={(itemValue) =>
                updateField('role', itemValue)
              }
              style={styles.picker}
            >

              {roleOptions.map((item) => (

                <Picker.Item
                  key={item.value}
                  label={item.label}
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
              placeholder="State"
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
              placeholder="District"
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
              placeholder="Gram Panchayat"
              style={styles.input}
              value={formData.gramPanchayat}
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
              placeholder="Village"
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

          {/* LANGUAGE */}

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

              {languages.map((item) => (

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
            style={styles.locationButton}
            onPress={getCurrentLocation}
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
                  Fetch GPS Location
                </Text>
              </>

            )}

          </TouchableOpacity>

          {/* REGISTER */}

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >

            {loading ? (

              <ActivityIndicator
                color="#ffffff"
              />

            ) : (

              <Text style={styles.buttonText}>
                Register
              </Text>

            )}

          </TouchableOpacity>

        </View>

        {/* LOGIN */}

        <View style={styles.bottomContainer}>

          <Text style={styles.bottomText}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login')
            }
          >

            <Text style={styles.loginText}>
              Login
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scroll: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#10b981',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b7280',
  },

  form: {
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 54,
    fontSize: 16,
    color: '#111827',
  },

  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 16,
  },

  dropdownIcon: {
    marginRight: 10,
  },

  picker: {
    flex: 1,
    height: 55,
  },

  locationButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
  },

  locationText: {
    color: '#10b981',
    marginLeft: 8,
    fontWeight: '600',
  },

  registerButton: {
    backgroundColor: '#10b981',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  bottomText: {
    color: '#6b7280',
    fontSize: 14,
  },

  loginText: {
    color: '#10b981',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  },

});