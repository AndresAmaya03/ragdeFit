import React from 'react';
import { render, screen } from '@testing-library/react-native';
import DashboardScreen from '../../src/features/Dashboard/screens/DashboardScreen';

describe('DashboardScreen', () => {
    it('should render the user name', () => {
        render(<DashboardScreen />);
        expect(screen.getByText('NOMBRE USUARIO')).toBeTruthy();
    });

    it('should render the progress card', () => {
        render(<DashboardScreen />);
        expect(screen.getByText('Progreso')).toBeTruthy();
    });

    it('should render the weight card', () => {
        render(<DashboardScreen />);
        expect(screen.getByText('Peso actual')).toBeTruthy();
    });

    it('should render the fat card', () => {
        render(<DashboardScreen />);
        expect(screen.getByText('Grasa corporal')).toBeTruthy();
    });

    it('should render the heart rate card', () => {
        render(<DashboardScreen />);
        expect(screen.getByText('Ritmo Cardíaco')).toBeTruthy();
    });
});