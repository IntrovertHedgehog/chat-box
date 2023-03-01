import React, { useState, PropsWithChildren } from 'react';
import { Button, Image, Pressable, Text, TextInput, View, StyleSheet, FlatList } from 'react-native';

enum Sender {
  User,
  Bot
}

type Message = {
  sender: Sender,
  content: string,
  time: Date
}

type InputBoxProps = {
  newText: string,
  setNewText: (newText: string) => void,
  messages: Message[],
  setMessages: (messages: Message[]) => void
}

const InputBox = ({ newText, setNewText, messages, setMessages }: InputBoxProps) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder='Enter message...'
        value={newText}
        onChangeText={setNewText}
        style={styles.textBox}
      />
      <Pressable
        style={styles.sendButton}
        onPress={() => {
          setMessages([...messages, {
            sender: Sender.User,
            content: newText,
            time: new Date()
          }]);
          setNewText('')
        }}
      >
        <Text>Send</Text>
      </Pressable>
    </View>
  )
}

const ChatItem = (message: Message) => {
  return (
    <View style={{ backgroundColor: 'teal' }}>
      <View style={
        [styles.chatItemWrapper,
        message.sender == Sender.User && styles.chatItemWrapperUser]}
      >
        <Text style={styles.chatItem}>
          {message.content}
        </Text>
      </View>
    </View>
  )
}

type chatListProps = {
  messages: Message[],
}

const ChatList = ({ messages }: chatListProps) => {
  return (
    <FlatList
      style={styles.chatList}
      data={messages}
      renderItem={({ item }) => ChatItem(item)}
    />
  )
}

const mockMessages: Message[] = [
  {
    sender: Sender.User,
    content: 'Hi how are you?',
    time: new Date()
  },
  {
    sender: Sender.Bot,
    content: 'I\'m fine',
    time: new Date()
  },
  {
    sender: Sender.User,
    content: 'OK!!',
    time: new Date()
  }
]

const ChatBox = () => {
  const [newText, setNewText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  return (
    <View style={styles.container}>
      <ChatList messages={messages} />
      <InputBox
        newText={newText}
        setNewText={setNewText}
        messages={messages}
        setMessages={setMessages} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  chatItem: {
    height: 40,
    backgroundColor: 'white',
    color: 'black'
  },
  chatItemWrapper: {
    alignSelf: 'flex-start'
  },
  chatItemWrapperUser: {
    alignSelf: 'flex-end'
  },
  chatList: {

  },
  inputBox: {
    flexDirection: 'row'
  },
  textBox: {
    flex: 1,
    backgroundColor: 'crimson'
  },
  sendButton: {
    width: 60,
    height: 60,
    backgroundColor: 'orange'
  }

})

export default ChatBox;
