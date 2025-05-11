import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
import {ScreenWrapper} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  // otras rutas...
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRegister = async () => {
    // Validación simple para contraseñas
    if (contraseña !== confirmPassword) {
      setSnackbarMessage('Las contraseñas no coinciden');
      setVisibleSnackbar(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nombre,
          fecha_nacimiento: fechaNacimiento,
          genero,
          email: correo,
          celular,
          contraseña,
        }),
      });

      const data = await response.json();

      setSnackbarMessage(data.message);
      setVisibleSnackbar(true);

      if (response.ok) {
        setSnackbarMessage('Registro exitoso');
        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);
      } else {
        setSnackbarMessage(data.error || 'Error al registrarse');
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
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/images/RagdeFit.png')}
          style={styles.logo}
          resizeMode="cover" // Usa "contain" si prefieres mantener la proporción de la imagen
        />
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Datos personales
        </Text>
        <TextInput
          label="Nombre"
          autoCapitalize="none"
          mode="outlined"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          label="Fecha de nacimiento (YYYY-MM-DD)"
          mode="outlined"
          autoCapitalize="none"
          style={styles.input}
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
        <TextInput
          label="Género"
          mode="outlined"
          autoCapitalize="none"
          style={styles.input}
          value={genero}
          onChangeText={setGenero}
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
          label="Celular"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="phone-pad"
          style={styles.input}
          value={celular}
          onChangeText={setCelular}
        />
        <TextInput
          label="Contraseña"
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          style={styles.input}
          value={contraseña}
          onChangeText={setContraseña}
        />
        <TextInput
          label="Confirmar Contraseña"
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={{marginTop: 16}}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Button>

        <Button mode="contained" style={styles.button} onPress={handleRegister}>
          Completado
        </Button>
      </ScrollView>

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
    flexGrow: 1,
    padding: 20,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#e63225',
  },
  uploadText: {
    marginTop: 16,
    marginBottom: 12,
    color: 'gray',
  },
  logo: {
    width: '100%',
    height: 100,
    marginTop: 0,
    marginBottom: 0,
  },
});

export default RegisterScreen;
