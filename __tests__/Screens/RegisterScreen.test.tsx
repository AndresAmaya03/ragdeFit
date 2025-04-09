import React from 'react';
import { render, screen } from '@testing-library/react-native';
import RegisterScreen from '../../src/features/Auth/screens/RegisterScreen';

describe('RegisterScreen', () => {
    it('should render the title and subtitle', () => {
        render(<RegisterScreen />);
        expect(screen.getByText('RAGDE FIT')).toBeTruthy();
        expect(screen.getByText('IA TRAINER')).toBeTruthy();
    });

    it('should render the "Datos personales" section title', () => {
        render(<RegisterScreen />);
        expect(screen.getByText('Datos personales')).toBeTruthy();
    });

    it('should render the input fields', () => {
        expect(screen.getByLabelText('Nombre')).toBeTruthy();
        expect(screen.getByLabelText('Fecha de nacimiento')).toBeTruthy();
        expect(screen.getByLabelText('Género')).toBeTruthy();
        expect(screen.getByLabelText('Correo')).toBeTruthy();
        expect(screen.getByLabelText('Celular')).toBeTruthy();
        expect(screen.getByLabelText('Contraseña')).toBeTruthy();
        expect(screen.getByLabelText('Confirmar Contraseña')).toBeTruthy();
    });

    it('should render the "Completado" button', () => {
        render(<RegisterScreen />);
        expect(screen.getByText('Completado')).toBeTruthy();
    });
});