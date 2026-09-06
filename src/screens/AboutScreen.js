import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const contributors = [
  'Rajeev Mishra',
  'Jitin Bal',
  'Maria Mohan',
  'Darshan Dommalapati',
  'Rohit Kumar'
];

const missionItems = [
  'Encourage observation and learning from nature',
  'Support local biodiversity knowledge',
  'Enable community participation in documentation',
  'Strengthen People\'s Biodiversity Register (PBR) efforts',
];

const capabilities = [
  {
    icon: 'leaf-outline',
    label: 'Biodiversity records',
  },
  {
    icon: 'camera-outline',
    label: 'Photo documentation',
  },
  {
    icon: 'location-outline',
    label: 'GPS mapping',
  },
  {
    icon: 'mic-outline',
    label: 'Audio notes',
  },
  {
    icon: 'cloud-offline-outline',
    label: 'Offline support',
  },
  {
    icon: 'language-outline',
    label: 'Multilingual access',
  },
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>About Bio-net India</Text>
        <Text style={styles.subtitle}>
          Community-driven biodiversity observation and learning.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Bio-net India</Text>
        <Text style={styles.bodyText}>
          Bio-net India is a community-driven platform for observing and
          understanding local biodiversity.
        </Text>
        <Text style={styles.bodyText}>
          It brings together everyday observations of plants, birds, insects,
          and landscapes into a shared space for learning and reflection.
        </Text>
        <Text style={styles.bodyText}>
          Designed to be simple and accessible, Bio-net India supports people in
          building a deeper connection with the natural world around them.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our vision</Text>
        <Text style={styles.bodyText}>
          To nurture a culture of shared ecological awareness rooted in local
          landscapes and communities.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Our mission</Text>
        {missionItems.map((item) => (
          <View key={item} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>How Bio-net works</Text>
        <Text style={styles.bodyText}>
          Bio-net India is built on participation and curiosity. It encourages
          people to observe and record nature in everyday life, learn from
          others in their region, and share local and traditional knowledge.
        </Text>
        <Text style={styles.bodyText}>
          The platform values continuity, care, and collective learning over
          speed or expertise.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What the app supports</Text>
        <View style={styles.capabilityGrid}>
          {capabilities.map((item) => (
            <View key={item.label} style={styles.capabilityItem}>
              <Ionicons name={item.icon} size={22} color="#10b981" />
              <Text style={styles.capabilityText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Community & support</Text>
        <Text style={styles.bodyText}>
          Bio-net India is initiated and facilitated by the SARA Centre, a
          community-led initiative working on ecology, culture, and
          sustainability.
        </Text>
        <Text style={styles.bodyText}>
          The platform is developed with support from the TCS ProEngage
          Volunteers Program.
        </Text>
        <Text style={styles.bodyText}>
          It is shaped by educators, researchers, students, nature
          practitioners, and community members working together to strengthen
          ecological awareness.
        </Text>

        <View style={styles.contributorsBox}>
          <Text style={styles.contributorsTitle}>Contributors</Text>
          <Text style={styles.contributorsText}>{contributors.join(', ')}</Text>
        </View>
      </View>

      <View style={styles.versionCard}>
        <Text style={styles.versionTitle}>Bio-net India</Text>
        <Text style={styles.versionText}>
          People's Biodiversity Register under Biological Diversity Act 2002
        </Text>
        <Text style={styles.versionNumber}>Version 1.0.0</Text>
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
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 22,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subtitle: {
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
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#374151',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 14,
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
  capabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  capabilityItem: {
    width: '48%',
    minHeight: 78,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1fae5',
    backgroundColor: '#f0fdf4',
    padding: 12,
    gap: 8,
  },
  capabilityText: {
    fontSize: 13,
    color: '#065f46',
    fontWeight: '600',
    lineHeight: 18,
  },
  contributorsBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 14,
    marginTop: 4,
  },
  contributorsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  contributorsText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  versionCard: {
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 18,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  versionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 6,
  },
  versionText: {
    fontSize: 13,
    color: '#047857',
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 8,
  },
  versionNumber: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
});
