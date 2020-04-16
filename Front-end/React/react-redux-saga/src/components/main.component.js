import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserComponent from './user.component';
import Error404Component from './404.component';
import { connect } from 'react-redux';
import { manageTokenSaga } from '../state-redux/actions/auth.action';

class MainComponent extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props);

        this.state = {
            token: this.props.token
        }

        this.onShowToken = this.onShowToken.bind(this);
        this.onManageToken = this.onManageToken.bind(this);
    }

    componentDidMount(){
        console.log(this.props.token);
    }

    onShowToken(){
        console.log(this.props.token);
    }

    onManageToken(){
        this.props.manageTokenSaga(this.state.token);
    }

    render(){
        return(
            <div>
                <h3>Main Component</h3>
                <Switch>
                    <Route path='/main/user' component={UserComponent}></Route>
                    <Route component={Error404Component}></Route>
                </Switch>
                <button onClick={this.onShowToken}>Show</button>
                <button onClick={this.onManageToken}>Manage Token</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { token: state.auth }
}

function mapActionToProps(){
    return { manageTokenSaga }
}

export default connect(mapStateToProps, mapActionToProps())(MainComponent);