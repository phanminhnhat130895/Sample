import React, { Component } from 'react';

import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import CreateAccountScreen from './CreateAccountScreen';
import UserProfileScreen from './UserProfileScreen';

class MainScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Stack = createStackNavigator();
        return(
            <NavigationContainer>
                <Spinner visible={this.props.spinner} size="large" color="#ffffff" overlayColor="rgba(0, 0, 0, 0.3)" />
                <Stack.Navigator initialRouteName="Login" screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#0085fa' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontSize: 20, fontFamily: 'Arial' }
                }}>
                    <Stack.Screen name="Login" component={ LoginScreen } options={{ headerShown: false }} />
                    <Stack.Screen name="CreateAccount" component={ CreateAccountScreen } options={{ headerTitle: "Create Account" }} />
                    <Stack.Screen name="Home" component={ HomeScreen } options={{ headerTitle: "Home" }} />
                    <Stack.Screen name="UserProfile" component={ UserProfileScreen } options={{ headerTitle: "User Profile" }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

function mapStateToProps(state) {
    return { spinner: state.loading }
}

export default connect(mapStateToProps)(MainScreen);