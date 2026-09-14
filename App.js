import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { UserProvider } from './src/contexts/UserContext';
import { OfflineProvider } from './src/contexts/OfflineContext';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#10b981"
        translucent={false}
      />

      <LanguageProvider>
        <UserProvider>
          <OfflineProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </OfflineProvider>
        </UserProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}