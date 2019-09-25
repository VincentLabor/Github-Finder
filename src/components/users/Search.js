import React, { Component } from "react";
import PropTypes from 'prop-types'


class Search extends Component {
    state = {
        text: ''
    }


    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => { //We are attempting to send a prop back upwards towards app
        e.preventDefault(); //This prevents a link from being submitted.
        
        this.props.searchUsers(this.state.text); //we can call this where we embedded search on App.js
        this.setState({ text: '' })
    }

    render() {
        const {showClear, clearUsers} = this.props;
        const {text} = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Users"
                        value={text}
                        onChange={this.onChange} /* This is required if I want the entered text in the search bar to be part of the state.  */
                    />
                    <input type="submit" value="Search" className="btn-dark btn-block" />
                </form>
                {showClear && <div className="btn btn-light btn-block" onClick={clearUsers}>Clear</div>}

            </div>
        )
    }
}

export default Search