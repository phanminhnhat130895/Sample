import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class LoginScreen extends Component {
    onLogin(){
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Login Screen</Text>
                <TextInput placeholder="Username" />
                <TextInput placeholder="Password" secureTextEntry={true} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.labelButton} onPress={this.onLogin()}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    label: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: "#03c2fc"
    },
    labelButton: {
        color: "white",
        fontSize: 20
    }
})