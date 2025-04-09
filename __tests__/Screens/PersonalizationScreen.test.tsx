import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PersonalizationScreen from '../../src/features/personalization/screens/PersonalizationScreen';

describe('PersonalizationScreen', () => {
    it('should render the title', () => {
        render(<PersonalizationScreen />);
        expect(screen.getByText('Personalización')).toBeTruthy();
    });

    it('should render the labels', () => {
        expect(screen.getByText('Tipo de entrenamiento')).toBeTruthy();
        expect(screen.getByText('Tiempo por sesión')).toBeTruthy();
        expect(screen.getByText('Cardio')).toBeTruthy();
    });

    it('should render the radio buttons', () => {
        expect(screen.getByText('Fuerza')).toBeTruthy();
        expect(screen.getByText('Resistencia')).toBeTruthy();
        expect(screen.getByText('30 minutos')).toBeTruthy();
        expect(screen.getByText('60 minutos')).toBeTruthy();
        expect(screen.getByText('Sí')).toBeTruthy();
        expect(screen.getByText('No')).toBeTruthy();
    });

    it('should render the "Completado" button', () => {
        render(<PersonalizationScreen />);
        expect(screen.getByText('Completado')).toBeTruthy();
    });
});