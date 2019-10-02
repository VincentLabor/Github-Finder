import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import About from './components/pages/About';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';


class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }
  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // } This layouts about 100 users. 

  //Search Github users
  searchUsers = async text => {
    this.setState({ loading: true })
    //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false }); //This is more specific and will leave out things like pagination
  }


  getUser = async (username) => {
    this.setState({ loading: true })
    //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false }); //This is more specific and will leave out things like pagination
  }

  getUserRepos = async (username) => {
    this.setState({ loading: true })
    //console.log(text); Now we will make a get query since we know that the text and search work pretty well.
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos: res.data, loading: false }); //This is more specific and will leave out things like pagination
  }



  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => { this.setState({ alert: null }) }, 5000);
  }

  render() {

    const { users, user, loading, alert, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>

              {/* Home Route */}
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />

              {/* About Route */}
              <Route
                exact path="/about" component={About}
              />

              <Route /* This will require fragment and etc because this is importing a component with state and other things aside form static made */
                exact path='/user/:login'
                render={props => (
                  <User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos = {repos}/>
                )}

              />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

