import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { ScreenWrapper } from '../../../components';

const LoginScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/RagdeFit.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <TextInput
          label="Usuario"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Contraseña"
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" style={styles.button}>
          Iniciar sesión
        </Button>
        <Text style={styles.signupText}>
          ¿No tienes una cuenta?
        </Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#e63225',
  },
  signupText: {
    marginTop: 16,
    textAlign: 'center',
  },
  logo: {
    width: '100%',
  }
});

export default LoginScreen;