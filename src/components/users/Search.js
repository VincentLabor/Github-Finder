import React, { useState, useContext } from "react";
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/github/githubContext';


const Search = () => { //These are props that come from appjs
    const alertContext = useContext(AlertContext);
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState("");

    const onChange = (e) => setText(e.target.value)

    const onSubmit = (e) => { //We are attempting to send a prop back upwards towards app
        e.preventDefault(); //This prevents a link from being submitted.
        if (text === '') {
            alertContext.setAlert('Please enter something', 'light')
        } else {
            githubContext.searchUsers(text); //we can call this where we embedded search on App.js
            setText("")
        }

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="text"
                    placeholder="Search Users"
                    value={text}
                    onChange={onChange} /* This is required if I want the entered text in the search bar to be part of the state.  */
                />
                <input type="submit" value="Search" className="btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>Clear</button>}
        </div>
    )
}

export default Search