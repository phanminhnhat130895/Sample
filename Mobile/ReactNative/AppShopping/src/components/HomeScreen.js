import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ShareService from '../services/share.service';
import { connect } from 'react-redux';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        }
    }

    componentDidMount() {
        if(this.props.role === "Admin") this.setState({ isAdmin: true });
        // ShareService.getDecodeToken()
        //     .then(res => {
        //         if(res.ROLE === "Admin") this.setState({ isAdmin: true });
        //     })
        //     .catch(() => {
        //         alert('System error');
        //     })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <View style={styles.area}>
                    {this.state.isAdmin == true && 
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.labelButton}>Admin Area</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.labelButton}>User Area</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { token: state.auth.token, role: state.auth.role }
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    area: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: "#0085fa",
        height: 35,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 7,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 15 },
        shadowOpacity: 0.8,
        elevation: 8,
        marginLeft: 5,
        marginRight: 5
    },
    labelButton: {
        color: "white",
        fontSize: 20
    },
})