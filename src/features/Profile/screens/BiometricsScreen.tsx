import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { ScreenWrapper } from '../../../components';

const BiometricsScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/RagdeFit.png')}
          style={styles.logo}
          resizeMode="cover" // Use "contain" instead of "cover" for better control
        />
        <Text variant="headlineMedium" style={styles.title}>
          Datos biométricos
        </Text>

        <TextInput
          label="Peso"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Altura"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Grasa corporal"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <Button mode="contained" style={styles.button}>
          Completado
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#e63225',
  },
  logo: {
    width: '100%',
    height: 100,
    marginTop: 0,
    marginBottom: 0,
  },
});

export default BiometricsScreen;