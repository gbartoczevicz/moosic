import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from '@/hooks/auth';
import { Routes } from '@/routes';
import { CanSkipMainProvider } from '@/hooks/skip-main';

const App: React.FC = () => (
  <NavigationContainer>
    <AuthProvider>
      <CanSkipMainProvider>
        <Routes />
      </CanSkipMainProvider>
    </AuthProvider>
    <StatusBar style="auto" />
  </NavigationContainer>
);

export default App;
