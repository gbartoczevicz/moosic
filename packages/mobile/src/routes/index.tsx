import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/hooks/auth';
import { AppRouter } from '@/routes/app';

import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import { Main } from '@/pages/main';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      {user && <Stack.Screen name="App" component={AppRouter} />}
    </Stack.Navigator>
  );
};
