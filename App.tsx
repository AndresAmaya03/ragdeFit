// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from './src/features/Auth/screens/RegisterScreen';
import LoginScreen from './src/features/Auth/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register" >
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Navigator" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
