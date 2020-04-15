import React, { Component } from 'react';

class MainComponent extends Component {
    render(){
        return(
            <div>
                <h3>Main Component</h3>
                <div style={{width: '200px', height: '200px', backgroundColor: 'yellow'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default MainComponent;