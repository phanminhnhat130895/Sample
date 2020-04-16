import React, { Component } from 'react';
import UserService from '../services/user.service';
import ShareService from '../services/share.service';
import { setJwtToken } from '../state-redux/actions/auth.action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        if(ShareService.getJwtToken()) this.props.history.push('/main/user');

        this.onLogin = this.onLogin.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onLogin(){
        UserService.onLogin(this.state.username, this.state.password)
            .then(res => {
                if(res){
                    ShareService.setJwtToken(res);
                    this.props.setJwtToken(res);
                    this.props.history.push('/main/user');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    async onHandleChange(event){
        let propName = event.target.name;
        let value = event.target.value;
        await this.setState(prevState => ({
            [propName]: value
        }))
    }

    render(){
        return(
            <div>
                <div>
                    <label>Username</label>
                    <input type='text' name='username' value={this.state.username} onChange={this.onHandleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.onHandleChange} />
                </div>
                <div>
                    <button onClick={this.onLogin}>Login</button>
                </div>
            </div>
        )
    }
}

function mapActionToProps(){
    return { setJwtToken }
}

export default connect(null, mapActionToProps())(withRouter(LoginComponent));