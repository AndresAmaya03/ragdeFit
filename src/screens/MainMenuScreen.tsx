import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../components';
import { RootStackScreenProps } from '../navigation/types'; // Import the type

const MainMenuScreen: React.FC<RootStackScreenProps<'MainMenu'>> = () => { // Use the type
    const navigation = useNavigation<RootStackScreenProps<'MainMenu'>['navigation']>();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/RagdeFit.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Login')}>
                    Iniciar Sesión
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Register')}>
                    Registro Usuario
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                    Principal
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Biometrics')}>
                    Datos Biométricos
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Personalization')}>
                    Personalización
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Chat')}>
                    CHAT
                </Button>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        marginBottom: 16,
        backgroundColor: '#8c1c0b',
    },
    logo: {
        width: '100%',
    },
});

export default MainMenuScreen;