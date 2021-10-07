import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/hooks/auth';
import { AppRouter } from '@/routes/app';

import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import { Main } from '@/pages/main';
// import { useCanSkipMain } from '@/hooks/skip-main';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
  const { user } = useAuth();
  // const { canSkipMain } = useCanSkipMain();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {!canSkipMain && <Stack.Screen name="Main" component={Main} />} */}
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {user && <Stack.Screen name="App" component={AppRouter} />}
    </Stack.Navigator>
  );
};
