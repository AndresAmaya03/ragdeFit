import React from 'react';
import { render, screen } from '@testing-library/react-native';
import LoginScreen from '../../src/features/Auth/screens/LoginScreen';

describe('LoginScreen', () => {
  it('should render the title and subtitle', () => {
    render(<LoginScreen />);
    expect(screen.getByText('RAGDE FIT')).toBeTruthy();
    expect(screen.getByText('IA TRAINER')).toBeTruthy();
  });

  it('should render the "Usuario" and "Contraseña" input fields', () => {
    render(<LoginScreen />);
    expect(screen.getByLabelText('Usuario')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
  });

  it('should render the "Iniciar sesión" button', () => {
    render(<LoginScreen />);
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
  });

  it('should render the "No tienes una cuenta?" text', () => {
    render(<LoginScreen />);
    expect(screen.getByText('¿No tienes una cuenta?')).toBeTruthy();
  });
});