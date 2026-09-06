import React from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

const donationDetails = {
  payeeName: 'SUSTAINABLE ALTERNATIVES FOR RURAL ACCORD',
  upiId: '86946424000911@cnrb',
  merchantCode: '0825',
  upiUrl:
    'upi://pay?pa=86946424000911@cnrb&pn=SUSTAINABLE%20ALTERNATIVES%20FOR%20RURAL%20ACCORD&mc=0825&cu=INR',
  bankName: 'Canara Bank',
  accountNumber: 'To be added',
  ifscCode: 'To be added',
  branch: 'To be added',
};

const bankRows = [
  { label: 'Account holder', value: donationDetails.payeeName },
  { label: 'Account number', value: donationDetails.accountNumber },
  { label: 'IFSC code', value: donationDetails.ifscCode },
  { label: 'Bank name', value: donationDetails.bankName },
  { label: 'Branch', value: donationDetails.branch },
];

const isPlaceholder = (value) => value === 'To be added';

export default function DonationScreen() {
  const copyToClipboard = async (label, value) => {
    if (isPlaceholder(value)) {
      Alert.alert('Details pending', `${label} will be added soon.`);
      return;
    }

    await Clipboard.setStringAsync(value);
    Alert.alert('Copied', `${label} copied to clipboard.`);
  };

  const openUpiApp = async () => {
    try {
      const canOpen = await Linking.canOpenURL(donationDetails.upiUrl);

      if (canOpen) {
        Linking.openURL(donationDetails.upiUrl);
        return;
      }

      Alert.alert(
        'UPI app not found',
        `Please scan the QR code or pay manually to ${donationDetails.upiId}.`
      );
    } catch (error) {
      Alert.alert(
        'Unable to open UPI',
        `Please scan the QR code or pay manually to ${donationDetails.upiId}.`
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Ionicons name="heart-outline" size={34} color="#ffffff" />
        </View>
        <Text style={styles.heroTitle}>Donate / Support Us</Text>
        <Text style={styles.heroText}>
          Your contribution supports Bio-net India&apos;s biodiversity
          documentation, community learning, and People&apos;s Biodiversity
          Register efforts.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scan & pay</Text>
        <View style={styles.qrFrame}>
          <Image
            source={require('../../assets/donation.jpg')}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={openUpiApp}>
          <Ionicons name="phone-portrait-outline" size={22} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Donate via UPI</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>
          The amount is not fixed. Please enter the donation amount in your UPI
          app before confirming payment.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UPI details</Text>
        <DetailRow
          label="UPI ID"
          value={donationDetails.upiId}
          onCopy={() => copyToClipboard('UPI ID', donationDetails.upiId)}
        />
        <DetailRow
          label="Payee name"
          value={donationDetails.payeeName}
          onCopy={() => copyToClipboard('Payee name', donationDetails.payeeName)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bank transfer details</Text>
        {bankRows.map((row) => (
          <DetailRow
            key={row.label}
            label={row.label}
            value={row.value}
            muted={isPlaceholder(row.value)}
            onCopy={() => copyToClipboard(row.label, row.value)}
          />
        ))}
      </View>

      <View style={styles.noticeCard}>
        <Ionicons name="shield-checkmark-outline" size={22} color="#92400e" />
        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>Before you pay</Text>
          <Text style={styles.noticeText}>
            Please verify the recipient name in your UPI app before completing
            the donation. Bio-net India does not show payment success inside the
            app because UPI confirmation happens in your payment app.
          </Text>
        </View>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Need confirmation?</Text>
        <Text style={styles.footerText}>
          For donation confirmation or receipt support, email transaction
          details to support@bionetindia.org.
        </Text>
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value, muted, onCopy }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, muted && styles.detailValueMuted]}>
          {value}
        </Text>
      </View>
      <TouchableOpacity style={styles.copyButton} onPress={onCopy}>
        <Ionicons name="copy-outline" size={18} color="#10b981" />
        <Text style={styles.copyText}>Copy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroText: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  qrFrame: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginBottom: 16,
  },
  qrImage: {
    width: '100%',
    height: 430,
  },
  primaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  helpText: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 19,
    color: '#6b7280',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '600',
    lineHeight: 21,
  },
  detailValueMuted: {
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 5,
  },
  copyText: {
    color: '#065f46',
    fontSize: 13,
    fontWeight: '600',
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 6,
  },
  noticeText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  footerCard: {
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 6,
  },
  footerText: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 20,
  },
});
