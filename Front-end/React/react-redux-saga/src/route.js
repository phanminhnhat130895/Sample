import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import store from './state-redux/store';

import LoginComponent from './components/login.component';
import MainComponent from './components/main.component';

class AppRoute extends Component {
    render(){
        const history = createBrowserHistory();
        return(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={LoginComponent}></Route>
                        <Route path='/main' component={MainComponent}></Route>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default AppRoute;