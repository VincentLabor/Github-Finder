import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT,SET_LOADING
} from '../types';

const AlertState = props => { //This is our global state for the application. 
    const initialState = null;
    const [state, dispatch] = useReducer(AlertReducer, initialState)

    //Set Alert
    const setAlert = (msg, type) => {
        dispatch({
            type:SET_ALERT,
            payload: {msg,type}
        })

        setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000);

      }

    //Set Loading

    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }

    //Below is the functions provided from above.
    return <AlertContext.Provider
        value={{
            alert: state, //state
            setAlert //state

        }}>
        {props.children}

    </AlertContext.Provider>
}

export default AlertState;