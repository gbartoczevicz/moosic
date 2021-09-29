import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '@/pages/home';
import Profile from '@/pages/profile';

const Drawer = createDrawerNavigator();

export const AppRouter: React.FC = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);
