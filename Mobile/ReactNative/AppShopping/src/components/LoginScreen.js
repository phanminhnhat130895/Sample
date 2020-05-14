import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UserService } from '../services/user.service';
import ShareService from '../services/share.service';
import Message from './Message';
import { sagaSetAccessToken, setAccessToken } from '../state-redux/actions/auth.action';
import { connect } from 'react-redux';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: [],
            class: ''
        }
    }

    componentDidMount() {
        ShareService.getAccessToken()
            .then(res => {
                if(res) {
                    this.props.setAccessToken(res);
                    this.props.navigation.navigate('Home');
                }
            });
    }

    onLogin(){
        this.onClearMessage();
        if(this.state.username && this.state.password) {
            UserService.onLogin(this.state.username, this.state.password)
                .then(res => {
                    if(res === "Unauthenticate") {
                        this.setState({ class: 'error' });
                        this.onSetErrorMessage('Username or password incorrect');
                    }
                    else {
                        this.props.setAccessToken(res);
                        ShareService.setAccessToken(res)
                            .then(() => {
                                this.props.navigation.navigate('Home');
                            })
                            .catch(() => {
                                this.setState({ class: 'error' });
                                this.onSetErrorMessage('System error');
                            })
                    }
                })
                .catch((err) => {
                    this.setState({ class: 'error' });
                    this.onSetErrorMessage('System error');
                })
        }
        else{
            this.setState({ class: 'error' });
            if(!this.state.username) this.onSetErrorMessage('Please input username');
            if(!this.state.password) this.onSetErrorMessage('Please input password');
        }
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

    onGoToCreateAccount(){
        this.props.navigation.navigate('RegisterUser');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Login</Text>
                <Message message={this.state.message} class={this.state.class} />
                <TextInput style={styles.input} placeholder="Username" value={this.state.username} onChangeText={text => this.setState({ username: text })} />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({ password: text })} />
                <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
                    <Text style={styles.labelButton}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onGoToCreateAccount()}>
                    <Text style={styles.labelCreate}>Create Account</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapActionToProps() {
    return { sagaSetAccessToken, setAccessToken }
}

export default connect(null, mapActionToProps())(LoginScreen);

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
    },
    labelCreate: {
        color: '#0085fa',
        textDecorationLine: 'underline',
        textDecorationColor: '#0085fa',
        textDecorationStyle: 'solid',
        fontSize: 18,
        marginTop: 5
    }
})