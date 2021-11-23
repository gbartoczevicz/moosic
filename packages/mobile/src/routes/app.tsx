import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import * as Screens from "@/screens";

const Drawer = createDrawerNavigator();

export const AppRouter: React.FC = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Screens.Home} />
    <Drawer.Screen name="Perfil" component={Screens.Profile} />
    <Drawer.Screen name="Agendamentos" component={Screens.Schedules} />
    <Drawer.Screen name="Bandas" component={Screens.Bands} />
    <Drawer.Screen name="Oportunidades" component={Screens.Opportunity} />
    <Drawer.Screen name="Trends" component={Screens.Trends} />
    <Drawer.Screen name="Sobre o sistema" component={Screens.About} />
  </Drawer.Navigator>
);
