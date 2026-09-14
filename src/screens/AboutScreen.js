import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from '../styles/About.styles';
import { Ionicons } from '@expo/vector-icons';

const contributors = [
  'Rajeev Mishra',
  'Jitin Bal',
  'Maria Mohan',
  'Darshan Dommalapati',
  'Rohit Kumar',
];

const missionItems = [
  'Encourage observation and learning from nature',
  'Support local biodiversity knowledge',
  'Enable community participation in documentation',
  "Strengthen People's Biodiversity Register (PBR) efforts",
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.heroCard}>

        <View style={styles.heroIconCircle}>
          <Ionicons
            name="leaf-outline"
            size={27}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>
            About Bio-net India
          </Text>

          <Text style={styles.heroText}>
            Community-driven biodiversity observation and learning.
          </Text>
        </View>

      </View>

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              About Bio-net India
            </Text>

            <Text style={styles.sectionSubtitle}>
              A community-driven biodiversity platform
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          Bio-net India is a community-driven platform for observing
          and understanding local biodiversity.
        </Text>

        <Text style={styles.bodyText}>
          It brings together everyday observations of plants, birds,
          insects, and landscapes into a shared space for learning
          and reflection.
        </Text>

        <Text style={styles.bodyTextLast}>
          Designed to be simple and accessible, Bio-net India supports
          people in building a deeper connection with the natural
          world around them.
        </Text>

      </View>

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="eye-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Our vision
            </Text>

            <Text style={styles.sectionSubtitle}>
              Building ecological awareness
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          To nurture a culture of shared ecological awareness rooted
          in local landscapes and communities.
        </Text>

        <View style={styles.subDivider} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="flag-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Our mission
            </Text>

            <Text style={styles.sectionSubtitle}>
              Supporting communities and biodiversity
            </Text>
          </View>
        </View>

        <View style={styles.missionList}>
          {missionItems.map((item) => (
            <View
              key={item}
              style={styles.bulletRow}
            >
              <View style={styles.bulletDot} />

              <Text style={styles.bulletText}>
                {item}
              </Text>
            </View>
          ))}
        </View>

      </View>

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="people-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              How Bio-net works
            </Text>

            <Text style={styles.sectionSubtitle}>
              Participation, curiosity and collective learning
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          Bio-net India is built on participation and curiosity.
          It encourages people to observe and record nature in
          everyday life, learn from others in their region, and
          share local and traditional knowledge.
        </Text>

        <Text style={styles.bodyTextLast}>
          The platform values continuity, care, and collective
          learning over speed or expertise.
        </Text>

      </View>

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="apps-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              What the app supports
            </Text>

            <Text style={styles.sectionSubtitle}>
              Tools for biodiversity documentation
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.capabilityGrid}>
          {capabilities.map((item) => (
            <View
              key={item.label}
              style={styles.capabilityItem}
            >
              <View style={styles.capabilityIconCircle}>
                <Ionicons
                  name={item.icon}
                  size={21}
                  color="#238B50"
                />
              </View>

              <Text style={styles.capabilityText}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

      </View>

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconCircle}>
            <Ionicons
              name="heart-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Community & support
            </Text>

            <Text style={styles.sectionSubtitle}>
              People working together for biodiversity
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          Bio-net India is initiated and facilitated by the SARA
          Centre, a community-led initiative working on ecology,
          culture, and sustainability.
        </Text>

        <Text style={styles.bodyText}>
          The platform is developed with support from the TCS
          ProEngage Volunteers Program.
        </Text>

        <Text style={styles.bodyTextLast}>
          It is shaped by educators, researchers, students, nature
          practitioners, and community members working together
          to strengthen ecological awareness.
        </Text>

        <View style={styles.contributorsBox}>

          <View style={styles.contributorsHeader}>
            <Ionicons
              name="people-circle-outline"
              size={21}
              color="#238B50"
            />

            <Text style={styles.contributorsTitle}>
              Contributors
            </Text>
          </View>

          <Text style={styles.contributorsText}>
            {contributors.join(', ')}
          </Text>

        </View>

      </View>

      <View style={styles.versionCard}>

        <View style={styles.versionIconCircle}>
          <Ionicons
            name="leaf-outline"
            size={24}
            color="#238B50"
          />
        </View>

        <Text style={styles.versionTitle}>
          Bio-net India
        </Text>

        <Text style={styles.versionText}>
          People's Biodiversity Register under Biological
          Diversity Act 2002
        </Text>

        <View style={styles.versionBadge}>
          <Text style={styles.versionNumber}>
            Version 1.0.0
          </Text>
        </View>

      </View>

      <View style={styles.bottomSpace} />

    </ScrollView>
  );
}

