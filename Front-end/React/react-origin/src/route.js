import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history'

import LoginComponent from './components/login.component';
import MainComponent from './components/main.component';
import UserComponent from './components/user.component';
import Error404Component from './components/404.component';

class AppRoute extends Component {
    render(){
        const history = createBrowserHistory();
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={LoginComponent}></Route>
                    <MainComponent>
                        <Route component={({ match }) => 
                            <div>
                                <Route path='/user' component={UserComponent}></Route>
                                <Route component={Error404Component} />
                            </div>
                        } />
                    </MainComponent>
                </Switch>
            </Router>
        )
    }
}

export default AppRoute;