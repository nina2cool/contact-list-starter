// NEW CODE

import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import NewContactForm from './AddNewContact'; //mine is called AddNewContact
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      contacts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/contacts')
      .then(resp => {
        this.setState({
          searchText: this.state.searchText,
          contacts: resp.data
        })
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  handleChange(event) {
    this.setState({
      contacts: this.state.contacts,
      searchText: event.target.value
    })
  }

  getFilteredContacts() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const contacts = this.state.contacts;

    // If our term is an empty string, we want to return all of the contacts
    if (!term) {
      return contacts;
    }

    // Filter will return a new array of contacts, the contacts will
    // be included in the array if the function returns true,
    // and excluded if the function returns false
    return contacts.filter(contact => {
      return contact.name.toLowerCase().search(term) >= 0 || contact.occupation.toLowerCase().search(term) >= 0;
    });
  }

  handleAddContact(attributes) {
    axios.post('http://localhost:3001/api/contacts', attributes)
      .then(resp => {
        this.setState(prev => {
          return {
            ...prev,
            contacts: [...prev.contacts, resp.data]
          };
        });
      })
      .catch(err => console.log(err));
  }

  handleDeleteContact(id) {
    console.log('delete', id);
    axios.delete(`http://localhost:3001/api/contacts/${id}`)
      .then(resp => {
        console.log('successfully deleted');

        const contacts = this.state.contacts.filter(contact => {
          return contact._id !== id;
        });

          this.setState(prev => {
            return {
              ...prev,
              // contacts: [...prev.contacts, resp.data]
              contacts: contacts
            };
          });
        })

      .catch(err => console.log(err));

}


  render() {
    return (
      <div className="App">
        <h1>My Contact App</h1>
        <hr></hr>
        <h3>Add a new contact:</h3>
        <NewContactForm onAdd={this.handleAddContact.bind(this)}/>
        <hr></hr>
        <h3>Search for a contact:</h3>
        <SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)}/>
        <hr></hr>
        <h3>Contact List</h3>
        <ContactList
          onDelete={this.handleDeleteContact.bind(this)} contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}

export default App;

// THIS IS MY CODE
//
// import React, {Component} from 'react';
// import axios from 'axios';
// import ContactList from './ContactList';
// import SearchBar from './SearchBar';
// import AddNewContact from './AddNewContact';
//
// class App extends Component {
//
//     constructor() {
//         console.log('constructor');
//         //debugger;
//         super();
//
//
//         this.state = {
//             searchText: '',
//             contacts: []
//         };
//
//
//     }
//
//     componentWillMount() {
//         console.log('componentWillMount');
//         //debugger;
//     }
//
//
//     handleSearchBarChange(event) {
//         this.setState({
//             contacts: this.state.contacts,
//             searchText: event.target.value
//         });
//     }
//
//
//     getFilteredContacts() {
//         //remove white space, change to lowercase
//         const term = this.state.searchText.trim().toLowerCase();
//         const contacts = this.state.contacts;
//
//         //if term is empty, then return all the contacts
//         if (!term) {
//             return contacts;
//         }
//
//         //use filter function to search thru the contacts - if there's a match, it will create a new array for those
//         //added an OR condition so you can search at the same time for either name or occupation
//         return contacts.filter(contact => {
//             return contact.name.toLowerCase().search(term) >= 0 || contact.occupation.toLowerCase().search(term) >= 0;
//         });
//
//     }
//
//
//     render() {
//         console.log('render');
//         //debugger;
//         return (
//
//           <div className="App" >
//           <h1>Contact List</h1>
//           < AddNewContact />
//           < SearchBar value={this.state.searchText}
//             onChange={this.handleSearchBarChange.bind(this)}/> < ContactList contacts={this.getFilteredContacts()}/></div>
//         );
//     }
//
//     componentDidMount() {
//         console.log('componentWillMount');
//         //debugger;
//
//         //this is the place to put the ajax call so we can re-render the state
//         // axios.get('https://limitless-bayou-36199.herokuapp.com/api/contacts')
//         axios.get('http://localhost:3001/api/contacts')
//         .then(resp => {
//           this.setState({
//             ...this.state,
//             contacts: resp.data
//           })
//         })
//         .catch(err => console.log(`Error! ${err}`));
//
//     }
//
//
// }
//
// export default App;
