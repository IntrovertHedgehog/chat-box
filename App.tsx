import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import ChatBox from './components/ChatBox';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          options={{
            headerShown: false
          }}
          component={Login} />
        <Stack.Screen
          name='ChatBox'
          options={{
            headerTitle:"Eminem Bot 🤖"
          }}
          component={ChatBox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}