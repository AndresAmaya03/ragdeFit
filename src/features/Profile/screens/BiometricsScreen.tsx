import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Alert, ScrollView} from 'react-native';
import {Text, TextInput, Button, DataTable} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenWrapper} from '../../../components';

interface DatoBiometrico {
  fecha: string;
  peso: number;
  estatura: number;
  grasa_corporal: number;
}

const BiometricsScreen = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [grasaCorporal, setGrasaCorporal] = useState('');
  const [historial, setHistorial] = useState<DatoBiometrico[]>([]);

  const fetchHistorial = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const usuarioId = await AsyncStorage.getItem('userId');

      if (!token || !usuarioId) return;

      const response = await fetch(
        `http://localhost:3000/biometria/${usuarioId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const contentType = response.headers.get('Content-Type');

      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Respuesta no JSON del servidor:', textResponse);
        return;
      }

      const data = await response.json();
      setHistorial(data);
    } catch (err) {
      console.error('Error al obtener historial biométrico:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const usuarioId = await AsyncStorage.getItem('userId');

      if (!token || !usuarioId) {
        Alert.alert('Error', 'Usuario no autenticado');
        return;
      }

      const response = await fetch('http://localhost:3000/biometria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: parseInt(usuarioId),
          peso: parseFloat(peso),
          estatura: parseFloat(altura),
          grasa_corporal: parseFloat(grasaCorporal),
        }),
      });

      const contentType = response.headers.get('Content-Type');

      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Respuesta no JSON del servidor:', textResponse);
        Alert.alert('Error', 'La respuesta del servidor no es válida.');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Datos biométricos guardados correctamente');
        fetchHistorial(); // recargar tabla
      } else {
        Alert.alert('Error', data.error || 'Error al guardar datos');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'Error de conexión con el servidor');
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/images/RagdeFit.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="headlineMedium" style={styles.title}>
          Datos biométricos
        </Text>

        <TextInput
          label="Peso"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          value={peso}
          onChangeText={setPeso}
        />
        <TextInput
          label="Altura"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          value={altura}
          onChangeText={setAltura}
        />
        <TextInput
          label="Grasa corporal"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          value={grasaCorporal}
          onChangeText={setGrasaCorporal}
        />

        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          Completado
        </Button>

        <Text style={styles.subtitle}>Historial biométrico</Text>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Fecha</DataTable.Title>
            <DataTable.Title numeric>Peso</DataTable.Title>
            <DataTable.Title numeric>Altura</DataTable.Title>
            <DataTable.Title numeric>Grasa</DataTable.Title>
          </DataTable.Header>

          {historial.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                {new Date(item.fecha).toLocaleDateString()}
              </DataTable.Cell>
              <DataTable.Cell numeric>{item.peso}</DataTable.Cell>
              <DataTable.Cell numeric>{item.estatura}</DataTable.Cell>
              <DataTable.Cell numeric>{item.grasa_corporal}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
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
