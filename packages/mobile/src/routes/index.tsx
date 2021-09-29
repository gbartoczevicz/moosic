import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppRouter } from '@/routes/app';
import { SignIn } from '@/pages/sign-in';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="App" component={AppRouter} />
  </Stack.Navigator>
);
