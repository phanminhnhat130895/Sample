import React, { Component } from 'react';
// import { setJwtToken } from '../state-redux/actions/auth.action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import ShareService from '../services/share.service';
import { Switch, Route } from 'react-router-dom';
import UserComponent from './user.component';
import Error404Component from './404.component';

class MainComponent extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.token);
    }

    render(){
        return(
            <div>
                <h3>Main Component</h3>
                <Switch>
                    <Route path='/main/user' component={UserComponent}></Route>
                    <Route component={Error404Component}></Route>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { token: state.auth }
}

export default connect(mapStateToProps)(withRouter(MainComponent));