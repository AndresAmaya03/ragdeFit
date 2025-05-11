import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { ScreenWrapper } from '../../../components';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Hola! Soy tu asistente personal para rutinas de ejercicios. ¿Cómo puedo ayudarte?',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === 'user';
    return (
      <Card style={[styles.messageCard, isUser ? styles.userMessage : styles.botMessage]}>
        <Card.Content>
          <Text style={{ color: 'white' }}>{item.text}</Text>
        </Card.Content>
      </Card>
    );
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: String(messages.length + 1),
        sender: 'user',
        text: inputText,
      };

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');

      setTimeout(() => {
        let generatedText = '';
        const lowerInput = inputText.toLowerCase();

        if (lowerInput.includes('pierna')) {
          generatedText = `¡Claro! Aquí tienes una rutina de pierna para principiantes:\n\n1. Sentadillas (Squats) - 3x12\n2. Elevación de talones (Calf Raises) - 3x15\n3. Zancadas (Lunges) - 3x10 por pierna\n4. Puentes de glúteos (Glute Bridges) - 3x12\n5. Prensa de pierna (Leg Press) - 3x10\n\nRecuerda calentar antes y estirar al final.`;
        } else if (lowerInput.includes('espalda')) {
          generatedText = `¡Claro! Aquí tienes una rutina de espalda para principiantes:\n\n1. Remo con mancuerna - 3x10 por brazo\n2. Peso muerto con piernas semi-rígidas - 3x12\n3. Pull-over con mancuerna - 3x12\n4. Face pulls con banda elástica - 3x15\n5. Superman - 3x15 segundos\n\nHazlo con buena técnica y sin peso excesivo.`;
        } else if (lowerInput.includes('pecho')) {
          generatedText = `¡Claro! Aquí tienes una rutina de pecho para principiantes:\n\n1. Flexiones (Push-ups) - 3x10\n2. Press de pecho con mancuernas - 3x12\n3. Aperturas con mancuernas (Flyes) - 3x12\n4. Press inclinado con mancuernas - 3x10\n5. Fondos entre bancos (Bench Dips) - 3x10\n\nEntrena a tu ritmo y mantén la forma correcta.`;
        } else if (lowerInput.includes('tren superior')) {
          generatedText = `¡Aquí va una rutina de tren superior para principiantes!\n\n1. Flexiones (Push-ups) - 3x10\n2. Press militar con mancuernas - 3x12\n3. Remo con mancuerna - 3x10 por lado\n4. Curl de bíceps - 3x12\n5. Extensión de tríceps por encima de la cabeza - 3x12\n\nIdeal para fortalecer brazos, pecho y espalda.`;
        } else if (lowerInput.includes('tren inferior')) {
          generatedText = `¡Aquí tienes una rutina de tren inferior para principiantes!\n\n1. Sentadillas - 3x12\n2. Zancadas caminando - 3x10 por pierna\n3. Peso muerto rumano - 3x12\n4. Elevación de talones - 3x15\n5. Glute bridges - 3x12\n\nActiva glúteos, cuádriceps y femorales.`;
        } else {
          generatedText = 'Lo siento, no encontré una rutina para ese grupo muscular. Puedes pedirme una rutina de "pierna", "espalda", "pecho", "tren superior" o "tren inferior".';
        }

        // Dividir el mensaje por líneas
        const lines = generatedText.split('\n').filter(line => line.trim() !== '');

        // Agregar cada línea con un retardo progresivo
        lines.forEach((line, index) => {
          setTimeout(() => {
            const botMessage: ChatMessage = {
              id: String(messages.length + 2 + index),
              sender: 'bot',
              text: line,
            };

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setMessages(prev => {
              const updated = [...prev, botMessage];
              flatListRef.current?.scrollToEnd({ animated: true });
              return updated;
            });
          }, 700 * index); // cada línea aparece 700ms después de la anterior
        });

      }, 700); // espera inicial antes de que el bot empiece a "escribir"
    }
  };

  return (
    <ScreenWrapper style={{ bottom: Platform.OS === 'android' ? 20 : 0 }}>
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={text => setInputText(text)}
            placeholder="Escribe un mensaje..."
          />
          <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
            Enviar
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageCard: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e63225',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#8c8c8b',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 6,
    backgroundColor: '#e63225',
  },
});

export default ChatScreen;

