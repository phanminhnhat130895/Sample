import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { UserService } from '../services/user.service';
import styles from '../common/styles';

export default class UserProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: null,
            modalVisible: false
        }
    }

    onHandleChoosePhoto() {
        const options = {
            title: "Select Image",
        }
        ImagePicker.launchImageLibrary(options, response => {
            if(response.uri){
                this.setState({ photo: response })
            }
        })
    }

    onUploadImage() {
        UserService.onUploadImage(this.state.photo.data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    onToggleBigAvatar(value) {
        this.setState({ modalVisible: value })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.modalVisible == true 
                    ? 
                    (
                        <TouchableOpacity style={userProfileStyles.containerModal} onPress={() => this.onToggleBigAvatar(false)}>
                            <View style={userProfileStyles.containerModal}>
                                <Image source={{ uri: this.state.photo.uri }} style={userProfileStyles.avatarBig} />
                            </View>
                        </TouchableOpacity>
                    )
                    :
                    (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text>User Profile</Text>
                            <TouchableOpacity style={styles.button} onPress={() => this.onHandleChoosePhoto()}>
                                <Text style={styles.labelButton}>Choose Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onToggleBigAvatar(true)}>
                                {this.state.photo ?
                                    <Image source={{ uri: this.state.photo.uri }} style={userProfileStyles.avatar} />
                                    :
                                    <Image source={require('../images/noimage.png')} style={userProfileStyles.avatar} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.onUploadImage()}>
                                <Text style={styles.labelButton}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        )
    }
}

const userProfileStyles = StyleSheet.create({
    containerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%'
    },
    avatar: {
        width: 50, 
        height: 50, 
        marginTop: 10,
        borderRadius: 25
    },
    avatarBig: {
        width: '70%', 
        height: '80%'
    }
})