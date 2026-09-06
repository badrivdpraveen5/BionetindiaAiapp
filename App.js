import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { UserProvider } from './src/contexts/UserContext';
import { OfflineProvider } from './src/contexts/OfflineContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {

  return (
    <LanguageProvider>
      <UserProvider>
        <OfflineProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </OfflineProvider>
      </UserProvider>
    </LanguageProvider>

  );
}