
import React, { useState } from 'react';
import  styles  from '../styles/Donation.styles';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Linking,
  Image,
} from 'react-native';

import * as Clipboard from 'expo-clipboard';

const DonationScreen = () => {


  const donationDetails = {
    payeeName: 'SUSTAINABLE ALTERNATIVES FOR RURAL ACCORD',
    upiId: '86946424000911@cnrb',
    merchantCode: '0825',

    bankName: 'Canara Bank',
    accountNumber: 'To be added',
    ifscCode: 'To be added',
    branch: 'To be added',
  };


  const quickAmounts = [100, 250, 500, 1000];

  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');


  const selectAmount = (value) => {
    setAmount(value);
    setCustomAmount('');
  };



  const handleCustomAmount = (text) => {
    const cleanedValue = text.replace(/[^0-9]/g, '');

    setCustomAmount(cleanedValue);

    if (cleanedValue) {
      setAmount(Number(cleanedValue));
    }
  };


  const copyText = async (text, label = 'Text') => {
    if (!text || text === 'To be added') {
      Alert.alert(
        'Not Available',
        `${label} has not been added yet.`
      );
      return;
    }

    await Clipboard.setStringAsync(text);

    Alert.alert(
      'Copied',
      `${label} copied to clipboard.`
    );
  };



  const copyUPI = () => {
    copyText(donationDetails.upiId, 'UPI ID');
  };


  const payViaUPI = async () => {
    if (!amount || amount <= 0) {
      Alert.alert(
        'Invalid Amount',
        'Please select or enter a valid donation amount.'
      );
      return;
    }

    const upiUrl =
      `upi://pay?pa=${encodeURIComponent(donationDetails.upiId)}` +
      `&pn=${encodeURIComponent(donationDetails.payeeName)}` +
      `&mc=${encodeURIComponent(donationDetails.merchantCode)}` +
      `&cu=INR` +
      `&am=${Number(amount).toFixed(2)}`;

    try {
      const supported = await Linking.canOpenURL(upiUrl);

      if (supported) {
        await Linking.openURL(upiUrl);
      } else {
        Alert.alert(
          'UPI App Not Found',
          `Please make the payment manually using this UPI ID:\n\n${donationDetails.upiId}`,
          [
            {
              text: 'Copy UPI ID',
              onPress: copyUPI,
            },
            {
              text: 'OK',
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Unable to Open UPI',
        `Please use the UPI ID manually:\n\n${donationDetails.upiId}`,
        [
          {
            text: 'Copy UPI ID',
            onPress: copyUPI,
          },
          {
            text: 'OK',
          },
        ]
      );
    }
  };


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >


      <View style={styles.topSection}>

        <View style={styles.topIconCircle}>
          <Text style={styles.topIcon}>❤️</Text>
        </View>

        <View style={styles.topTextContainer}>
          <Text style={styles.topTitle}>
            Support Bio-net India
          </Text>

          <Text style={styles.topSubtitle}>
            Your contribution helps us support biodiversity
            documentation and conservation.
          </Text>
        </View>

      </View>

      <View style={styles.card}>

        {/* Card Header */}

        <View style={styles.cardHeader}>

          <View style={styles.iconCircle}>
            <Text style={styles.icon}>❤️</Text>
          </View>

          <View style={styles.cardHeaderText}>

            <Text style={styles.cardTitle}>
              Donate via UPI
            </Text>

            <Text style={styles.cardSubtitle}>
              Quick and secure payment
            </Text>

          </View>

        </View>




        <Text style={styles.sectionLabel}>
          Select donation amount
        </Text>


        <View style={styles.amountGrid}>

          {quickAmounts.map((value) => {

            const isSelected =
              amount === value &&
              customAmount === '';

            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.amountButton,
                  isSelected &&
                    styles.amountButtonSelected,
                ]}
                onPress={() => selectAmount(value)}
                activeOpacity={0.8}
              >

                <Text
                  style={[
                    styles.amountButtonText,
                    isSelected &&
                      styles.amountButtonTextSelected,
                  ]}
                >
                  ₹{value}
                </Text>

              </TouchableOpacity>
            );
          })}

        </View>


        {/* Custom Amount */}

        <View style={styles.customAmountContainer}>

          <Text style={styles.rupeeSymbol}>
            ₹
          </Text>

          <TextInput
            style={styles.customAmountInput}
            value={customAmount}
            onChangeText={handleCustomAmount}
            placeholder="Enter custom amount"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={8}
          />

        </View>


        {/* Selected Amount */}

        <View style={styles.selectedAmountBox}>

          <View>

            <Text style={styles.selectedAmountLabel}>
              You are donating
            </Text>

            <Text style={styles.selectedAmount}>
              ₹{Number(amount || 0).toLocaleString('en-IN')}
            </Text>

          </View>


          <View style={styles.checkCircle}>

            <Text style={styles.checkMark}>
              ✓
            </Text>

          </View>

        </View>


        {/* Payee */}

        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            Payee
          </Text>

          <Text style={styles.payeeText}>
            {donationDetails.payeeName}
          </Text>

        </View>


        {/* UPI ID */}

        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            UPI ID
          </Text>

          <View style={styles.upiRow}>

            <Text style={styles.upiText}>
              {donationDetails.upiId}
            </Text>

            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyUPI}
              activeOpacity={0.7}
            >

              <Text style={styles.copyIcon}>
                📋
              </Text>

            </TouchableOpacity>

          </View>

        </View>


        {/* Pay Button */}

        <TouchableOpacity
          style={styles.payButton}
          onPress={payViaUPI}
          activeOpacity={0.85}
        >

          <Text style={styles.payButtonText}>
            ⚡ Pay ₹
            {Number(amount || 0).toLocaleString('en-IN')}
            {' '}via UPI
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>

        </TouchableOpacity>


        {/* Payment Note */}

        <Text style={styles.paymentNote}>
          Amount will be pre-filled in your UPI app.
        </Text>

      </View>


      <View style={styles.card}>

        <View style={styles.scanHeader}>

          <Text style={styles.scanIcon}>
            ▣
          </Text>

          <View>

            <Text style={styles.cardTitle}>
              Scan & Pay
            </Text>

            <Text style={styles.cardSubtitle}>
              Use any UPI app
            </Text>

          </View>

        </View>


        {/* QR */}

        <View style={styles.qrContainer}>

          <Image
            source={require('../../assets/donation.jpg')}
            style={styles.qrImage}
            resizeMode="contain"
          />

        </View>


        <Text style={styles.scanText}>
          Scan using any UPI app
        </Text>

      </View>


      <View style={styles.card}>

        <Text style={styles.bankTitle}>
          🏦 Bank Transfer
        </Text>


        {/* Bank Name */}

        <View style={styles.bankRow}>

          <Text style={styles.bankLabel}>
            Bank Name
          </Text>

          <Text style={styles.bankValue}>
            {donationDetails.bankName}
          </Text>

        </View>


        {/* Account Number */}

        <View style={styles.bankRow}>

          <Text style={styles.bankLabel}>
            Account Number
          </Text>

          <View style={styles.bankValueContainer}>

            <Text
              style={styles.bankValue}
              numberOfLines={1}
            >
              {donationDetails.accountNumber}
            </Text>

            <TouchableOpacity
              style={styles.bankCopyButton}
              onPress={() =>
                copyText(
                  donationDetails.accountNumber,
                  'Account Number'
                )
              }
              activeOpacity={0.7}
            >

              <Text style={styles.bankCopyText}>
                Copy
              </Text>

            </TouchableOpacity>

          </View>

        </View>


        {/* IFSC */}

        <View style={styles.bankRow}>

          <Text style={styles.bankLabel}>
            IFSC Code
          </Text>

          <View style={styles.bankValueContainer}>

            <Text
              style={styles.bankValue}
              numberOfLines={1}
            >
              {donationDetails.ifscCode}
            </Text>

            <TouchableOpacity
              style={styles.bankCopyButton}
              onPress={() =>
                copyText(
                  donationDetails.ifscCode,
                  'IFSC Code'
                )
              }
              activeOpacity={0.7}
            >

              <Text style={styles.bankCopyText}>
                Copy
              </Text>

            </TouchableOpacity>

          </View>

        </View>


        {/* Branch */}

        <View style={styles.bankRow}>

          <Text style={styles.bankLabel}>
            Branch
          </Text>

          <Text style={styles.bankValue}>
            {donationDetails.branch}
          </Text>

        </View>

      </View>


      <View style={styles.noticeBox}>

        <Text style={styles.noticeTitle}>
          💚 Thank you for your support
        </Text>

        <Text style={styles.noticeText}>
          Every contribution helps Bio-net India document,
          preserve and promote India's rich biodiversity.
        </Text>

      </View>


      <View style={styles.bottomSpace} />

    </ScrollView>
  );
};

export default DonationScreen;


