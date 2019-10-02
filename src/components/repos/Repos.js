//This file is supposed to be simple. This is to map the files passed in.

import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem'


const Repos = ({repos}) => { //This is a proptype so we check proptypes below.
    return repos.map(repo => <RepoItem repo={repo} key={repo.id}/>)
}

Repos.propTypes = {
repos: PropTypes.array.isRequired
}

export default Repos
