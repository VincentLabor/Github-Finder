import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

const App = () => {
  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // } This layouts about 100 users. 

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github Finder" icon="fab fa-github" />
            <div className="container">
              <Alert />
              <Switch>

                {/* Home Route */}
                <Route exact path="/" render={props => (
                  <Fragment>
                    <Search />
                    <Users />
                  </Fragment>
                )} />

                {/* About Route */}
                <Route
                  exact path="/about" component={About}
                />

                <Route /* This will require fragment and etc because this is importing a component with state and other things aside form static made */
                  exact path='/user/:login'
                  component={User}
                />

              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;

