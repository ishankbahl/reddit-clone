import axios from "axios";
import { Actions } from "react-native-router-flux";
import FormData from "form-data";

import cosmicConfig from "../../config/cosmic";
import { clear } from "./posts";

// Constants
const CREATE_USER = "CREATE_USER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Action Creators
const createUser = user => ({ type: CREATE_USER, user });
const login = user => ({ type: LOGIN, user });
const logout = () => ({ type: LOGOUT });

// Reducer
export default (user = {}, action) => {
    switch (action.type) {
        case CREATE_USER:
            return action.user;
        case LOGIN:
            return action.user;
        case LOGOUT:
            return {};
        default:
            return user;
    }
};

// Helper Function
const formatData = data => ({
    name: data.object.metadata.name,
    username: data.object.metadata.username,
    profilePicture: data.object.metadata.profile_picture,
    id: data.object._id,
    slug: data.object.slug,
});

// dispatcher
export const addUser = user => dispatch => {
    let adata = new FormData();
    data.append("media", {
        uri: user.image,
        type: "image/jpeg",
        name: "image",
    });

    return axios.post(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/media`, data)
    .then(res => res.data.media)
    .then(media => {
        return axios.post(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/add-object`, {
            title: user.firstName + " " + user.lastName,
            type_slug: "users",
            metaFields: [
                {
                    key: "name",
                    type: "text",
                    value: user.firstName + " " + user.lastName
                },
                {
                    key: "username",
                    type: "text",
                    value: user.username,
                },
                {
                    key: "password",
                    type: "text",
                    value: user.password
                },
                {
                    key: "profile_picture",
                    type: "file",
                    value: media.name
                },
            ]
        })
    } )
    .then(res => formatUser(res.data))
    .then(formattedUser => dispatch(createUser(formattedUser)))
    .then(() => Actions.feed())
    .catch(err => console.error(`Creating user unsuccessful`, err))
};

export const authenticate = user => dispatch => {
    return axios.get(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/object-type/users/search?metafield_key=username&metafield_value=${user.username}`)
    .then(res => res.data )
    .then(data => {
        console.log("RESPONSE: ", data);
        if (data.objects) {
            const userData = data.objects[0];
            const { username, password, name, profile_picture } = this.userData.metadata;
            const { slug, _id } = this.userData;
            return {
                password,
                username,
                name,
                profilePicture: profile_picture,
                slug,
                id: _id
            };
        }
        else {
            return "Username invalid"
        }
    })
    .then(data => {
        const { password, name, username, profilePicture, slug, id } = data;

        if (data === "Username invalid"){
            return data;
        }
        else if (data.password === password ) {
            dispatch(login({
                name,
                username,
                profilePicture,
                slug,
                id,
            }));
        }
        else {
            return "Password Invalid";
        }
    })
    .catch(error => console.error("Login unsuccessful", error));
};

export const logoutUser = () => dispatch => {
    dispatch(logout());
    dispatch(clear());
    Actions.welcome();
};