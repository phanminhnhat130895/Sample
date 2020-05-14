import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { UserService } from '../services/user.service';
import User from '../models/user';
import Message from './Message';

export default class CreateAccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: new User(),
            confirmPassword: '',
            message: [],
            class: ''
        }
    }

    onRegister(){
        this.onClearMessage();
        if(this.onValidateForm()){
            UserService.onRegister(this.state.user)
                .then(res => {
                    if(res == 1) this.props.navigation.navigate('Home');
                    else {
                        this.setState({ class: 'error' });
                        this.onSetErrorMessage('Register user failed');
                    }
                })
                .catch((err) => {
                    this.setState({ class: 'error' });
                    this.onSetErrorMessage('System error');
                })
        }
        else{
            this.onDisplayMessage();
        }
    }

    onValidateForm() {
        if(!this.state.user.username || !this.state.user.password || (this.state.user.password != this.state.confirmPassword))
            return false;
        return true;
    }

    onDisplayMessage() {
        this.setState({ class: 'error' });
        if(!this.state.user.username) this.onSetErrorMessage('Username is required');
        if(!this.state.user.password) this.onSetErrorMessage('Password is required');
        if(this.state.user.password && (this.state.user.password != this.state.confirmPassword)) this.onSetErrorMessage('Confirm password incorrect');
    }

    onSetErrorMessage(error) {
        this.setState(state => {
            const message = [...state.message, error];
            return { message, user: state.user, confirmPassword: state.confirmPassword };
        });
    }

    onClearMessage() {
        this.setState({ message: [], class: '' });
    }

    onHandleChange(text, type) {
        let propsName = '';
        switch(type){
            case 0:
                propsName = 'username'; break;
            case 1:
                propsName = 'password'; break;
        }
            
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [propsName]: text
            }
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Create Account</Text>
                <Message message={this.state.message} class={this.state.class} />
                <TextInput style={styles.input} placeholder="Username" value={this.state.user.username}
                    onChangeText={text => this.onHandleChange(text, 0)} />
                <TextInput style={styles.input} placeholder="Password" value={this.state.user.password} secureTextEntry={true}
                    onChangeText={text => this.onHandleChange(text, 1)} />
                <TextInput style={styles.input} placeholder="Confirm Password" value={this.state.confirmPassword} secureTextEntry={true}
                    onChangeText={text => this.setState({confirmPassword: text})} />
                <TouchableOpacity style={styles.button} onPress={() => this.onRegister()}>
                    <Text style={styles.labelButton}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: "#0085fa",
        height: 35,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 7,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 15 },
        shadowOpacity: 0.8,
        elevation: 8
    },
    labelButton: {
        color: "white",
        fontSize: 20
    },
    input: {
        alignSelf: 'stretch',
        paddingLeft: 5,
        borderBottomColor: '#02b2f7',
        borderBottomWidth: 2,
        fontSize: 18,
        height: 50,
        paddingBottom: -5
    }
})