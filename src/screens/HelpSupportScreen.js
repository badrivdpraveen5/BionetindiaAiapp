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
import styles from '../styles/HelpSupport.styles';
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.heroCard}>
        <View style={styles.heroIconCircle}>
          <Ionicons
            name="help-buoy-outline"
            size={26}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>
            Help & Support
          </Text>

          <Text style={styles.heroText}>
            Find quick guidance for using Bio-net India in the field,
            even when connectivity is limited.
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={openEmail}
          activeOpacity={0.8}
        >
          <View style={styles.actionIconCircle}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#238B50"
            />
          </View>

          <Text style={styles.actionText}>
            Email Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={openWebsite}
          activeOpacity={0.8}
        >
          <View style={styles.actionIconCircle}>
            <Ionicons
              name="globe-outline"
              size={22}
              color="#238B50"
            />
          </View>

          <Text style={styles.actionText}>
            Website
          </Text>
        </TouchableOpacity>

      </View>


      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="book-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              How to use the app
            </Text>

            <Text style={styles.sectionSubtitle}>
              Follow these simple steps
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {helpSteps.map((step, index) => (
          <View
            key={step}
            style={[
              styles.stepItem,
              index === helpSteps.length - 1 && styles.lastItem,
            ]}
          >
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.stepText}>
              {step}
            </Text>
          </View>
        ))}

      </View>

      {/* =========================
          COMMON PROBLEMS
      ========================== */}
      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="construct-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Common problems
            </Text>

            <Text style={styles.sectionSubtitle}>
              Quick solutions for common issues
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {commonIssues.map((issue, index) => (
          <View
            key={issue.title}
            style={[
              styles.issueItem,
              index === commonIssues.length - 1 && styles.lastItem,
            ]}
          >

            <View style={styles.issueIconCircle}>
              <Ionicons
                name={issue.icon}
                size={21}
                color="#238B50"
              />
            </View>

            <View style={styles.issueContent}>
              <Text style={styles.issueTitle}>
                {issue.title}
              </Text>

              <Text style={styles.issueText}>
                {issue.text}
              </Text>
            </View>

          </View>
        ))}

      </View>

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="cloud-offline-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Offline mode
            </Text>

            <Text style={styles.sectionSubtitle}>
              Continue working without internet
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          Bio-net India can save entries when the phone is offline.
          Saved entries are synced automatically when the internet
          connection returns.
        </Text>

      </View>

 
      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="language-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Language support
            </Text>

            <Text style={styles.sectionSubtitle}>
              Choose your preferred language
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          The app supports {languages.join(', ')}. You can change
          language from the Profile page.
        </Text>

      </View>

      <View style={styles.supportCard}>

        <View style={styles.supportIconCircle}>
          <Ionicons
            name="headset-outline"
            size={24}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.supportContent}>
          <Text style={styles.supportTitle}>
            Still need help?
          </Text>

          <Text style={styles.supportText}>
            Contact SARA Centre support through {supportEmail}.
          </Text>
        </View>

      </View>


      <View style={styles.bottomSpace} />

    </ScrollView>
  );
}

