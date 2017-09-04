import axios from "axios";

import cosmicConfig from "../../config/cosmic";

export const loadPosts =  () => dispatch => {
    return axios.get(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/object-type/posts`)
    .then((res) => res.data.objects ? formatPosts(res.data.objects) : [])
    .then((formattedPosts) => formattedPosts.sort(postSorter))
    .then(sortedPosts => dispatch(init(sortedPosts)))
    .catch(err => console.log("could not load posts", err));
};

export const createPost = post => dispatch => {
    return axios.post(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/object-type/posts`, {
        title: post.user.username + " post",
        type_slug: "posts",
        content: post.content,
        metaFields: [
            {
                type: "object",
                title: "User",
                key: "user",
                object_type: "users",
                value: post.user.id,
            },
        ],
    })
    .then(res => formatPosts(res.data, post))
    .then(formattedPost => dispatch(create(formattedPost)))
    .then(() => Actions.feed({ type: "popAndReplace" }))
    .catch(error => console.error("Post unsuccessful", error));
}