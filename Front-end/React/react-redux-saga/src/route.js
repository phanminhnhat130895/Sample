import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import store from './state-redux/store';

import { ShareService } from './services/share.service';

import LoginComponent from './components/login.component';
import MainComponent from './components/main.component';
import AuthorizationComponent from './components/authorization.component';
import UserComponent from './components/user.component';

const AuthenticateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => ShareService.isAuthenticate() ? (<Component {...props} />) : (<Redirect to={{ pathname: '/' }}/>)}/>
);

const AuthorizationRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => ShareService.isAuthorization(roles) ? (<Component {...props} />) : (<Redirect to={{ pathname: '/' }}/>)}/>
);

class AppRoute extends Component {
    render(){
        const history = createBrowserHistory();
        return(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={LoginComponent}></Route>
                        <Route path='/user' component={UserComponent}></Route>
                        {/* <Route path='/main' component={MainComponent}></Route> */}
                        <AuthenticateRoute path='/main' component={MainComponent}></AuthenticateRoute>
                        <AuthorizationRoute path='/authorization' roles={['Member']} component={AuthorizationComponent}></AuthorizationRoute>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default AppRoute;