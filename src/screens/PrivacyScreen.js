import React from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const supportEmail = 'support@bionetindia.org';

const dataItems = [
  'Account details such as name, phone/email, and user role.',
  'Biodiversity entry details such as common name, local name, habitat, description, and uses.',
  'Photos that users add to document biodiversity observations.',
  'GPS coordinates and location accuracy for mapping sightings.',
  'Audio notes, when users choose to record them.',
  'Offline entries stored on the device until they can be synced.',
  'Language preference used to improve accessibility.',
];

const purposeItems = [
  'Support People\'s Biodiversity Register documentation.',
  'Help communities record and understand local biodiversity.',
  'Display biodiversity observations in lists and map views.',
  'Review, organize, and manage field records.',
  'Improve app support and troubleshooting.',
];

const permissionItems = [
  {
    icon: 'camera-outline',
    title: 'Camera',
    text: 'Used to photograph plants, birds, insects, landscapes, and other biodiversity observations.',
  },
  {
    icon: 'location-outline',
    title: 'Location',
    text: 'Used to attach GPS coordinates to entries so observations can appear on maps.',
  },
  {
    icon: 'mic-outline',
    title: 'Microphone',
    text: 'Used to record audio notes and traditional knowledge when the user chooses to do so.',
  },
  {
    icon: 'images-outline',
    title: 'Storage and gallery',
    text: 'Used to select photos and keep offline data on the device before sync.',
  },
];

export default function PrivacyScreen() {
  const openEmail = async () => {
    const url = `mailto:${supportEmail}?subject=Bio-net%20India%20Privacy`;
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
      return;
    }

    Alert.alert('Privacy Contact', supportEmail);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Ionicons name="shield-checkmark-outline" size={34} color="#ffffff" />
        </View>
        <Text style={styles.heroTitle}>Privacy</Text>
        <Text style={styles.heroText}>
          This page explains how Bio-net India uses information needed for
          biodiversity documentation and field observations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information we may collect</Text>
        {dataItems.map((item) => (
          <View key={item} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How information is used</Text>
        {purposeItems.map((item) => (
          <View key={item} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App permissions</Text>
        {permissionItems.map((item) => (
          <View key={item.title} style={styles.permissionItem}>
            <Ionicons name={item.icon} size={24} color="#10b981" />
            <View style={styles.permissionContent}>
              <Text style={styles.permissionTitle}>{item.title}</Text>
              <Text style={styles.permissionText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your choices</Text>
        <Text style={styles.bodyText}>
          You can deny camera, location, microphone, or gallery permissions from
          your device settings. Some app features may not work when permission
          is denied.
        </Text>
        <Text style={styles.bodyText}>
          Please submit only information, photos, audio, or traditional
          knowledge that you are comfortable sharing for biodiversity
          documentation.
        </Text>
      </View>

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Plain-language summary</Text>
        <Text style={styles.noticeText}>
          This in-app page is an informational privacy summary. A full hosted
          privacy policy should be reviewed before app-store or public release.
        </Text>
      </View>

      <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
        <Ionicons name="mail-outline" size={22} color="#ffffff" />
        <Text style={styles.contactButtonText}>Contact Privacy Support</Text>
      </TouchableOpacity>
    </ScrollView>
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
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  permissionItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  permissionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 12,
  },
  noticeCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
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
  contactButton: {
    marginTop: 16,
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
