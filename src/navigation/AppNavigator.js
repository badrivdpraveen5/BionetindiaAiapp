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

        // Bottom tab colors
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',

        // =================================================
        // IMPORTANT:
        // Hide top header ONLY for bottom tab screens
        // =================================================
        headerShown: false,
      })}
    >

      {/* =================================================
          HOME
          ================================================= */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('home.home'),
        }}
      />

      {/* =================================================
          ENTRIES
          ================================================= */}
      <Tab.Screen
        name="Entries"
        component={BiodiversityListScreen}
        options={{
          title: t('home.entries'),
        }}
      />

      {/* =================================================
          ADD
          ================================================= */}
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

      {/* =================================================
          MAP
          ================================================= */}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: t('home.viewMap'),
        }}
      />

      {/* =================================================
          PROFILE
          ================================================= */}
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

  /*
  // Uncomment this temporarily if you want
  // to reset onboarding.

  useEffect(() => {
    const reset = async () => {
      await AsyncStorage.removeItem('introCompleted');
      console.log('Introduction reset');
    };

    reset();
  }, []);
  */

  const { isAuthenticated, loading } = useUser();

  const { t } = useLanguage();

  const [introCompleted, setIntroCompleted] = useState(null);


  // =====================================================
  // CHECK INTRODUCTION STATUS
  // =====================================================

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


  // =====================================================
  // WAIT FOR USER + INTRODUCTION
  // =====================================================

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
        onFinish={async () => {
          try {
            await AsyncStorage.setItem(
              'introCompleted',
              'true'
            );

            console.log(
              'Introduction completed'
            );

            setIntroCompleted(true);
          } catch (error) {
            console.error(
              'Failed to save introduction status:',
              error
            );

            // Still allow user to continue
            setIntroCompleted(true);
          }
        }}
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
            // MainTabs controls its own bottom navigation
            // and its tab headers are hidden above.
            headerShown: false,
          }}
        />

      ) : (

        <>
          {/* =================================================
              LOGIN
              ================================================= */}

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          {/* =================================================
              REGISTER
              ================================================= */}

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
          HEADER IS KEPT
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

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


      {/* =================================================
          TRADITIONAL KNOWLEDGE
          HEADER IS KEPT
          ================================================= */}

      <Stack.Screen
        name="TraditionalKnowledge"
        component={TraditionalKnowledgeScreen}
        options={{
          title: t(
            'traditionalKnowledge.title'
          ),

          headerStyle: {
            backgroundColor: '#10b981',
          },

          headerTintColor: '#fff',

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


      {/* =================================================
          AGRO BIODIVERSITY
          HEADER IS KEPT
          ================================================= */}

      <Stack.Screen
        name="AgroBiodiversity"
        component={AgroBiodiversityScreen}
        options={{
          title: t(
            'agroBiodiversity.title'
          ),

          headerStyle: {
            backgroundColor: '#10b981',
          },

          headerTintColor: '#fff',

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


      {/* =================================================
          HELP & SUPPORT
          HEADER IS KEPT
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

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


      {/* =================================================
          PRIVACY
          HEADER IS KEPT
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

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


      {/* =================================================
          ABOUT
          HEADER IS KEPT
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

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


      {/* =================================================
          DONATION
          HEADER IS KEPT
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

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

    </Stack.Navigator>
  );
}