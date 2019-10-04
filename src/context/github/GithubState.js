import React, { useReducer } from 'react';
import axios from 'axios' //We will be making requests from here. 
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING
} from '../types';

const GithubState = props => { //This is our global state for the application. 
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    //Search user
    //Search Github users
    const searchUsers = async text => {
        setLoading();
        //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }
    //Get User
    //Get Repos
    //Clear users
    //Set Loading

    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }

    return <GithubContext.Provider
        value={{
            user: state.user,
            users: state.users,
            repos: state.repos,
            loading: state.loading,
            searchUsers
        }}>
        {props.children}

    </GithubContext.Provider>
}

export default GithubState;