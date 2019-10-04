import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING
} from '../types';

export default (state, action) => { //Reducers take 2 things, state and action. 
    switch(action.type){ //Here we ascertain what is in the type.
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
       case SET_LOADING:
           return { //We use ellipses because we cant just reassign the state. 
               ...state,
               loading: true
           }
        default:
            return state;
    }
}