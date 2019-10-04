import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import About from './components/pages/About';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';



const App = () => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // } This layouts about 100 users. 

  const getUser = async (username) => {
    setLoading(true);
    //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async (username) => {
    setLoading(true);
    //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }





  const showAlert = (msg, type) => {
    setAlert({ alert: { msg, type } });
    setTimeout(() => { setAlert({ alert: null }) }, 5000);
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>

              {/* Home Route */}
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search setAlert={showAlert} />
                  <Users />
                </Fragment>
              )} />

              {/* About Route */}
              <Route
                exact path="/about" component={About}
              />

              <Route /* This will require fragment and etc because this is importing a component with state and other things aside form static made */
                exact path='/user/:login'
                render={props => (
                  <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
                )}

              />

            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;

