import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Container,
    Content,
    Text,
    Button
} from "native-base";
import { View } from "react-native";

import TextField from "../../components/TextField";
import styles from "./styles";

import { createPosts } from "../../redux/reducers/posts";

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = { createPosts };

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            content: "",
            error: "",
        }
    }

    onSubmit() {
        const { content } = this.state;
        const { user, createPosts } = this.props;
        if (content) {
            createPosts({
                user,
                content,
            });
        }
        else {
            this.setState({ error: "You have to write something!" });
        }
    }

    render() {
        const { error, content } = this.state;

        return (
            <Container style={ styles.container } >
                <Content>
                    <Text style={ styles.formMsg } >{ error }</Text>
                    <View style={ styles.input } >
                        <TextField 
                            big
                            name="What's up?"
                            value={ content }
                            onChangeText={ (text) => this.setState({ content: text }) }
                        />
                        <Button
                            rounded
                            style={ styles.button }
                            onPress={ () => this.onSubmit() }
                        >
                            <Text>Post</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewPost);