import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setJwtToken } from '../state-redux/actions/auth.action';
import ShareService from '../services/share.service';
import { withRouter } from 'react-router-dom';

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

export default connect(mapStateToProps, mapActionToProps())(withRouter(MainComponent));