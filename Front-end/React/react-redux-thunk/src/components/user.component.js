import React, { Component } from 'react';
import { User } from '../models/user';
import UserService from '../services/user.service';
import { withRouter } from 'react-router-dom';

class UserComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: new User()
        }

        this.onRegister = this.onRegister.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    async onHandleChange(event){
        let propName = event.target.name;
        let value = event.target.value;
        await this.setState(prevState => ({
            user: {
                ...prevState.user,
                [propName]: value
            }
        }))
    }

    onRegister(){
        UserService.onRegister(this.state.user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render(){
        return(
            <div>
                <h3>User Component</h3>
                <div>
                    <label>Username</label>
                    <input type='text' name='USERNAME' value={this.state.user.USERNAME} onChange={this.onHandleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='PASSWORD' value={this.state.user.PASSWORD} onChange={this.onHandleChange} />
                </div>
                <div>
                    <label>Role</label>
                    <select value={this.state.user.ROLE} name='ROLE' onChange={this.onHandleChange}>
                        <option value='Super Admin'>Super Admin</option>
                        <option value='Admin'>Admin</option>
                        <option value='Member'>Member</option>
                        <option value='Guest'>Guest</option>
                    </select>
                </div>
                <div>
                    <label>Active</label>
                    <select value={this.state.user.ACTIVE} name='ACTIVE' onChange={this.onHandleChange}>
                        <option value='0'>Inactive</option>
                        <option value='1'>Active</option>
                    </select>
                </div>
                <div>
                    <label>Email</label>
                    <input type='text' name='EMAIL' value={this.state.user.EMAIL} onChange={this.onHandleChange} />
                </div>
                <div>
                    <label>DOB</label>
                    <input type='date' name='DAYOFBIRTH' value={this.state.user.DAYOFBIRTH} onChange={this.onHandleChange} />
                </div>
                <div>
                    <label>Address</label>
                    <input type='text' name='ADDRESS' value={this.state.user.ADDRESS} onChange={this.onHandleChange} />
                </div>
                <div>
                    <button onClick={this.onRegister}>Register</button>
                </div>
            </div>
        )
    }
}

export default withRouter(UserComponent);