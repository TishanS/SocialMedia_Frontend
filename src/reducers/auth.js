// import {AUTH} from '../Constants/actionTypes';

// const authReducer = (state = { authData: null }, action) => {

//     switch (action.type) {
//       case AUTH:

//         // console.log(action?.data);

//         localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
//         return { ...state, authData: action.data, loading: false, errors: null };
        
        
//       case actionType.LOGOUT:
//         localStorage.clear();
//         return { ...state, authData: null, loading: false, errors: null };

//       default:
//         return state;
//     }
//   };
  
//   export default authReducer;


  import {AUTH, LOGOUT} from '../Constants/actionTypes';

  
const authReducer = (state = {authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      
    console.log("REDUCERS")
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

      return { ...state, authData: {...action.data}, loading: false, errors: null };

    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
      
    default:
      return state;
  }
};

export default authReducer;
