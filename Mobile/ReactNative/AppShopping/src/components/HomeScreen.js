import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styles from '../common/styles';
import { CommonActions } from '@react-navigation/native';
import { setAccessToken } from '../state-redux/actions/auth.action';
import { setMessage } from '../state-redux/actions/message.action';
import ShareService from '../services/share.service';
import Message from './Message';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        }
    }

    componentDidMount() {
        this.props.navigation.dispatch(state => {
            const routes = state.routes.filter(r => r.name !== 'Login');
          
            return CommonActions.reset({
              ...state,
              routes,
              index: routes.length - 1,
            });
        });
        if(this.props.role === "Admin") this.setState({ isAdmin: true });
        // ShareService.getDecodeToken()
        //     .then(res => {
        //         if(res.ROLE === "Admin") this.setState({ isAdmin: true });
        //     })
        //     .catch(() => {
        //         alert('System error');
        //     })
    }

    onGoToUserProfile() {
        this.props.setMessage(['Error'], 'error');
        // this.props.navigation.navigate('UserProfile');
    }

    onLogout(){
        this.props.setAccessToken(null);
        ShareService.clearAccessToken();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Message />
                <View style={homeStyles.area}>
                    {this.state.isAdmin == true && 
                        <TouchableOpacity style={homeStyles.button}>
                            <Text style={styles.labelButton}>Admin Area</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={homeStyles.button} onPress={() => this.onGoToUserProfile()}>
                        <Text style={styles.labelButton}>User Area</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={homeStyles.button} onPress={() => this.onLogout()}>
                    <Text style={styles.labelButton}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { token: state.auth.token, role: state.auth.role }
}

function mapActionToProps() {
    return { setAccessToken, setMessage }
}

export default connect(mapStateToProps, mapActionToProps())(HomeScreen);

const homeStyles = StyleSheet.create({
    area: {
        flexDirection: 'row'
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
        elevation: 8,
        marginLeft: 5,
        marginRight: 5
    },
})