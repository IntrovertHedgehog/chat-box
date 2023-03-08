import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const background = { uri: 'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png' }

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

type chatListProps = {
  messages: Message[],
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

const InputBox = ({ newText, setNewText, messages, setMessages }: InputBoxProps) => {
  return (
    <View style={styles.inputBox}>
      <View style={styles.textBoxPadder}></View>
      <TextInput
        placeholder='Send new message...'
        value={newText}
        onChangeText={setNewText}
        style={styles.textBox}
        placeholderTextColor={theme.gray}
      />
      <View
        style={styles.sendButton}
      >
        <Icon
          name="send"
          size={35}
          color={theme.purple}
          style={{
            alignSelf: 'center'
          }}
          onPress={() => {
            setMessages([...messages, {
              sender: Sender.User,
              content: newText,
              time: new Date()
            }]);
            setNewText('')
          }}
        >
        </Icon>
      </View>
    </View>
  )
}

const ChatItem = (message: Message) => {
  return (
    <View style={styles.chatRow}>
      <View style={
        [styles.chatItemWrapper,
        message.sender == Sender.User && styles.chatItemWrapperUser]}
      >
        <Text style={[styles.chatItem, message.sender == Sender.User && styles.chatItemUser]}>
          {message.content}
        </Text>
      </View>
    </View>
  )
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

const ChatBox = () => {
  const [newText, setNewText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background} resizeMode='cover'>
        <ChatList messages={messages} />
        <InputBox
          newText={newText}
          setNewText={setNewText}
          messages={messages}
          setMessages={setMessages} />
      </ImageBackground>
    </View>
  )

}

const theme = {
  white: '#f4f7f9',
  purple: '#5A5EB9',
  gray: '#888',
  black: 'black'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1
  },
  headerText: {
    backgroundColor: theme.purple,
    color: theme.white,
    height: 65,
    fontSize: 25,
    paddingTop: 14,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontWeight: "600"
  },
  chatRow: {
    padding: 10,
    paddingRight: 12
  },
  chatItemWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: theme.white,
    maxWidth: '60%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  chatItemWrapperUser: {
    alignSelf: 'flex-end',
    backgroundColor: theme.purple
  },
  chatItem: {
    color: theme.black,
    padding: 13,
    fontSize: 15,
    lineHeight: 18
  },
  chatItemUser: {
    color: theme.white
  },
  textBoxPadder: {
    width: 10,
    backgroundColor: theme.white,
    borderWidth: 0
  },
  inputBox: {
    flexDirection: 'row',
    height: 58
  },

  textBox: {
    flex: 1,
    backgroundColor: theme.white,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#ccc',
    color: theme.black,
    fontSize: 17
  },

  sendButton: {
    backgroundColor: theme.white,
    height: 'auto',
    width: 58,
    alignContent: 'center',
    justifyContent: 'center'
  }

})

export default ChatBox;
