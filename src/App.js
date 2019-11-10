import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  // //Loading github users
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get('https://api.github.com/users');
  //   this.setState({ users: res.data, loading: false });
  // }

  //Searching github users
  searchUsers = async term => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${term}`
    );
    this.setState({ users: res.data.items, loading: false });
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
