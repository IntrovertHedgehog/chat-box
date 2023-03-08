import { Button, Text } from "@rneui/base";
import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Input } from '@rneui/themed';

type LoginProps = {
    navigation: any
}

const Login = ({ navigation }: LoginProps) => {
    return (
        <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                underlineColorAndroid='transparent'
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                secureTextEntry={true}
            />
            <TouchableHighlight
                onPress={() => { navigation.navigate('ChatBox') }}
                accessibilityLabel="Login"
                style={styles.loginButton}
            >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableHighlight>
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
    }
})

export default Login;