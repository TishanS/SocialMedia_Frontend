import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, COMMENT, START_LOADING, END_LOADING } from '../Constants/actionTypes';
import * as api from '../api/index'

//Action Creators (REDUX-THUNK MIDDLEWARE => Async operation)

export const getPosts = (page) => async (dispatch) =>{
    // const action = {type: 'FETCH_ALL', payload: [] }
    // dispatch(action);
    try {

        dispatch({ type: START_LOADING });
        const  { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
        // console.log("action");
        // console.log(data)
        // dispatch({ type: FETCH_ALL, payload: data});
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
    //   console.log("action!!");
        // console.log("post",data)
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

  
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        
      dispatch({ type: START_LOADING });
      console.log("action", searchQuery)
      const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
      console.log("SEARCH", data)
  
      dispatch({ type: FETCH_BY_SEARCH, payload: {data}  });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const createPost = (post, navigate) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.createPosts(post);
        dispatch({type: CREATE_POST, payload: data});


        navigate(`/posts/${data._id}`);
        // dispatch({ type: END_LOADING });
    } catch (error) {
         console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    
    try {
        const {data} = await api.updatePost(id, post);
       
        dispatch({type: UPDATE_POST, payload: data});
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) => {

    try {
        await api.deletePost(id)
        dispatch({type: DELETE_POST, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) =>{

    try {
        const {data} = await api.likePost(id);
        dispatch({type: LIKE_POST, payload: data});
        
    } catch (error) {
        console.log(error)
    }
}


export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);

      console.log(data)
  
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };



