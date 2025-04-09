import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { ScreenWrapper } from '../../../components';
import * as Progress from 'react-native-progress'; // For circular progress

const DashboardScreen = () => {
  return (
    <ScreenWrapper style={styles.screenWrapper}>
      <View style={styles.container}>
        {/* User Profile Section */}
        <View style={styles.userContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Replace with your avatar image
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.userName}>
            NOMBRE USUARIO
          </Text>
        </View>

        {/* Progress Section */}
        <Card style={styles.progressCard}>
          <Card.Content style={styles.progressContent}>
            <Progress.Circle
              size={120}
              progress={0.8}
              thickness={10}
              color="#e63225"
              unfilledColor="#d3d3d3"
              borderWidth={0}
              showsText
              formatText={() => '80%'}
              textStyle={styles.progressText}
            />
            <Text variant="titleLarge" style={styles.progressLabel}>
              Progreso
            </Text>
          </Card.Content>
        </Card>

        {/* Metrics Section */}
        <View style={styles.metricsContainer}>
          {/* Heart Rate Card */}
          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              {/* <Icon name="heart" size={30} color="#e63225" /> */}
              <Text variant="headlineMedium" style={styles.metricValue}>
                67 bpm
              </Text>
              <Text variant="titleLarge" style={styles.metricLabel}>
                Ritmo Cardíaco
              </Text>
            </Card.Content>
          </Card>

          {/* Weight and Body Fat Cards */}
          <View style={styles.metricRow}>
            <Card style={[styles.metricCard, styles.smallCard]}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.metricValue}>
                  50kg
                </Text>
                <Text variant="titleLarge" style={styles.metricLabel}>
                  Peso actual
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.metricCard, styles.smallCard]}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.metricValue}>
                  20%
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
    backgroundColor: '#ffffff', // White background as requested
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
    backgroundColor: '#e63225', // Background for avatar placeholder
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e63225', // Match the red color from the screenshot
  },
  progressCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#f5f5f5', // Light gray background for the card
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
    backgroundColor: '#f5f5f5', // Light gray background for cards
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