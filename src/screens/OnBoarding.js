import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/OnBoarding.styles';
import { getOnboarding } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

const { width } = Dimensions.get('window');

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
];

const ONBOARDING_CACHE_KEY = 'onboarding_cache_';

export default function OnBoarding({ onFinish }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languageModalVisible, setLanguageModalVisible] =
    useState(false);

  const flatListRef = useRef(null);

  const { language, setLanguage, t } = useLanguage();

  // ==========================================
  // LOAD ONBOARDING WHEN LANGUAGE CHANGES
  // ==========================================

  useEffect(() => {
    loadOnboarding();
  }, [language]);

  // ==========================================
  // LOAD ONBOARDING
  // CACHE FIRST -> API IF CACHE NOT FOUND
  // ==========================================

  const loadOnboarding = async () => {
    try {
      setLoading(true);

      // Dynamic cache key based on language
      const cacheKey =
        `${ONBOARDING_CACHE_KEY}${language}`;

      // ========================================
      // CHECK CACHE
      // ========================================

      const cachedData =
        await AsyncStorage.getItem(cacheKey);

      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);

          if (Array.isArray(parsedData)) {
            console.log(
              `ONBOARDING CACHE USED => ${language}`
            );

            setSlides(parsedData);
            setCurrentSlide(0);

            setTimeout(() => {
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: false,
              });
            }, 0);

            return;
          }
        } catch (cacheError) {
          console.error(
            'INVALID ONBOARDING CACHE =>',
            cacheError
          );

          await AsyncStorage.removeItem(cacheKey);
        }
      }

      // ========================================
      // CACHE NOT FOUND -> API
      // ========================================

      console.log(
        `ONBOARDING API CALL => ${language}`
      );

      const data = await getOnboarding(language);

      // ========================================
      // SORT SLIDES
      // ========================================

      const sortedSlides = Array.isArray(data)
        ? [...data].sort(
            (a, b) =>
              (a.order || 0) - (b.order || 0)
          )
        : [];

      // ========================================
      // SAVE API RESPONSE TO CACHE
      // ========================================

      if (sortedSlides.length > 0) {
        await AsyncStorage.setItem(
          cacheKey,
          JSON.stringify(sortedSlides)
        );

        console.log(
          `ONBOARDING CACHE SAVED => ${language}`
        );
      }

      // ========================================
      // SET SLIDES
      // ========================================

      setSlides(sortedSlides);
      setCurrentSlide(0);

      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: false,
        });
      }, 0);
    } catch (error) {
      console.error(
        'ONBOARDING LOAD ERROR =>',
        error
      );

      setSlides([]);
      setCurrentSlide(0);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LANGUAGE CHANGE
  // ==========================================

  const handleLanguageChange = async lang => {
    try {
      setLanguageModalVisible(false);

      await setLanguage(lang);
    } catch (error) {
      console.error(
        'LANGUAGE CHANGE ERROR =>',
        error
      );
    }
  };

  // ==========================================
  // FINISH / SKIP ONBOARDING
  // ==========================================

  const finishOnboarding = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem(
        'introCompleted',
        'true'
      );

      // ========================================
      // REMOVE ALL ONBOARDING CACHES DYNAMICALLY
      // ========================================

      const keys =
        await AsyncStorage.getAllKeys();

      const onboardingCacheKeys =
        keys.filter(key =>
          key.startsWith(ONBOARDING_CACHE_KEY)
        );

      if (onboardingCacheKeys.length > 0) {
        await AsyncStorage.multiRemove(
          onboardingCacheKeys
        );

        console.log(
          'ONBOARDING CACHES REMOVED =>',
          onboardingCacheKeys
        );
      }

      // ========================================
      // GO TO NEXT SCREEN
      // ========================================

      onFinish();
    } catch (error) {
      console.error(
        'ERROR FINISHING ONBOARDING =>',
        error
      );
    }
  };

  // ==========================================
  // SLIDE CHANGE
  // ==========================================

  const handleScrollEnd = event => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / width);

    setCurrentSlide(index);
  };

  // ==========================================
  // RENDER SLIDE
  // ==========================================

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>

        {/* IMAGE */}

        <View style={styles.imageContainer}>
          <Image
            source={
              typeof item.image === 'string'
                ? { uri: item.image }
                : item.image
            }
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* TITLE */}

        <Text style={styles.title}>
          {item.title}
        </Text>

        {/* DESCRIPTION */}

        <Text style={styles.description}>
          {item.description}
        </Text>

      </View>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#10b981"
        />
      </View>
    );
  }

  // ==========================================
  // NO ONBOARDING DATA
  // ==========================================

  if (slides.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          {t('onboarding.noOnboardingData')}
        </Text>
      </View>
    );
  }

  // ==========================================
  // SELECTED LANGUAGE
  // ==========================================

  const selectedLanguage = LANGUAGES.find(
    item => item.code === language
  );

  // ==========================================
  // MAIN SCREEN
  // ==========================================

  return (
    <View style={styles.container}>

      {/* LANGUAGE BUTTON */}

      <TouchableOpacity
        style={styles.languageButton}
        onPress={() =>
          setLanguageModalVisible(true)
        }
      >
        <Text style={styles.languageIcon}>
          🌐
        </Text>

        <Text style={styles.languageText}>
          {selectedLanguage?.name || 'English'}
        </Text>
      </TouchableOpacity>

      {/* SKIP BUTTON */}

      {currentSlide < slides.length - 1 && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={finishOnboarding}
        >
          <Text style={styles.skipText}>
            {t('common.skip')}
          </Text>
        </TouchableOpacity>
      )}

      {/* SLIDES */}

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item, index) =>
          item.id?.toString() ||
          index.toString()
        }
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        alwaysBounceHorizontal={false}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* DOTS */}

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentSlide === index &&
                styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* BOTTOM TEXT / FINISH BUTTON */}

      {currentSlide === slides.length - 1 ? (
        <TouchableOpacity
          style={styles.finishButton}
          onPress={finishOnboarding}
        >
          <Text style={styles.finishText}>
            {t('common.finish')}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.swipeText}>
          {t('onboarding.swipeLeftOrRight')}
        </Text>
      )}

      {/* LANGUAGE MODAL */}

      <Modal
        visible={languageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setLanguageModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            {/* MODAL TITLE */}

            <Text style={styles.modalTitle}>
              {t('onboarding.selectLanguage')}
            </Text>

            {/* LANGUAGE LIST */}

            <FlatList
              data={LANGUAGES}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === item.code &&
                      styles.selectedLanguage,
                  ]}
                  onPress={() =>
                    handleLanguageChange(item.code)
                  }
                >
                  <Text
                    style={[
                      styles.languageOptionText,
                      language === item.code &&
                        styles.selectedLanguageText,
                    ]}
                  >
                    {item.name}
                  </Text>

                  {language === item.code && (
                    <Text style={styles.checkMark}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />

            {/* CLOSE BUTTON */}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setLanguageModalVisible(false)
              }
            >
              <Text style={styles.closeButtonText}>
                {t('common.close')}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}