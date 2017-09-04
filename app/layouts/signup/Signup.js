import React, { Component } from "react";
import { connect } from "react-redux";
import { ImagePicker } from "expo";
import { Actions } from "react-native-router-flux";
import { View } from "react-native";
import {
    Container,
    Content,
    Button,
    Text,
    Thumbnail,
    Icon,
    Form
} from "native-base";
import axios from "axios";

import TextField from "../../components/TextField";
import styles from "./styles";
import { addUser } from "../../redux/reducers/users";
import cosmicConfig from "../../config/cosmic";

const mapDispatchToProps = { addUser };

const validate = (form) => {
    let errorMessage = "";

    if (form.username.includes(" ")) {
        errorMessage = "Username cannot contain spaces";
    }
    if (form.password.includes(" ")){
        errorMessage = "Password cannot contain spaces";
    }
    Object.keys(form).slice(0, 5).map(field => {
        if (!form[field]){
            errorMessage = "All fields must be filled";
        }
    });

    return errorMessage;
};

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            image: null,
            error: "",
        }
    }

    onSubmit(){
        const error = validate(this.state);

        if (error) {
            this.setState({ error });
        }
        else {
            this.checkUsername(this.state.username);
        }
    }

    checkUsername(username) {
        axios.get(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/object-type/users/search?metafield_key=username&metafield_value=${username}`)
        .then(res => res.data)
        .then(data => {
            if (data.objects) {
                this.setState({ error: "Username not available" });
            }
            else {
                this.props.addUser(this.state);
            }
        })
    }

    uploadImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    render() {
        const { firstName, lastName, username, password, image, error } = this.state; 

        return (
            <Container style={styles.container}>
                <Content>
                    <Form styles={ styles.mar10 } >
                        <TextField
                            name="First Name"
                            value={ firstName }
                            onChangeText={ (text) => this.setState({ firstName: text }) }
                        />
                        <TextField 
                            name="Last Name"
                            value={ lastName }
                            onChangeText={ (text) => this.setState({ lastName: text }) }
                        />
                        <TextField 
                            name="Username"
                            value={ username }
                            onChangeText={ (text) => this.setState({ username: text }) }
                        />
                        <TextField
                            secureTextEntry 
                            name="Password"
                            value={ password }
                            onChangeText={ (text) => this.setState({ password: text }) }
                        />
                    </Form>
                    <Text style={ styles.addPick } >Add a profile picture</Text>
                    {
                        !image &&
                        <Button
                            primary
                            bordered
                            onPress={ this.uploadImage }
                            style={ styles.uploadButton }
                        >
                            <Icon
                                ios="ios-camera"
                                android="md-camera"
                            />
                        </Button>
                    }
                    {
                        image &&
                        <Thumbnail 
                            size={ 80 }
                            source={{ uri: image }}
                            style={ styles.thumbnail }
                        />
                    }
                    <Button
                        block
                        style={ styles.mar10 }
                        onPress={() => this.onSubmit() }
                    >
                        <Text>Create Account</Text>
                    </Button>
                    <Text style={ style.formMsg }>{ error }</Text>
                    <Button
                        transparent
                        style={ styles.loginBtn }
                        onPress={ () => Actions.login() }
                    >
                        <Text style={ styles.loginTxt } >Already have an account?</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default connect(null, mapDispatchToProps)(Signup);