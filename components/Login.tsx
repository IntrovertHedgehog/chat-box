import { Button, Text } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, TouchableHighlight, View } from "react-native";
import { Input } from '@rneui/themed';
import auth from '@react-native-firebase/auth';

type LoginProps = {
    navigation: any
}


const Login = ({ navigation }: LoginProps) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('password');
    const [errMsg, setErrMsg] = useState('')

    const signIn = (email: string, password: string) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then( credentials => {
                console.log(credentials.user.uid);
                navigation.navigate('ChatBox', {userId: credentials.user.uid})
            })
            .catch(err => {
                setErrMsg('PLEASE ENTER VAID CREDENTIALS');
                setEmail('');
                setPassword('');
                console.error("Email or password is invalid");
            })
    }

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    source={require('../resources/img/homebackground.png')}
                    style={styles.container}
                    resizeMode="cover"
                >
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        underlineColorAndroid='transparent'
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainer}
                        onChangeText={value => setEmail(value)}
                        defaultValue={email}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainer}
                        secureTextEntry={true}
                        onChangeText={value => setPassword(value)}
                        defaultValue={password}
                    />
                    <TouchableHighlight
                        onPress={() => {
                            if (!(email && password)) {
                                return setErrMsg('PLEASE ENTER EMAIL AND PASSWORD');
                            }
                            signIn(email, password)
                        }}
                        accessibilityLabel="Login"
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableHighlight>

                    {
                        errMsg &&
                        <View style={styles.messageContainer}>
                            <Text style={styles.message}>{errMsg}</Text>
                        </View>
                    }
                </ImageBackground>
            </View>
        )
    }

    auth()
        .signOut()
        .catch(err => { })

    return null;

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
        alignContent: "center",
        justifyContent: "center",
        padding: 30
    },
    input: {
        borderWidth: 1,
        borderColor: theme.gray,
        borderRadius: 5,
        paddingLeft: 10
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    loginButton: {
        backgroundColor: theme.purple,
        borderRadius: 10,
        height: 50,
        width: "95%",
        alignSelf: "center",
        justifyContent: "center"
    },
    loginText: {
        color: theme.white,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    messageContainer: {
        paddingTop: 10
    },
    message: {
        color: 'red',
        fontSize: 13,
        alignSelf: "center"
    }
})

export default Login;