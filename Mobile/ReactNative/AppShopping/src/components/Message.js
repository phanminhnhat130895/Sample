import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: props.message,
            className: props.className
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            message: nextProps.message,
            className: nextProps.className
        });
    }

    render() {
        if(this.state.message && this.state.message.length > 0)
            return (
                this.state.message.map((item, key) => (
                    <Text style={this.state.className == "error" ? styles.errorText : styles.successText} key={key}>{item}</Text>
                ))
            )
        else
            return null;
    }
}

function mapStateToProps(state) {
    return { message: state.message.message, className: state.message.className }
}

export default connect(mapStateToProps)(Message);

const styles = StyleSheet.create({
    errorText: {
        color: '#f52020'
    },
    successText: {
        color: '#42f575'
    }
})