import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  verifyEmailOTP,
  resendEmailOTP,
} from '../services/api';

export default function EmailVerificationScreen() {

  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions();
  const email = route.params?.email || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] =
    useState(false);
  // Responsive values
  const isSmallScreen = width < 360;
  const isTablet = width >= 600;

  const contentWidth = isTablet
    ? Math.min(width * 0.65, 500)
    : width - 40;

  const handleVerifyOTP = async () => {

    if (otp.length !== 6) {

      Alert.alert(
        'Invalid OTP',
        'Please enter the 6-digit OTP.'
      );

      return;
    }

    try {

      setLoading(true);

      const payload = {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      };

      console.log(
        'VERIFY OTP PAYLOAD =>',
        payload
      );

      const response =
        await verifyEmailOTP(payload);

      console.log(
        'VERIFY OTP RESPONSE =>',
        response
      );

      Alert.alert(
        'Email Verified ✓',
        'Your email has been verified successfully. You can now login.',
        [
          {
            text: 'Login',
            onPress: () => {

              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Login',
                  },
                ],
              });

            },
          },
        ]
      );

    } catch (error) {

      console.log(
        'VERIFY OTP ERROR =>',
        error.response?.data ||
        error.message
      );

      Alert.alert(
        'Verification Failed',
        error.response?.data?.message ||
        'Invalid or expired OTP. Please try again.'
      );

    } finally {

      setLoading(false);

    }
  };


  const handleResendOTP = async () => {

    try {

      setResendLoading(true);

      await resendEmailOTP({
        email: email.trim().toLowerCase(),
      });

      setOtp('');

      Alert.alert(
        'OTP Sent',
        'A new OTP has been sent to your email.'
      );

    } catch (error) {

      console.log(
        'RESEND OTP ERROR =>',
        error.response?.data ||
        error.message
      );

      Alert.alert(
        'Resend Failed',
        error.response?.data?.message ||
        'Unable to resend OTP.'
      );

    } finally {

      setResendLoading(false);

    }
  };


  const handleBack = () => {
    navigation.goBack();
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
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: height,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View
          style={[
            styles.content,
            {
              width: contentWidth,
            },
          ]}
        >


          <View style={styles.header}>

            <View
              style={[
                styles.logoContainer,
                isSmallScreen &&
                  styles.logoContainerSmall,
              ]}
            >

              <Image
                source={require('../../assets/icon.png')}
                style={[
                  styles.logo,
                  isSmallScreen &&
                    styles.logoSmall,
                ]}
              />

            </View>

            <Text
              style={[
                styles.brandTitle,
                isSmallScreen &&
                  styles.brandTitleSmall,
              ]}
            >
              Bio-net India
            </Text>

          </View>

          {/* ========================================= */}
          {/* EMAIL ICON */}
          {/* ========================================= */}

          <View
            style={[
              styles.emailIconContainer,
              isSmallScreen &&
                styles.emailIconContainerSmall,
            ]}
          >

            <Ionicons
              name="mail-outline"
              size={isSmallScreen ? 32 : 40}
              color="#10b981"
            />

          </View>


          <Text
            style={[
              styles.title,
              isSmallScreen &&
                styles.titleSmall,
            ]}
          >
            Verify Your Email
          </Text>

          <Text style={styles.description}>
            We have sent a 6-digit verification
            code to
          </Text>

          <Text
            style={[
              styles.emailText,
              isSmallScreen &&
                styles.emailTextSmall,
            ]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {email}
          </Text>

          <TouchableOpacity
            onPress={handleBack}
            style={styles.changeEmailButton}
          >

            <Text style={styles.changeEmailText}>
              Change Email
            </Text>

          </TouchableOpacity>

          <Text style={styles.otpLabel}>
            Enter Verification Code
          </Text>

          <TextInput
            style={[
              styles.otpInput,
              isSmallScreen &&
                styles.otpInputSmall,
            ]}
            value={otp}
            onChangeText={(text) => {

              const value =
                text.replace(/[^0-9]/g, '');

              setOtp(value);

            }}
            placeholder="000000"
            placeholderTextColor="#c4c7cc"
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
            autoFocus={false}
          />

          <Text style={styles.otpInfo}>
            Enter the OTP sent to your registered email
          </Text>

    
          <TouchableOpacity
            style={[
              styles.verifyButton,
              otp.length === 6 &&
                styles.verifyButtonActive,
            ]}
            onPress={handleVerifyOTP}
            disabled={
              loading ||
              otp.length !== 6
            }
          >

            {loading ? (

              <ActivityIndicator
                size="small"
                color="#ffffff"
              />

            ) : (

              <>

                <Ionicons
                  name="checkmark-circle-outline"
                  size={21}
                  color="#ffffff"
                />

                <Text style={styles.verifyButtonText}>
                  Verify Email
                </Text>

              </>

            )}

          </TouchableOpacity>

          <View style={styles.resendContainer}>

            <Text style={styles.resendLabel}>
              Didn't receive the code?
            </Text>

            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={resendLoading}
            >

              {resendLoading ? (

                <ActivityIndicator
                  size="small"
                  color="#10b981"
                />

              ) : (

                <Text style={styles.resendText}>
                  Resend OTP
                </Text>

              )}

            </TouchableOpacity>

          </View>

          <View style={styles.securityContainer}>

            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#10b981"
            />

            <Text style={styles.securityText}>
              Your email verification helps keep
              your Bio-net India account secure.
            </Text>

          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              navigation.navigate('Login')
            }
          >

            <Ionicons
              name="arrow-back"
              size={18}
              color="#10b981"
            />

            <Text style={styles.loginText}>
              Back to Login
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


// =======================================================
// STYLES
// =======================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },

  content: {
    alignItems: 'center',
  },

  // ============================================
  // HEADER
  // ============================================

  header: {
    alignItems: 'center',
    marginBottom: 18,
  },

  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainerSmall: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },

  logoSmall: {
    width: 50,
    height: 50,
  },

  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
    marginTop: 8,
  },

  brandTitleSmall: {
    fontSize: 16,
  },

  // ============================================
  // EMAIL ICON
  // ============================================

  emailIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  emailIconContainerSmall: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },

  // ============================================
  // TITLE
  // ============================================

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },

  titleSmall: {
    fontSize: 23,
  },

  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 21,
  },

  // ============================================
  // EMAIL
  // ============================================

  emailText: {
    maxWidth: '100%',
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
    marginTop: 7,
  },

  emailTextSmall: {
    fontSize: 14,
  },

  changeEmailButton: {
    marginTop: 7,
    marginBottom: 20,
  },

  changeEmailText: {
    color: '#6b7280',
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  // ============================================
  // OTP
  // ============================================

  otpLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  otpInput: {
    width: '100%',
    height: 60,
    borderWidth: 1.5,
    borderColor: '#10b981',
    borderRadius: 14,
    backgroundColor: '#f9fafb',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 7,
    color: '#111827',
  },

  otpInputSmall: {
    height: 54,
    fontSize: 22,
    letterSpacing: 5,
  },

  otpInfo: {
    width: '100%',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 7,
    marginBottom: 18,
  },

  // ============================================
  // VERIFY
  // ============================================

  verifyButton: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    backgroundColor: '#a7f3d0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  verifyButtonActive: {
    backgroundColor: '#10b981',
  },

  verifyButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 7,
  },

  // ============================================
  // RESEND
  // ============================================

  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  resendLabel: {
    fontSize: 13,
    color: '#6b7280',
  },

  resendText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#10b981',
    marginLeft: 5,
  },

  // ============================================
  // SECURITY
  // ============================================

  securityContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 11,
    marginTop: 22,
  },

  securityText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#047857',
  },

  // ============================================
  // LOGIN
  // ============================================

  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },

  loginText: {
    color: '#10b981',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },

});

