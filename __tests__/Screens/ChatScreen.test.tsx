import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ChatScreen from '../../src/features/chat/screens/ChatScreen';

describe('ChatScreen', () => {
    it('should render the chat screen (basic structure - adjust as needed)', () => {
        render(<ChatScreen />);
        expect(screen.getByPlaceholderText('Type a message...')).toBeTruthy();
        expect(screen.getByTestId('chat-messages-container')).toBeTruthy();
    });
});