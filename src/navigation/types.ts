import type { RouteProp } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    MainMenu: undefined;
    Login: undefined;
    Register: undefined;
    Chat: undefined;
    Dashboard: undefined;
    Personalization: undefined;
    Biometrics: undefined;
    // Define parameters if you're passing any
    // Example:
    // Profile: { userId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
    RootStackParamList,
    T
>;

export type MainMenuScreenRouteProp = RouteProp<RootStackParamList, 'MainMenu'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
export type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;
export type PersonalizationScreenRouteProp = RouteProp<RootStackParamList, 'Personalization'>;
export type BiometricsScreenRouteProp = RouteProp<RootStackParamList, 'Biometrics'>;
// ... and so on for other screens