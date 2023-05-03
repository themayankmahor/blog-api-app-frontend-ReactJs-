import { privateAxios } from "./Helper"
import { myAxios } from "./Helper";

//create Post
export const createPost = (postData) =>
{
    
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData).then((response) => response.data);
}

//get all posts
export const loadAllPosts = (pageNumber, pageSize) =>
{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => response.data);
}

//get single post of given ID
export const loadPost = (postId) =>
{
    return myAxios.get(`/posts/${postId}`).then((response) => response.data);
}

//create comment
export const createComment = (comment, postId) =>{

    return privateAxios.post(`/post/${postId}/comments`, comment);
}

//upload post image
export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`/post/image/upload/${postId}`, formData, {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    }).then((response) => response.data);
}

//get post sorted by categories
export const loadPostSortedByCategory = (categoryId) =>{

    return privateAxios.get(`/category/${categoryId}/posts`).then((response) => response.data);
}

export const loadPostByUser = (userId) =>
{
    return privateAxios.get(`/user/${userId}/posts`).then(response => response.data);
}

//delete post
export const deletePostByUser = (postId) =>
{
    return privateAxios.delete(`/posts/${postId}`).then(response => response.data);
}

//update post
export const updatePostService = (post, postId) => 
{
    return privateAxios.put(`/posts/${postId}`, post).then(response => response.data);
}