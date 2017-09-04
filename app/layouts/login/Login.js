import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Container,
    Content,
    Icon,
    Button,
    Text
} from "native-base";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";

import TextField from "../../components/TextField";
import styles from "./styles";
import { authenticate } from "../../redux/users";

const mapDispatchToProps = { authenticate };

const validate = form => {
    let errorMessage = "";
    if (form.username.includes(" ") || form.password.includes(" ")) {
        errorMessage = "Username and password cannot contain spaces";
    }
    if (form.username === "" || form.password === ""){
        errorMessage = "All fields must be filled";
    }
    return errorMessage;
}

class Login extends Components{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        };
    }

    onSubmit(){
        const error = validate(this.state);
        if (error) {
            this.setState({ error });
        }
        else {
            this.login();
        }
    }

    login(){
        this.props.authenticate(this.state)
        .then(res => {
            if (res === "Username invalid" || res === "Password invalid") {
                this.setState({
                    error: res,
                    username: "",
                    password: ""
                });
            }
            else {
                Actions.feed();
            }
        });
    }

    render() {
        const { username, password, error } = this.state;

        return (
            <Container style={ styles.container }>
                <Content>
                    <Text style={ style.formMsg }>{ error }</Text>
                    <Icon
                        style={ styles.icon }
                        ios="ios-happy-outline"
                        android="md-happy"
                    />
                    <View style={ styles.loginBox } >
                        <TextField 
                            name="Enter Username"
                            type="big"
                            value={ username }
                            onChangeText={ (text) => this.setState({ username: text }) }
                        />
                        <TextField
                            secureTextEntry 
                            name="Enter Password"
                            type="big"
                            value={ password }
                        />
                        <Button
                            block
                            style={ styles.button }
                            onPress={ () => this.onSubmit() }
                        >
                            <Text>Log In</Text>
                        </Button>
                    </View>
                    <Button 
                        transparent
                        style={ styles.signupBtn }
                        onPress={ () => Actions.signup() }
                    >
                        <Text style={ styles.signupTxt } >Signup foran account</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default connect(null, mapDispatchToProps)(Login);