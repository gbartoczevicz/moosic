import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppRouter } from "@/routes/app";
import { useAuth, useCanSkipMain } from "@/hooks";
import * as Screens from "@/screens";

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
  const { user } = useAuth();
  const { canSkipMain } = useCanSkipMain();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!canSkipMain && <Stack.Screen name="Main" component={Screens.Main} />}
      {!user && <Stack.Screen name="SignIn" component={Screens.SignIn} />}
      {user && <Stack.Screen name="App" component={AppRouter} />}
      <Stack.Screen name="SignUp" component={Screens.SignUp} />
    </Stack.Navigator>
  );
};
