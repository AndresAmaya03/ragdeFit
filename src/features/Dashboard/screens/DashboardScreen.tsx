import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenWrapper } from '../../../components';
import * as Progress from 'react-native-progress';

const DashboardScreen = () => {
  const [userName, setUserName] = useState('');
  const [pesoActual, setPesoActual] = useState(null);
  const [grasaCorporal, setGrasaCorporal] = useState(null);
  const [progreso, setProgreso] = useState(0);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) return;

      // Obtener nombre del usuario
      const userRes = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userContentType = userRes.headers.get('Content-Type');
      if (!userContentType?.includes('application/json')) {
        const errorText = await userRes.text();
        console.error('Respuesta inesperada al obtener usuario:', errorText);
        Alert.alert(
          'Error',
          'Respuesta inválida del servidor al obtener el usuario',
        );
        return;
      }
      const userData = await userRes.json();
      console.log('Datos del usuario:', userData); // Agregar log para ver la respuesta

      // Verificar si el nombre está presente en la respuesta
      if (userData && userData.nombre) {
        setUserName(userData.nombre); // Asignar nombre si está disponible
      } else {
        console.log('Nombre de usuario no disponible');
        setUserName('Usuario'); // Default en caso de que no esté disponible
      }

      // Obtener datos biométricos
      const biometriaRes = await fetch(
        `http://localhost:3000/biometria/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const biometriaContentType = biometriaRes.headers.get('Content-Type');
      if (!biometriaContentType?.includes('application/json')) {
        const errorText = await biometriaRes.text();
        console.error('Respuesta inesperada al obtener biometría:', errorText);
        Alert.alert(
          'Error',
          'Respuesta inválida del servidor al obtener biometría',
        );
        return;
      }

      const biometriaData = await biometriaRes.json();

      if (Array.isArray(biometriaData) && biometriaData.length > 0) {
        const latest = biometriaData[biometriaData.length - 1];
        setPesoActual(latest.peso);
        setGrasaCorporal(latest.grasa_corporal);

        // Calcular progreso (puedes ajustar la lógica según los requisitos)
        const progress = latest.peso / 100; // Ejemplo simple, ajusta según sea necesario
        setProgreso(progress);
      }
    } catch (err) {
      console.error('Error al obtener datos del usuario o biometría:', err);
      Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ScreenWrapper style={styles.screenWrapper}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Cambia por la URL del avatar del usuario si la tienes
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.userName}>
            {userName}
          </Text>
        </View>

        <Card style={styles.progressCard}>
          <Card.Content style={styles.progressContent}>
            <Progress.Circle
              size={120}
              progress={progreso}
              thickness={10}
              color="#e63225"
              unfilledColor="#d3d3d3"
              borderWidth={0}
              showsText
              formatText={() => `${(progreso * 100).toFixed(0)}%`} // Muestra el progreso como porcentaje
              textStyle={styles.progressText}
            />
            <Text variant="titleLarge" style={styles.progressLabel}>
              Progreso
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.metricsContainer}>
          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              <Text variant="headlineMedium" style={styles.metricValue}>
                ---
              </Text>
              <Text variant="titleLarge" style={styles.metricLabel}>
                Ritmo Cardíaco
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.metricRow}>
            <Card style={[styles.metricCard, styles.smallCard]}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.metricValue}>
                  {pesoActual !== null ? `${pesoActual}kg` : 'Cargando...'}
                </Text>
                <Text variant="titleLarge" style={styles.metricLabel}>
                  Peso actual
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.metricCard, styles.smallCard]}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.metricValue}>
                  {grasaCorporal !== null ? `${grasaCorporal}%` : 'Cargando...'}
                </Text>
                <Text variant="titleLarge" style={styles.metricLabel}>
                  Grasa corporal
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#e63225',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e63225',
  },
  progressCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#f5f5f5',
  },
  progressContent: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressLabel: {
    marginTop: 10,
  },
  metricsContainer: {
    flex: 1,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    marginBottom: 16,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#f5f5f5',
  },
  smallCard: {
    flex: 1,
    marginHorizontal: 8,
  },
  metricContent: {
    alignItems: 'center',
  },
  metricValue: {
    marginTop: 8,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    marginTop: 4,
    textAlign: 'center',
  },
});

export default DashboardScreen;

