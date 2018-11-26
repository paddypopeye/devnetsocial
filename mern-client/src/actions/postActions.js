import axios from 'axios';
import {ADD_POST, GET_POSTS, GET_POST,
  GET_ERRORS, DELETE_POST,
  POST_LOADING} from './types';

// Add Post
export const addPost = postData => dispatch => {
  //Create a post
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:((err||{}).response||{}).data
        ||{errors:'unexpected error'}
      })
    );
};//end addPost

// Delete Post
export const deletePost = (id) => dispatch => {
  //delete a post
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:((err||{}).response||{}).data
        ||{errors:'unexpected error'}
      })
    );
};//end delete post

//Get all posts
export const getPosts = postData => dispatch => {
  dispatch(setPostLoading); 
  //Create a post
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_POSTS,
        payload:{}
      })
    );
};//end getPosts

//Get a single post
export const getPost = id => dispatch => {
  dispatch(setPostLoading); 
  //Create a post
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_POST,
        payload:{}
      })
    );
};//end getPosts



//Set the loading state
export const setPostLoading = () => {
    return { 
      type: POST_LOADING
    }//end return
}//end setPostLoading

// Add Like
export const addLike = id => dispatch => {
  //Create a post
  axios
    .post(`/api/posts/like/${id}`)
    .then(res =>
      dispatch(getPosts())
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};//end addLike

// Remove Like
export const removeLike = id => dispatch => {
  //Create a post
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res =>
      dispatch(getPosts())
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:((err||{}).response||{}).data
        ||{errors:'unexpected error'}
      })
    );
};//end removeLike

// Add a Comment
export const addComment = (postId, commentData) => dispatch => {
  //Create a post
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        
      })
    );
};//end deleteComment

// Delete a Comment
export const deleteComment = (postId, commentId) => dispatch => {
  //Create a post
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        
      })
    );
};//end addComment