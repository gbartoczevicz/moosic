import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import { AppRouter } from '@/routes/app';

const App: React.FC = () => (
  <>
    <AppRouter />
    <StatusBar style="auto" />
  </>
);

export default App;
