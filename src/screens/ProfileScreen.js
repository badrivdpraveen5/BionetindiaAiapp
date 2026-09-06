import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/Profiles.styles';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useUser();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'मराठी' },
  ];

  const handleLogout = () => {
    Alert.alert(
      t('common.logout'),
      t('profile.logoutConfirmation'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.logout'),
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: '#ef4444',
      ngo: '#3b82f6',
      volunteer: '#a855f7',
      community: '#10b981',
    };

    return colors[role] || colors.community;
  };

  return (
    <ScrollView style={styles.container}>

      {/* User Info Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Ionicons
            name="person"
            size={48}
            color="#ffffff"
          />
        </View>

        <Text style={styles.userName}>
          {user?.name || t('common.guestUser')}
        </Text>

        {user?.phoneNumber && (
          <Text style={styles.userPhone}>
            {user.phoneNumber}
          </Text>
        )}

        <View
          style={[
            styles.roleBadge,
            {
              backgroundColor: getRoleBadgeColor(user?.role),
            },
          ]}
        >
          <Text style={styles.roleText}>
            {user?.role?.toUpperCase() || t('guest')}
          </Text>
        </View>
      </View>

      {/* Language Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('common.language')}
        </Text>

        <View style={styles.languageGrid}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                language === lang.code &&
                  styles.languageButtonActive,
              ]}
              onPress={() => setLanguage(lang.code)}
            >
              <Text
                style={[
                  styles.languageText,
                  language === lang.code &&
                    styles.languageTextActive,
                ]}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('common.settings')}
        </Text>

        {/* Notifications */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#6b7280"
          />

          <Text style={styles.menuText}>
            {t('profile.notifications')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9ca3af"
          />
        </TouchableOpacity>

        {/* Donation */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Donation')}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color="#6b7280"
          />

          <Text style={styles.menuText}>
            {t('profile.donateSupport')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9ca3af"
          />
        </TouchableOpacity>

        {/* Privacy */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Privacy')}
        >
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="#6b7280"
          />

          <Text style={styles.menuText}>
            {t('profile.privacy')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9ca3af"
          />
        </TouchableOpacity>

        {/* Help & Support */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <Ionicons
            name="help-circle-outline"
            size={24}
            color="#6b7280"
          />

          <Text style={styles.menuText}>
            {t('profile.helpSupport')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9ca3af"
          />
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('About')}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#6b7280"
          />

          <Text style={styles.menuText}>
            {t('profile.about')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9ca3af"
          />
        </TouchableOpacity>
      </View>

      {/* About App */}
      <View style={styles.section}>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>
            {t('common.appName')}
          </Text>

          <Text style={styles.aboutText}>
            {t('common.subtitle')}
          </Text>

          <Text style={styles.aboutVersion}>
            {t('version')} 1.0.0
          </Text>

          <View style={styles.divider} />

          <Text style={styles.aboutFooter}>
            {t('common.poweredBy')}
            {'\n'}
            {t('common.tcsSupport')}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#ef4444"
        />

        <Text style={styles.logoutText}>
          {t('common.logout')}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />

    </ScrollView>
  );
}