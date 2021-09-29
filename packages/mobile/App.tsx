import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AppRouter } from '@/routes/app';

const App: React.FC = () => (
  <NavigationContainer>
    <AppRouter />
    <StatusBar style="auto" />
  </NavigationContainer>
);

export default App;
