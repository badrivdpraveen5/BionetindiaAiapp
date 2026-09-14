import React, { useState } from 'react';
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

  const [languageOpen, setLanguageOpen] = useState(false);

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

  const selectedLanguage =
    languages.find((item) => item.code === language) || languages[0];

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setLanguageOpen(false);
  };

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
      admin: '#EF4444',
      ngo: '#3B82F6',
      volunteer: '#A855F7',
      community: '#238B50',
    };

    return colors[role] || '#238B50';
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.profileCard}>

        <View style={styles.avatarContainer}>
          <Ionicons
            name="person"
            size={30}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.userInfo}>

          <Text style={styles.userName}>
            {user?.name || t('common.guestUser')}
          </Text>

          {user?.phoneNumber && (
            <View style={styles.phoneRow}>
              <Ionicons
                name="call-outline"
                size={13}
                color="#68736B"
              />

              <Text style={styles.userPhone}>
                {user.phoneNumber}
              </Text>
            </View>
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

      </View>

      {/* =========================
          LANGUAGE
      ========================== */}
      <View style={styles.languageCard}>

        <TouchableOpacity
          style={styles.languageHeader}
          activeOpacity={0.7}
          onPress={() => setLanguageOpen(!languageOpen)}
        >
          <View style={styles.smallIconCircle}>
            <Ionicons
              name="language-outline"
              size={19}
              color="#238B50"
            />
          </View>

          <Text style={styles.languageTitle}>
            {t('common.language')}
          </Text>

          <Text style={styles.selectedLanguage}>
            {selectedLanguage.name}
          </Text>

          <Ionicons
            name={
              languageOpen
                ? 'chevron-up'
                : 'chevron-down'
            }
            size={18}
            color="#68736B"
            style={styles.languageArrow}
          />
        </TouchableOpacity>

        {/* LANGUAGE OPTIONS */}
        {languageOpen && (
          <>
            <View style={styles.languageDivider} />

            <View style={styles.languageList}>
              {languages.map((lang) => {
                const selected = language === lang.code;

                return (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageButton,
                      selected &&
                        styles.languageButtonActive,
                    ]}
                    onPress={() =>
                      handleLanguageChange(lang.code)
                    }
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.languageText,
                        selected &&
                          styles.languageTextActive,
                      ]}
                    >
                      {lang.name}
                    </Text>

                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color="#FFFFFF"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

      </View>

      <View style={styles.settingsCard}>

        <View style={styles.settingsHeader}>
          <View style={styles.smallIconCircle}>
            <Ionicons
              name="settings-outline"
              size={19}
              color="#238B50"
            />
          </View>

          <Text style={styles.settingsTitle}>
            {t('common.settings')}
          </Text>
        </View>

        <View style={styles.settingsDivider} />

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
        >
          <View style={styles.menuIcon}>
            <Ionicons
              name="notifications-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <Text style={styles.menuText}>
            {t('profile.notifications')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#A0AAA3"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Donation')}
          activeOpacity={0.7}
        >
          <View style={styles.menuIcon}>
            <Ionicons
              name="heart-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <Text style={styles.menuText}>
            {t('profile.donateSupport')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#A0AAA3"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Privacy')}
          activeOpacity={0.7}
        >
          <View style={styles.menuIcon}>
            <Ionicons
              name="lock-closed-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <Text style={styles.menuText}>
            {t('profile.privacy')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#A0AAA3"
          />
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('HelpSupport')}
          activeOpacity={0.7}
        >
          <View style={styles.menuIcon}>
            <Ionicons
              name="help-circle-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <Text style={styles.menuText}>
            {t('profile.helpSupport')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#A0AAA3"
          />
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={styles.lastMenuItem}
          onPress={() => navigation.navigate('About')}
          activeOpacity={0.7}
        >
          <View style={styles.menuIcon}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#238B50"
            />
          </View>

          <Text style={styles.menuText}>
            {t('profile.about')}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#A0AAA3"
          />
        </TouchableOpacity>

      </View>


      <View style={styles.aboutCard}>

        <View style={styles.aboutTopRow}>

          <View style={styles.aboutIconCircle}>
            <Ionicons
              name="leaf-outline"
              size={23}
              color="#238B50"
            />
          </View>

          <View style={styles.aboutInfo}>

            <Text style={styles.aboutTitle}>
              {t('common.appName')}
            </Text>

            <Text style={styles.aboutText}>
              {t('common.subtitle')}
            </Text>

          </View>

        </View>

        <View style={styles.aboutDivider} />

        <View style={styles.versionRow}>
          <Text style={styles.versionLabel}>
            {t('version')}
          </Text>

          <Text style={styles.versionValue}>
            1.0.0
          </Text>
        </View>

        <Text style={styles.aboutFooter}>
          {t('common.poweredBy')}
          {'\n'}
          {t('common.tcsSupport')}
        </Text>

      </View>


      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#DC2626"
        />

        <Text style={styles.logoutText}>
          {t('common.logout')}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />

    </ScrollView>
  );
}
