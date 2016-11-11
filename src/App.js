import React, { Component } from 'react';
import ContactList from './ContactList';
import Contact from './Contact';
import SearchBar from './SearchBar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Contact List!</h1>
        <SearchBar />
        <ContactList />
      </div>
    );
  }
}

export default App;
