import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import { RootStackParamList } from './types'; // Import the type
import LoginScreen from '../features/Auth/screens/LoginScreen';
import RegisterScreen from '../features/Auth/screens/RegisterScreen';
import ChatScreen from '../features/chat/screens/ChatScreen';
import DashboardScreen from '../features/Dashboard/screens/DashboardScreen';
import PersonalizationScreen from '../features/personalization/screens/PersonalizationScreen';
import BiometricsScreen from '../features/Profile/screens/BiometricsScreen';
import MainMenuScreen from '../screens/MainMenuScreen';

const Stack = createStackNavigator<RootStackParamList>(); // Use the type

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="MainMenu">
            <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: '' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Inicio de Sesión' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro Usuario' }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'CHAT' }} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'PRINCIPAL' }} />
            <Stack.Screen name="Personalization" component={PersonalizationScreen} options={{ title: 'Personalización' }} />
            <Stack.Screen name="Biometrics" component={BiometricsScreen} options={{ title: 'DATOS BIOMETRICOS' }} />
            {/* Add other screens here */}
        </Stack.Navigator>
    );
};

export default AppNavigator;