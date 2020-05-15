import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../common/styles';
import { connect } from 'react-redux';
import { UserService } from '../services/user.service';
import ShareService from '../services/share.service';
import Message from './Message';
import { sagaSetAccessToken, setAccessToken } from '../state-redux/actions/auth.action';
import { setMessage, clearMessage } from '../state-redux/actions/message.action';
import { toggleLoading } from '../state-redux/actions/loading.action';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoading: true
        }
    }

    componentDidMount() {
        ShareService.getAccessToken()
            .then(res => {
                if(res) {
                    this.props.setAccessToken(res);
                    this.props.navigation.navigate('Home');
                }
                else{
                    this.setState({ isLoading: false });
                }
            });
    }

    onLogin() {
        //this.onClearMessage();
        if(this.state.username && this.state.password) {
            this.props.toggleLoading();
            UserService.onLogin(this.state.username, this.state.password)
                .then(res => {
                    if(res === "Unauthenticate") {
                        this.onSetErrorMessage(['Username or password incorrect']);
                        this.props.toggleLoading();
                    }
                    else {
                        this.props.setAccessToken(res);
                        this.props.toggleLoading();
                        ShareService.setAccessToken(res)
                            .then(() => {
                                this.props.navigation.navigate('Home');
                            })
                            .catch(() => {
                                this.onSetErrorMessage(['System error']);
                            })
                    }
                })
                .catch((err) => {
                    this.props.toggleLoading();
                    this.onSetErrorMessage(['System error']);
                })
        }
        else{
            let message = [];
            if(!this.state.username) message.push('Please input username');
            if(!this.state.password) message.push('Please input password');
            this.onSetErrorMessage(message);
        }
    }

    onSetErrorMessage(error) {
        this.props.setMessage(error, 'error');
    }

    onClearMessage() {
        this.props.clearMessage();
    }

    onGoToCreateAccount(){
        this.props.navigation.navigate('CreateAccount');
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading == false ?
                    (
                        <View style={loginStyles.contentContainer}>
                            <Text style={loginStyles.label}>Login</Text>
                            <Text>{this.props.message[0]}</Text>
                            <Message />
                            <TextInput style={loginStyles.input} placeholder="Username" value={this.state.username} onChangeText={text => this.setState({ username: text })} />
                            <TextInput style={loginStyles.input} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({ password: text })} />
                            <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
                                <Text style={styles.labelButton}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onGoToCreateAccount()}>
                                <Text style={loginStyles.labelCreate}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    (
                        <View style={loginStyles.contentContainer}>
                            <Image source={ require('../images/icon.png') } style={loginStyles.icon} />
                        </View> 
                    )
                }
            </View>
        )
    }
}

function mapActionToProps() {
    return { sagaSetAccessToken, setAccessToken, setMessage, clearMessage, toggleLoading }
}

function mapStateToProps(state) {
    return { message: state.message.message }
}

export default connect(mapStateToProps, mapActionToProps())(LoginScreen);

const loginStyles = StyleSheet.create({
    label: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    input: {
        paddingLeft: 5,
        borderBottomColor: '#02b2f7',
        borderBottomWidth: 2,
        fontSize: 18,
        height: 40,
        paddingBottom: -5,
        paddingTop: -5,
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dcdde0',
        backgroundColor: '#fff',
        marginTop: 5
    },
    labelCreate: {
        color: '#0085fa',
        textDecorationLine: 'underline',
        textDecorationColor: '#0085fa',
        textDecorationStyle: 'solid',
        fontSize: 18,
        marginTop: 10
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})