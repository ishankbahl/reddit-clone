import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
    Container,
    Content,
    List,
    Text,
    Button,
    Icon,
} from "native-base";

import SinglePost from "../../components/SinglePost";
import FeedNavBar from "../../components/FeedNavBar";
import { loadPosts } from "../../redux/reducers/posts";
import { logoutUser } from "../../redux/users/users";
import styles from "./styles";

const mapStateToProps = ({ posts }) => ({ posts });

const mapDispatchToProps = { loadPosts, logoutUser };

const RenderPost = (post, index) => (
    <SinglePost 
        key={ index }
        name={ post.name }
        username={ post.username }
        profilePicture={ post.profilePicture }
        content={ post.content }
    />
);

class Feed extends Component {
    componentDidMount() {
        this.props.loadPosts();
    }

    render() {
        const { posts, logoutUser, loadPosts } = this.props;

        const endMsg = posts.length === 0 ? "There aren't any posts yet" : "That's all the posts for now";
        
        return (
            <Container>
                <FeedNavBar logout={ logoutUser } refresh={ loadPosts } />
                <Content>
                    <List>
                        {
                            posts.length && 
                            posts.map((post, index) => RenderPost(post, index))
                        }
                    </List>
                    <Text style={ styles.end } >{ endMsg }</Text>
                </Content>
                <Button
                    rounded
                    style={ styles.button }
                    onPress={ () => Actions.newPost() }
                >
                    <Icon
                        name="create"
                        style={{ padding: 5 }} 
                    />
                </Button>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);