import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../contexts/MockContext';

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [loading, setLoading] = useState(true);

  // Load saved language when app starts
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');

        if (savedLanguage && translations[savedLanguage]) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLanguage();
  }, []);

  // Change language and save it
  const setLanguage = async (lang) => {
    try {
      if (!translations[lang]) {
        console.warn(`Language "${lang}" is not available`);
        return;
      }

      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Get translation using dot notation
  const t = (key) => {
    const keys = key.split('.');

    const getValue = (obj) => {
      return keys.reduce((value, currentKey) => {
        return value?.[currentKey];
      }, obj);
    };

    // First try selected language
    const translatedValue = getValue(translations[language]);

    if (translatedValue) {
      return translatedValue;
    }

    // Fallback to English
    const englishValue = getValue(translations.en);

    if (englishValue) {
      return englishValue;
    }

    // If translation doesn't exist
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        loading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used within LanguageProvider'
    );
  }

  return context;
}