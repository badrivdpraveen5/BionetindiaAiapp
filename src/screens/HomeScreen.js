import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import styles from '../styles/Home.styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { getStats } from '../services/api';

export default function HomeScreen() {
  const navigation = useNavigation();

  const { t } = useLanguage();
  const { user } = useUser();

  const [stats, setStats] = useState({
    totalEntries: 0,
    myEntries: 0,
    approved: 0,
    pending: 0,
  });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      console.log('USER =>', user);

      const data = await getStats(user?.id);

      console.log('STATS DATA =>', data);

      setStats({
        totalEntries: data.totalEntries || 0,
        myEntries: data.myEntries || 0,
        approved: data.approved || 0,
        pending: data.pending || 0,
      });
    } catch (error) {
      console.log(
        'LOAD STATS ERROR =>',
        error.response?.data || error.message
      );
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await loadStats();

    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {t('common.appName')}
        </Text>

        <Text style={styles.subtitle}>
          {t('common.subtitle')}
        </Text>

        <Text style={styles.welcomeText}>
          {t('home.welcome')},{' '}
          {user?.name || t('common.guestUser')}!
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            styles.statCardBlue,
          ]}
        >
          <Text style={styles.statNumber}>
            {stats.totalEntries}
          </Text>

          <Text style={styles.statLabel}>
            {t('home.totalEntries')}
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            styles.statCardGreen,
          ]}
        >
          <Text style={styles.statNumber}>
            {stats.myEntries}
          </Text>

          <Text style={styles.statLabel}>
            {t('home.myEntries')}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            styles.statCardEmerald,
          ]}
        >
          <Text style={styles.statNumber}>
            {stats.approved}
          </Text>

          <Text style={styles.statLabel}>
            {t('home.approved')}
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            styles.statCardAmber,
          ]}
        >
          <Text style={styles.statNumber}>
            {stats.pending}
          </Text>

          <Text style={styles.statLabel}>
            {t('home.pending')}
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('home.quickActions')}
        </Text>

        <View style={styles.actionsGrid}>
          {/* Add Entry */}
          <TouchableOpacity
            style={[
              styles.actionCard,
              styles.actionCardGreen,
            ]}
            onPress={() =>
              navigation.navigate('AddEntry')
            }
          >
            <Ionicons
              name="camera"
              size={32}
              color="#10b981"
            />

            <Text style={styles.actionText}>
              {t('home.addEntry')}
            </Text>
          </TouchableOpacity>

          {/* View Map */}
          <TouchableOpacity
            style={[
              styles.actionCard,
              styles.actionCardBlue,
            ]}
            onPress={() =>
              navigation.navigate('Map')
            }
          >
            <Ionicons
              name="map"
              size={32}
              color="#3b82f6"
            />

            <Text style={styles.actionText}>
              {t('home.viewMap')}
            </Text>
          </TouchableOpacity>

          {/* Traditional Knowledge */}
          <TouchableOpacity
            style={[
              styles.actionCard,
              styles.actionCardPurple,
            ]}
            onPress={() =>
              navigation.navigate(
                'TraditionalKnowledge'
              )
            }
          >
            <Ionicons
              name="book"
              size={32}
              color="#a855f7"
            />

            <Text style={styles.actionText}>
              {t('home.traditionalKnowledge')}
            </Text>
          </TouchableOpacity>

          {/* Agro Biodiversity */}
          <TouchableOpacity
            style={[
              styles.actionCard,
              styles.actionCardOrange,
            ]}
            onPress={() =>
              navigation.navigate(
                'AgroBiodiversity'
              )
            }
          >
            <Ionicons
              name="leaf"
              size={32}
              color="#f97316"
            />

            <Text style={styles.actionText}>
              {t('home.agroBiodiversity')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('profile.about')}
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            {t('home.aboutDescription')}
          </Text>

          <Text style={styles.infoText}>
            {t('home.aboutPoweredBy')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}