/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentForm from './src/PaymentForm'; // Replace with the correct path
import Receipt from './src/Receipt'; // Replace with the correct path

// Define type for the navigation stack
export type RootStackParamList = {
  PaymentForm: undefined;
  Receipt: { data: any }; // You can replace `any` with a specific type if known
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PaymentForm"   screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="PaymentForm" 
          component={PaymentForm} 
          options={{ title: 'Payment Form' }} 
        />
        <Stack.Screen 
          name="Receipt" 
          component={Receipt} 
          options={{ title: 'Receipt' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
