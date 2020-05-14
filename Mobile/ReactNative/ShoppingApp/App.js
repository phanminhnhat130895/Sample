import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={ LoginScreen } />
          <Stack.Screen name="Home" component={ HomeScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    )    
  }
}