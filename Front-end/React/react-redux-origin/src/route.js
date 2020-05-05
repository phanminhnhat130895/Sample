import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './state-redux/store';
import { Provider } from 'react-redux';

import LoginComponent from './components/login.component';
import MainComponent from './components/main.component';

import ShareService from './services/share.service';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    let token = ShareService.getJwtToken();
    <Route {...rest} render={(props) => (
        token ? <Component {...props} /> : <Redirect to='/' />
    )} />
}

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