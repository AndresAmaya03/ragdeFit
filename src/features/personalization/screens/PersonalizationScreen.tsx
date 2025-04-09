import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, RadioButton } from 'react-native-paper';
import { ScreenWrapper } from '../../../components';

const PersonalizationScreen = () => {
  const [trainingType, setTrainingType] = React.useState('');
  const [sessionTime, setSessionTime] = React.useState('');
  const [cardioPreference, setCardioPreference] = React.useState('');

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Personalización
        </Text>

        <Text variant="titleMedium" style={styles.label}>
          Tipo de entrenamiento
        </Text>
        <RadioButton.Group onValueChange={newValue => setTrainingType(newValue)} value={trainingType}>
          <View style={styles.radioItem}>
            <RadioButton value="strength" />
            <Text>Fuerza</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="endurance" />
            <Text>Resistencia</Text>
          </View>
          {/* Add more training types as needed */}
        </RadioButton.Group>

        <Text variant="titleMedium" style={styles.label}>
          Tiempo por sesión
        </Text>
        <RadioButton.Group onValueChange={newValue => setSessionTime(newValue)} value={sessionTime}>
          <View style={styles.radioItem}>
            <RadioButton value="30" />
            <Text>30 minutos</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="60" />
            <Text>60 minutos</Text>
          </View>
          {/* Add more time options */}
        </RadioButton.Group>

        <Text variant="titleMedium" style={styles.label}>
          Cardio
        </Text>
        <RadioButton.Group onValueChange={newValue => setCardioPreference(newValue)} value={cardioPreference}>
          <View style={styles.radioItem}>
            <RadioButton value="yes" />
            <Text>Sí</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="no" />
            <Text>No</Text>
          </View>
        </RadioButton.Group>

        <Button mode="contained" style={styles.button}>
          Completado
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#e63225',
  },
});

export default PersonalizationScreen;