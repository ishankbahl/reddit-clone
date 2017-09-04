import React from "react";
import {
    Container,
    Content,
    Icon,
    Text,
    Button,
} from "native-base";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";

import styles from "./styles";

export default () => (
    <Container style={ styles.container } >
        <Content>
            <View style={ styles.iconBox } >
                <Icon 
                    style={ styles.icon }
                    ios="ios-happy-outline"
                    android="md-happy"
                />
                <Text style={ styles.welcome } >Welcome</Text>
            </View>
            <View style={ styles.buttonContainer }>
                <Button
                    block
                    styles={ styles.button }
                    onPress={ () => Actions.login() }
                >
                    <Text>Log In</Text>
                </Button>
                <Text style={ styles.or } >OR</Text>
                <Button
                    block
                    style={ styles.button }
                    onPress={ () => Actions.signup() }
                >
                    <Text>Sign Up</Text>
                </Button>
            </View>
        </Content>
    </Container>
);