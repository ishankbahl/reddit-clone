import React from "react";
import {
    Text,
    Button,
    Icon,
    Right,
    Left,
    Header,
    Title,
    Body,
} from "native-base";

export default (props) => (
    <Header>
        <Left>
            <Button
                transparent
                onPress={ () => props.logout() }
            >
                <Text>Log Out</Text>
            </Button>
        </Left>
        <Body>
            <Title>Your Feed</Title>
        </Body>
        <Right>
            <Button
                transparent
                onPress={ () => props.refresh() }
            >
                <Icon name="refresh" />
            </Button>
        </Right>
    </Header>
);