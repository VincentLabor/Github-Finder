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
    const getUser = async username => {
        setLoading();
        //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }



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
    const getUserRepos = async (username) => {
        setLoading();
        //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
      }



    //Clear users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    //Set Loading

    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }

    //Below is the functions provided from above.
    return <GithubContext.Provider
        value={{
            user: state.user, //state
            users: state.users, //state
            repos: state.repos, //state
            loading: state.loading, //state
            searchUsers, //function
            clearUsers, //function
            getUser, //function
            getUserRepos //function
        }}>
        {props.children}

    </GithubContext.Provider>
}

export default GithubState;