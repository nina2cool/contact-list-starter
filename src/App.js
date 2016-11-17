import React, {Component} from 'react';
import axios from 'axios';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import AddNewContact from './AddNewContact';

class App extends Component {

    constructor() {
        console.log('constructor');
        //debugger;
        super();


        this.state = {
            searchText: '',
            contacts: []
        };


    }

    componentWillMount() {
        console.log('componentWillMount');
        //debugger;
    }


    handleSearchBarChange(event) {
        this.setState({
            contacts: this.state.contacts,
            searchText: event.target.value
        });
    }


    getFilteredContacts() {
        //remove white space, change to lowercase
        const term = this.state.searchText.trim().toLowerCase();
        const contacts = this.state.contacts;

        //if term is empty, then return all the contacts
        if (!term) {
            return contacts;
        }

        //use filter function to search thru the contacts - if there's a match, it will create a new array for those
        //added an OR condition so you can search at the same time for either name or occupation
        return contacts.filter(contact => {
            return contact.name.toLowerCase().search(term) >= 0 || contact.occupation.toLowerCase().search(term) >= 0;
        });

    }


    render() {
        console.log('render');
        //debugger;
        return (

          <div className="App" >
          <h1>Contact List</h1>
          < AddNewContact />
          < SearchBar value={this.state.searchText}
            onChange={this.handleSearchBarChange.bind(this)}/> < ContactList contacts={this.getFilteredContacts()}/></div>
        );
    }

    componentDidMount() {
        console.log('componentWillMount');
        //debugger;

        //this is the place to put the ajax call so we can re-render the state
        // axios.get('https://limitless-bayou-36199.herokuapp.com/api/contacts')
        axios.get('http://localhost:3001/api/contacts')
        .then(resp => {
          this.setState({
            ...this.state,
            contacts: resp.data
          })
        })
        .catch(err => console.log(`Error! ${err}`));

    }


}

export default App;
