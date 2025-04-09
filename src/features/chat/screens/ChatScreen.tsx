import React from 'react';
import { View, StyleSheet, FlatList, TextInput, Platform } from 'react-native';
import { Text, Avatar, Card, Button } from 'react-native-paper'; import { ScreenWrapper } from '../../../components';

// Interfaz para los mensajes del chat
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const ChatScreen = () => {
  // Estado para los mensajes del chat
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: '1', sender: 'bot', text: 'Aquí tienes una rutina de pierna equilibrada.\n-Sentadilla con barra o mancuernas.' },
    { id: '2', sender: 'user', text: 'Recomiendame ejercicios para mi rutina de pierna' },
    { id: '3', sender: 'bot', text: 'Aquí tienes una rutina de pierna equilibrada.\n-Sentadilla con barra o mancuernas.' },
    { id: '4', sender: 'user', text: 'Recomiendame ejercicios para mi rutina de pierna' },
  ]);
  const [inputText, setInputText] = React.useState('');

  // Función para renderizar cada mensaje
  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === 'user';
    return (
      <Card style={[styles.messageCard, isUser ? styles.userMessage : styles.botMessage]}>
        <Card.Content>
          <Text style={{ color: isUser ? 'white' : 'white' }}>{item.text}</Text>
        </Card.Content>
      </Card>
    );
  };

  // Función para enviar un nuevo mensaje
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: String(messages.length + 1),
        sender: 'user',
        text: inputText,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      // Aquí iría la lógica para enviar el mensaje al bot y recibir la respuesta
    }
  };

  return (
    <ScreenWrapper style={{bottom: Platform.OS === 'android' ? 20 : 0}}>
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            inverted
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
    fontSize: 16,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#8c8c8b',
    fontSize: 16,

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