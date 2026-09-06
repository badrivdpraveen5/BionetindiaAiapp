import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import styles from '../styles/Login.styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { login } from '../services/api';

export default function LoginScreen() {
  const navigation = useNavigation();

  const { setUser } = useUser();
  const { t } = useLanguage();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert(
        t('common.error'),
        t('login.enterPhoneAndPassword')
      );
      return;
    }

    setLoading(true);

    try {
      const { user } = await login(
        phoneNumber,
        password
      );

      await setUser(user);
    } catch (error) {
      Alert.alert(
        t('login.loginFailed'),
        t('login.invalidCredentials')
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GUEST LOGIN
  // ==========================================

  const handleGuestLogin = async () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      phoneNumber: '',
      role: 'community',
    };

    await setUser(guestUser);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
      style={styles.container}
    >
      <View style={styles.content}>

        {/* ======================================
            LOGO & TITLE
        ====================================== */}

        <View style={styles.header}>

          <View style={styles.logoContainer}>
            <Ionicons
              name="leaf"
              size={64}
              color="#10b981"
            />
          </View>

          <Text style={styles.title}>
            {t('common.appName')}
          </Text>

          <Text style={styles.subtitle}>
            {t('common.subtitle')}
          </Text>

        </View>

        {/* ======================================
            LOGIN FORM
        ====================================== */}

        <View style={styles.form}>

          {/* PHONE NUMBER */}

          <View style={styles.inputContainer}>

            <Ionicons
              name="call"
              size={20}
              color="#6b7280"
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder={t('login.phoneNumber')}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />

          </View>

          {/* PASSWORD */}

          <View style={styles.inputContainer}>

            <Ionicons
              name="lock-closed"
              size={20}
              color="#6b7280"
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder={t('login.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#9ca3af"
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(!showPassword)
              }
              style={styles.eyeIcon}
            >
              <Ionicons
                name={
                  showPassword
                    ? 'eye-off'
                    : 'eye'
                }
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>

          </View>

          {/* LOGIN BUTTON */}

          <TouchableOpacity
            style={[
              styles.loginButton,
              loading &&
                styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading
                ? t('login.loggingIn')
                : t('common.login')}
            </Text>
          </TouchableOpacity>

          {/* GUEST BUTTON */}

          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGuestLogin}
          >
            <Text style={styles.guestButtonText}>
              {t('login.continueAsGuest')}
            </Text>
          </TouchableOpacity>

          {/* FORGOT PASSWORD */}

          {/* 
          <TouchableOpacity
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              {t('login.forgotPassword')}
            </Text>
          </TouchableOpacity>
          */}

        </View>

        {/* ======================================
            REGISTER LINK
        ====================================== */}

        <View style={styles.registerContainer}>

          <Text style={styles.registerText}>
            {t('login.noAccount')}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'RegisterScreen'
              )
            }
          >
            <Text style={styles.registerLink}>
              {t('common.register')}
            </Text>
          </TouchableOpacity>

        </View>

        {/* ======================================
            FOOTER
        ====================================== */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>
            {t('common.poweredBy')}
          </Text>

          <Text style={styles.footerSubtext}>
            {t('common.tcsSupport')}
          </Text>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
}