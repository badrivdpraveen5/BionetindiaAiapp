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
const websiteUrl = 'https://www.bionetindia.org';

const helpSteps = [
  'Create an account or log in with your registered phone/email.',
  'Use Add Entry to record a plant, bird, insect, landscape, or local observation.',
  'Add clear photos, capture GPS location, and record audio notes when useful.',
  'Review your submissions in Entries and explore nearby records in Map View.',
  'Use Profile to change language and manage app settings.',
];

const commonIssues = [
  {
    icon: 'camera-outline',
    title: 'Camera not working',
    text: 'Allow camera permission from device settings and test on a real device.',
  },
  {
    icon: 'location-outline',
    title: 'Location not captured',
    text: 'Turn on GPS and allow location access while using the app.',
  },
  {
    icon: 'mic-outline',
    title: 'Audio not recording',
    text: 'Allow microphone permission before recording field notes.',
  },
  {
    icon: 'cloud-offline-outline',
    title: 'Entry not submitting',
    text: 'If you are offline, the entry can be saved and synced when internet returns.',
  },
  {
    icon: 'person-circle-outline',
    title: 'Login or registration issue',
    text: 'Check your phone/email and password, then contact support if the issue continues.',
  },
];

const languages = [
  'English',
  'Hindi',
  'Kannada',
  'Telugu',
  'Malayalam',
  'Tamil',
  'Odia',
  'Bengali',
  'Marathi',
];

export default function HelpSupportScreen() {
  const openEmail = async () => {
    const url = `mailto:${supportEmail}?subject=Bio-net%20India%20Support`;
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
      return;
    }

    Alert.alert('Support Email', supportEmail);
  };

  const openWebsite = async () => {
    const canOpen = await Linking.canOpenURL(websiteUrl);

    if (canOpen) {
      Linking.openURL(websiteUrl);
      return;
    }

    Alert.alert('Website', websiteUrl);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Ionicons name="help-buoy-outline" size={32} color="#ffffff" />
        </View>
        <Text style={styles.heroTitle}>How can we help?</Text>
        <Text style={styles.heroText}>
          Find quick guidance for using Bio-net India in the field, even when
          connectivity is limited.
        </Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={openEmail}>
          <Ionicons name="mail-outline" size={22} color="#10b981" />
          <Text style={styles.actionText}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={openWebsite}>
          <Ionicons name="globe-outline" size={22} color="#10b981" />
          <Text style={styles.actionText}>Website</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to use the app</Text>
        {helpSteps.map((step, index) => (
          <View key={step} style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common problems</Text>
        {commonIssues.map((issue) => (
          <View key={issue.title} style={styles.issueItem}>
            <Ionicons name={issue.icon} size={24} color="#6b7280" />
            <View style={styles.issueContent}>
              <Text style={styles.issueTitle}>{issue.title}</Text>
              <Text style={styles.issueText}>{issue.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offline mode</Text>
        <Text style={styles.bodyText}>
          Bio-net India can save entries when the phone is offline. Saved
          entries are synced automatically when the internet connection returns.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language support</Text>
        <Text style={styles.bodyText}>
          The app supports {languages.join(', ')}. You can change language from
          the Profile page.
        </Text>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Still need help?</Text>
        <Text style={styles.footerText}>
          Contact SARA Centre support through {supportEmail}.
        </Text>
      </View>
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
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1fae5',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065f46',
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
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#065f46',
    fontSize: 13,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  issueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  issueContent: {
    flex: 1,
  },
  issueTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  issueText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6b7280',
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
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
