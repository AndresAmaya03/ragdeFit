import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { ScreenWrapper } from '../../../components';

const RegisterScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/images/RagdeFit.png')}
          style={styles.logo}
          resizeMode="cover" // Use "contain" instead of "cover" for better control
        />
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Datos personales
        </Text>
        <TextInput
          label="Nombre"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Fecha de nacimiento"
          mode="outlined"
          style={styles.input}
        // You might want to use a DatePicker component here
        />
        <TextInput
          label="Género"
          mode="outlined"
          style={styles.input}
        // You might want to use a Dropdown/Select component here
        />
        <TextInput
          label="Correo"
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Celular"
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />
        {/* Assuming "Calor" is a typo for "Contraseña" */}
        <TextInput
          label="Contraseña"
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        {/* Assuming "Contracte" is a typo for "Confirmar Contraseña" */}
        <TextInput
          label="Confirmar Contraseña"
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        {/* Placeholder for Photography upload */}
        <Text style={styles.uploadText}>Fotografía (Opcional)</Text>
        <Button mode="contained" style={styles.button}>
          Completado
        </Button>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
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