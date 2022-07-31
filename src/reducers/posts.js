
import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, COMMENT, START_LOADING, END_LOADING } from '../Constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {

    switch (action.type) {

        case START_LOADING:
            return { ...state, isLoading: true }

        case END_LOADING:
            return { ...state, isLoading: false }

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case FETCH_POST:
            console.log("Reducer")
            return { ...state, post: action.payload.post };

        case FETCH_BY_SEARCH:
            console.log("Reducer")
            return { ...state, posts: action.payload.data };

        case CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };

        case UPDATE_POST:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

        case LIKE_POST:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter((post) => (post._id !== action.payload)) };
        default:
            return state;
    }
}