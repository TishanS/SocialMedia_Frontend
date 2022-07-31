import { combineReducers } from "redux";
import postsreducer from './posts'
import authreducer from "./auth";

export const reducers =  combineReducers ({
    posts: postsreducer,
    auth: authreducer
})