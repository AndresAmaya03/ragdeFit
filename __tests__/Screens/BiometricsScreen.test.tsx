import React from 'react';
import { render, screen } from '@testing-library/react-native';
import BiometricsScreen from '../../src/features/Profile/screens/BiometricsScreen';

describe('BiometricsScreen', () => {
    it('should render the title', () => {
        render(<BiometricsScreen />);
        expect(screen.getByText('Datos biométricos')).toBeTruthy();
    });

    it('should render the input fields', () => {
        expect(screen.getByLabelText('Peso')).toBeTruthy();
        expect(screen.getByLabelText('Altura')).toBeTruthy();
        expect(screen.getByLabelText('Grasa corporal')).toBeTruthy();
    });

    it('should render the "Completado" button', () => {
        render(<BiometricsScreen />);
        expect(screen.getByText('Completado')).toBeTruthy();
    });
});