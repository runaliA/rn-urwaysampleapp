import React, { createContext, useContext } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

const NavigationContext = createContext<NavigationContainerRef | null>(null);

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider: React.FC<{ navigation: NavigationContainerRef; children: React.ReactNode }> = ({ navigation, children }) => {
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};