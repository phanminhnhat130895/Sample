import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export default function Message (props) {
    if(props.message.length > 0)
        return (
            props.message.map((item, key) => (
                <Text style={props.class == "error" ? styles.errorText : styles.successText} key={key}>{item}</Text>
            ))
        )
    else
        return null;
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