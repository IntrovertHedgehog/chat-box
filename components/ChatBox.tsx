import React, { useState, useEffect, useReducer, LegacyRef } from 'react';
import { Text, TextInput, View, StyleSheet, FlatList, ImageBackground, ScrollView, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import database, { firebase } from '@react-native-firebase/database';
import { PermissionsAndroid } from 'react-native';

const background = { uri: 'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png' }

type Message = {
  fromUser: boolean,
  content: string,
  time: Date
}

type ChatBoxProps = {
  route: any,
  navigation: any,
}

const reducer = (messages: Message[], newMessage: Message) => {
  return [...messages, newMessage];
}

const ChatBox = ({ route, navigation }: ChatBoxProps) => {
  const { userId } = route.params;
  const [newText, setNewText] = useState('');
  const [messages, dispatch] = useReducer(reducer, [])

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    const onValueChange = firebase
      .app()
      .database('https://rn-chatbox-90559-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/messages/${userId}`)
      .on('child_added', snapshot => {
        console.log('something is wrong I can feel it:', userId, snapshot.val())
        // setMessages([...messages, snapshot.val()])
        dispatch(snapshot.val());
      })
    return () => firebase
      .app()
      .database('https://rn-chatbox-90559-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/messages/${userId}`)
      .off('value', onValueChange)
    // return subscriber; // unsubscribe on unmount
  }, []);



  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background} resizeMode='cover'>
        <ChatList messages={messages} />
        <InputBox
          newText={newText}
          setNewText={setNewText}
          messages={messages}
          setMessages={dispatch}
          userId={userId} />
      </ImageBackground>
    </View>
  )

}


type InputBoxProps = {
  newText: string,
  setNewText: (newText: string) => void,
  messages: Message[],
  setMessages: (messages: Message) => void,
  userId: string
}

type chatListProps = {
  messages: Message[],
}

const botMessages = [
  "Look",
  "If you had one shot, or one opportunity",
  "To seize everything you ever wanted",
  "One moment",
  "Would you capture it or just let it slip?",
  "Yo",
  "His palms are sweaty, knees weak, arms are heavy",
  "There's vomit on his sweater already, mom's spaghetti",
  "He's nervous, but on the surface he looks calm and ready to drop bombs",
  "But he keeps on forgetting what he wrote down, the whole crowd goes so loud",
  "He opens his mouth, but the words won't come out",
  "He's choking how, everybody's joking now",
  "The clock's run out, time's up, over, blaow!",
]

let [curBot, nBot] = [0, botMessages.length]

const nextBotMessage = () => {
  return botMessages[(curBot++) % nBot];
}

const InputBox = ({ newText, setNewText, messages, setMessages, userId }: InputBoxProps) => {

  const sendMessage = () => {
    if (!newText) return;

    firebase
      .app()
      .database('https://rn-chatbox-90559-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/messages/${userId}`)
      .push()
      .set({
        fromUser: true,
        content: newText,
        time: Date.now()
      })
      .then(() => console.log(`New message pushed: ${newText}`));

    firebase
      .app()
      .database('https://rn-chatbox-90559-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/messages/${userId}`)
      .push()
      .set({
        fromUser: false,
        content: nextBotMessage(),
        time: Date.now()
      })
      .then(() => console.log(`New message pushed: ${newText}`));

    setNewText('');
  }

  let textRef: TextInput | null;

  return (
    <View style={styles.inputBox}>
      <View style={styles.textBoxPadder}></View>
      <TextInput
        placeholder='Send new message...'
        value={newText}
        onChangeText={setNewText}
        style={styles.textBox}
        placeholderTextColor={theme.gray}
        returnKeyType='send'
        ref={ref => { textRef = ref }}
        onSubmitEditing={sendMessage}
        blurOnSubmit={false}
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
          onPress={sendMessage}
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
        message.fromUser && styles.chatItemWrapperUser]}
      >
        <Text style={[styles.chatItem, message.fromUser && styles.chatItemUser]}>
          {message.content}
        </Text>
      </View>
    </View>
  )
}

const ChatList = ({ messages }: chatListProps) => {
  let scrollView: FlatList<Message> | null;
  return (
    <FlatList
      // style={styles.chatList}
      ref={ref => { scrollView = ref }}
      onContentSizeChange={() => { if (messages.length) scrollView?.scrollToEnd() }}
      data={messages}
      renderItem={({ item }) => ChatItem(item)}
    />
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
