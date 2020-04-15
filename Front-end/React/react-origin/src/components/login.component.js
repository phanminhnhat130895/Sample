import React, { Component } from 'react';
import UserService from '../services/user.service';
import ShareService from '../services/share.service';

class LoginComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.onLogin = this.onLogin.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onLogin(){
        UserService.Login(this.state.username, this.state.password)
            .then(res => {
                if(res){
                    ShareService.setJwtToken(res);
                    this.props.history.push('/user');
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
        }));
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

export default LoginComponent;