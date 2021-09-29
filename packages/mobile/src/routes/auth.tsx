import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@/pages/sign-in';
import { AppRouter } from '@/routes/app';

const Stack = createNativeStackNavigator();

export const AuthRouter: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="App" component={AppRouter} />
  </Stack.Navigator>
);
