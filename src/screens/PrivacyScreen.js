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
import styles from '../styles/Privacy.styles';
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
  "Support People's Biodiversity Register documentation.",
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

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
        return;
      }

      Alert.alert('Privacy Contact', supportEmail);
    } catch (error) {
      Alert.alert('Privacy Contact', supportEmail);
    }
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
      name="shield-checkmark-outline"
      size={26}
      color="#FFFFFF"
    />
  </View>

  <View style={styles.heroTextContainer}>
    <Text style={styles.heroTitle}>
      Privacy
    </Text>

    <Text style={styles.heroText}>
      This page explains how Bio-net India uses information
      needed for biodiversity documentation and field observations.
    </Text>
  </View>
</View>



      <View style={styles.card}>

        <View style={styles.cardHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="document-text-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>
              Information we may collect
            </Text>

            <Text style={styles.cardSubtitle}>
              Information used for biodiversity documentation
            </Text>
          </View>
        </View>

        {dataItems.map((item, index) => (
          <View
            key={item}
            style={[
              styles.bulletRow,
              index === dataItems.length - 1 &&
                styles.lastBulletRow,
            ]}
          >
            <View style={styles.bulletDot} />

            <Text style={styles.bulletText}>
              {item}
            </Text>
          </View>
        ))}

      </View>


      <View style={styles.card}>

        <View style={styles.cardHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="analytics-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>
              How information is used
            </Text>

            <Text style={styles.cardSubtitle}>
              Why the information is needed
            </Text>
          </View>
        </View>

        {purposeItems.map((item, index) => (
          <View
            key={item}
            style={[
              styles.bulletRow,
              index === purposeItems.length - 1 &&
                styles.lastBulletRow,
            ]}
          >
            <View style={styles.bulletDot} />

            <Text style={styles.bulletText}>
              {item}
            </Text>
          </View>
        ))}

      </View>


      <View style={styles.card}>

        <View style={styles.cardHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="phone-portrait-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>
              App permissions
            </Text>

            <Text style={styles.cardSubtitle}>
              Permissions required by app features
            </Text>
          </View>
        </View>


        {permissionItems.map((item, index) => (
          <View
            key={item.title}
            style={[
              styles.permissionItem,
              index === permissionItems.length - 1 &&
                styles.lastPermissionItem,
            ]}
          >

            <View style={styles.permissionIconCircle}>
              <Ionicons
                name={item.icon}
                size={22}
                color="#238B50"
              />
            </View>

            <View style={styles.permissionContent}>

              <Text style={styles.permissionTitle}>
                {item.title}
              </Text>

              <Text style={styles.permissionText}>
                {item.text}
              </Text>

            </View>

          </View>
        ))}

      </View>


      <View style={styles.card}>

        <View style={styles.cardHeader}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="options-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>
              Your choices
            </Text>

            <Text style={styles.cardSubtitle}>
              You are in control of permissions
            </Text>
          </View>
        </View>

        <Text style={styles.bodyText}>
          You can deny camera, location, microphone, or
          gallery permissions from your device settings.
          Some app features may not work when permission
          is denied.
        </Text>

        <Text style={styles.bodyText}>
          Please submit only information, photos, audio,
          or traditional knowledge that you are comfortable
          sharing for biodiversity documentation.
        </Text>

      </View>


      <View style={styles.noticeCard}>

        <View style={styles.noticeHeader}>

          <View style={styles.noticeIconCircle}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#A16207"
            />
          </View>

          <Text style={styles.noticeTitle}>
            Plain-language summary
          </Text>

        </View>

        <Text style={styles.noticeText}>
          This in-app page is an informational privacy
          summary. A full hosted privacy policy should be
          reviewed before app-store or public release.
        </Text>

      </View>


      <TouchableOpacity
        style={styles.contactButton}
        onPress={openEmail}
        activeOpacity={0.85}
      >

        <Ionicons
          name="mail-outline"
          size={21}
          color="#FFFFFF"
        />

        <Text style={styles.contactButtonText}>
          Contact Privacy Support
        </Text>

        <Ionicons
          name="arrow-forward"
          size={20}
          color="#FFFFFF"
        />

      </TouchableOpacity>


      <View style={styles.bottomSpace} />

    </ScrollView>
  );
}


