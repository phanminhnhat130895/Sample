import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setJwtToken } from '../state-redux/actions/auth.action';
import ShareService from '../services/share.service';
import { Switch, Route } from 'react-router-dom';
import UserComponent from './user.component';
import Error404Component from './404.component';

class MainComponent extends Component {
    constructor(props){
        super(props);

        this.onShowToken = this.onShowToken.bind(this);
    }

    componentDidMount(){
        let token = ShareService.getJwtToken();
        this.props.setJwtToken(token);
    }

    onShowToken(){
        console.log(this.props.token);
    }

    render(){
        return(
            <div>
                <h3>Main Component</h3>
                <button onClick={this.onShowToken}>Show</button>
                <Switch>
                    <Route path='/main/user' component={UserComponent}></Route>
                    <Route component={Error404Component}></Route>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { token: state.auth }
}

function mapActionToProps(){
    return { setJwtToken }
}

export default connect(mapStateToProps, mapActionToProps())(MainComponent);