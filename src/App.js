import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  //Searching github users
  searchUsers = async term => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${term}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  //Clear Users
  clearUsers = () => {
    this.state.users.length > 0 && this.setState({ users: [] });
  };

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
