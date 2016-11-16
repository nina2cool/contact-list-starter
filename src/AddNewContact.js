import React from 'react';

const AddNewContact = (props) => {
  return (
    <form action="/" method="post">
          <input type="text" name="name" placeholder="enter name"/>
          <input type="text" name="occupation" placeholder="enter occupation"/>
          <input type="text" name="avatar" placeholder="enter avatar URL"/>
          <input type="submit" value="+ Add Contact"/>
      </form>

  );
}


export default AddNewContact;
