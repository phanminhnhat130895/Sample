import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './state-redux/store';
import { Provider } from 'react-redux';

import LoginComponent from './components/login.component';
import MainComponent from './components/main.component';
import UserComponent from './components/user.component';
import Error404Component from './components/404.component';

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
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={LoginComponent}></Route>
                    <Provider store={store}>
                        <MainComponent>
                            {/* <Route component={({ match }) => 
                                <div>
                                    <Route path='/user' component={UserComponent}></Route>
                                    <Route component={Error404Component}></Route>
                                </div>
                            } /> */}
                        </MainComponent>
                        <Switch>
                            <Route path='/user' component={UserComponent}></Route>
                            <Route component={Error404Component}></Route>
                        </Switch>
                    </Provider>
                </Switch>
            </Router>
        )
    }
}

export default AppRoute;