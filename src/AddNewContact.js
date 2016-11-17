import React from 'react';

const AddNewContact = (props) => {
  return (
    <form action="http://localhost:3001/api/contacts" method="post">
          <input type="text" name="name" placeholder="enter name"/>
          <input type="text" name="occupation" placeholder="enter occupation"/>
          <input type="text" name="avatar" placeholder="enter avatar URL"/>
          <input type="submit" value="+ Add Contact"/>
      </form>

  );
}

AddNewContact.propTypes = {
  avatar: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  occupation: React.PropTypes.string.isRequired
}

export default AddNewContact;
