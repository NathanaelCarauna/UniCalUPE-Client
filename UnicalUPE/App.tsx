import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ExpoNotification from './src/screens/ExpoNotification';
import { AppProvider } from './src/contexts/appContext';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppProvider>
          {/* <StatusBar /> */}
          <Navigation colorScheme={colorScheme} />
        </AppProvider>
      </SafeAreaProvider>
    );
  }
}
