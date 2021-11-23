import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '@/hooks';

import Home from '@/pages/home';
import Profile from '@/pages/profile';
import Schedules from '@/pages/schedules';
import Bands from '@/pages/bands';
import Opportunity from '@/pages/opportunity';
import Trends from '@/pages/trends';
import About from '@/pages/about';

const Drawer = createDrawerNavigator();

export const AppRouter: React.FC = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Perfil" component={Profile} />
    <Drawer.Screen name="Agendamentos" component={Schedules} />
    <Drawer.Screen name="Bandas" component={Bands} />
    <Drawer.Screen name="Oportunidades" component={Opportunity} />
    <Drawer.Screen name="Trends" component={Trends} />
    <Drawer.Screen name="Sobre o sistema" component={About} />
  </Drawer.Navigator>
);
