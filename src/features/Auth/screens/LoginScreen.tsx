import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
import {ScreenWrapper} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Navigator: undefined;
};

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: correo,
          contraseña,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token && data.usuario && data.usuario.id) {
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('userId', data.usuario.id.toString());
        } else {
          console.error('Faltan datos en la respuesta:', data);
          setSnackbarMessage('Error al recibir los datos del servidor');
          setVisibleSnackbar(true);
          return;
        }
        setSnackbarMessage('Inicio de sesión exitoso');
        setVisibleSnackbar(true);
        // Redirigimos al Dashboard o a cualquier otra pantalla
        navigation.navigate('Navigator');
      } else {
        setSnackbarMessage(data.error || 'Error al iniciar sesión');
        setVisibleSnackbar(true);
      }
    } catch (err) {
      console.error(err);
      setSnackbarMessage('Error en la conexión');
      setVisibleSnackbar(true);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/RagdeFit.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <TextInput
          label="Correo"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          label="Contraseña"
          secureTextEntry
          mode="outlined"
          autoCapitalize="none"
          style={styles.input}
          value={contraseña}
          onChangeText={setContraseña}
        />
        <Button mode="contained" style={styles.button} onPress={handleLogin}>
          Iniciar sesión
        </Button>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Register')}>
          ¿No tienes una cuenta?
        </Text>
      </View>

      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={Snackbar.DURATION_SHORT}>
        {snackbarMessage}
      </Snackbar>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    height: 100,
    marginBottom: 20,
  },
});

export default LoginScreen;
