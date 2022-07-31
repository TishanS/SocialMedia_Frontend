// import { AUTH } from '../Constants/actionTypes';
// import * as api from '../api/index.js';

// export const signin = (formData) => async (dispatch) => {
//   try {
//     const { data } = await api.signIn(formData);
   
//     console.log("ACTION")
//     dispatch({ type: AUTH, data });

//     // router('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signup = (formData) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);

//     dispatch({ type: AUTH, data });

//     // router('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

import { AUTH } from '../Constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("ACTION SignIN")
    dispatch({ type: AUTH, payload: data });
    // console.log(data);

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {

    console.log("ACTION SignUP")
    const { data } = await api.signUp(formData);
    
    console.log(data);
    dispatch({ type: AUTH, payload: data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};