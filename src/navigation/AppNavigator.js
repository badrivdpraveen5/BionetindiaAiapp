import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import OnBoarding from '../screens/OnBoarding';
import BiodiversityListScreen from '../screens/BiodiversityListScreen';
import BiodiversityFormScreen from '../screens/BiodiversityFormScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import HelpSupportScreen from '../screens/HelpSupportScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import AboutScreen from '../screens/AboutScreen';
import DonationScreen from '../screens/DonationScreen';

import TraditionalKnowledgeScreen from '../screens/TraditionalKnowledgeScreen';
import AgroBiodiversityScreen from '../screens/AgroBiodiversityScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// =====================================================
// MAIN TAB NAVIGATOR
// =====================================================

function MainTabs() {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }

          else if (route.name === 'Entries') {
            iconName = focused
              ? 'list'
              : 'list-outline';
          }

          else if (route.name === 'Add') {
            iconName = focused
              ? 'add-circle'
              : 'add-circle-outline';
          }

          else if (route.name === 'Map') {
            iconName = focused
              ? 'map'
              : 'map-outline';
          }

          else if (route.name === 'Profile') {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',

        headerStyle: {
          backgroundColor:
            Platform.OS === 'ios'
              ? '#ffffff'
              : '#10b981',
        },

        headerTintColor:
          Platform.OS === 'ios'
            ? '#10b981'
            : '#ffffff',

        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >

      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('home.home'),
        }}
      />

      {/* Entries */}
      <Tab.Screen
        name="Entries"
        component={BiodiversityListScreen}
        options={{
          title: t('home.entries'),
        }}
      />

      {/* Add */}
      <Tab.Screen
        name="Add"
        component={BiodiversityFormScreen}
        options={{
          title: t('navigation.add'),

          // Hide Add tab on Android
          tabBarButton:
            Platform.OS === 'android'
              ? () => null
              : undefined,
        }}
      />

      {/* Map */}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: t('home.viewMap'),
        }}
      />

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('home.profile'),
        }}
      />

    </Tab.Navigator>
  );
}


// =====================================================
// APP NAVIGATOR
// =====================================================

export default function AppNavigator() {
  // useEffect(() => {
  //  const reset = async () => { 
  // await AsyncStorage.removeItem('introCompleted'); 
  // console.log('Introduction reset'); 
  // }; 
  // reset(); 
  // }, []);
  const { isAuthenticated, loading } = useUser();

  const { t } = useLanguage();

  const [introCompleted, setIntroCompleted] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('introCompleted').then(
      (value) => {
        console.log(
          'introCompleted:',
          value
        );

        setIntroCompleted(
          value === 'true'
        );
      }
    );
  }, []);

  // Wait for UserContext and introduction status
  if (
    loading ||
    introCompleted === null
  ) {
    return null;
  }

  // =====================================================
  // FIRST INSTALLATION → INTRODUCTION
  // =====================================================

  if (!introCompleted) {
    return (
      <OnBoarding
        onFinish={() =>
          setIntroCompleted(true)
        }
      />
    );
  }

  // =====================================================
  // MAIN APPLICATION
  // =====================================================

  return (
    <Stack.Navigator>

      {/* =================================================
          AUTHENTICATED USER
          ================================================= */}

      {isAuthenticated ? (
        <Stack.Screen
          name="MainApp"
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          {/* Login */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          {/* Register */}
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}

      {/* =================================================
          ADD BIODIVERSITY ENTRY
          ================================================= */}

      <Stack.Screen
        name="AddEntry"
        component={BiodiversityFormScreen}
        options={{
          title: t('biodiversityForm.addEntry'),
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
        }}
      />

      {/* =================================================
          TRADITIONAL KNOWLEDGE
          ================================================= */}

      <Stack.Screen
        name="TraditionalKnowledge"
        component={TraditionalKnowledgeScreen}
        options={{
          title: t(
            'traditionalKnowledge.title'
          ),
        }}
      />

      {/* =================================================
          AGRO BIODIVERSITY
          ================================================= */}

      <Stack.Screen
        name="AgroBiodiversity"
        component={AgroBiodiversityScreen}
        options={{
          title: t(
            'agroBiodiversity.title'
          ),
        }}
      />

      {/* =================================================
          HELP & SUPPORT
          ================================================= */}

      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{
          title: t(
            'profile.helpSupport'
          ),
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
        }}
      />

      {/* =================================================
          PRIVACY
          ================================================= */}

      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          title: t(
            'profile.privacy'
          ),
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
        }}
      />

      {/* =================================================
          ABOUT
          ================================================= */}

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: t(
            'profile.about'
          ),
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
        }}
      />

      {/* =================================================
          DONATION
          ================================================= */}

      <Stack.Screen
        name="Donation"
        component={DonationScreen}
        options={{
          title: t(
            'profile.donateSupport'
          ),
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
        }}
      />

    </Stack.Navigator>
  );
}