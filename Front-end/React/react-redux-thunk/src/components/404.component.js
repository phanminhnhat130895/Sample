import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Error404Component extends Component {
    render() {
        return (
            <div>
                <h3>Page not found!</h3>
            </div>
        )
    }
}

export default withRouter(Error404Component);