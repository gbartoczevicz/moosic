import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppRouter } from '@/routes/app';
import { useAuth, useCanSkipMain } from '@/hooks';
import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import { Main } from '@/pages/main';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
  const { user } = useAuth();
  const { canSkipMain } = useCanSkipMain();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!canSkipMain && <Stack.Screen name="Main" component={Main} />}
      {!user && <Stack.Screen name="SignIn" component={SignIn} />}
      {user && <Stack.Screen name="App" component={AppRouter} />}
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};
