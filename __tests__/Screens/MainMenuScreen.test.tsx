import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import MainMenuScreen from '../../src/screens/MainMenuScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('MainMenuScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render the main menu buttons', () => {
    render(<MainMenuScreen
      navigation={{ navigate: mockNavigate } as any}
      route={{} as any}
    />);
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    expect(screen.getByText('Registro Usuario')).toBeTruthy();
    expect(screen.getByText('Principal')).toBeTruthy();
    expect(screen.getByText('Datos Biométricos')).toBeTruthy();
    expect(screen.getByText('Personalización')).toBeTruthy();
    expect(screen.getByText('CHAT')).toBeTruthy();
  });

  it('should navigate to the "Login" screen when the "Iniciar Sesión" button is pressed', () => {
    render(<MainMenuScreen
      navigation={{ navigate: mockNavigate } as any}
      route={{} as any}
    />);
    const loginButton = screen.getByText('Iniciar Sesión');
    fireEvent.press(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('should navigate to the "Register" screen when the "Registro Usuario" button is pressed', () => {
    render(<MainMenuScreen
      navigation={{ navigate: mockNavigate } as any}
      route={{} as any}
    />);
    const registerButton = screen.getByText('Registro Usuario');
    fireEvent.press(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});