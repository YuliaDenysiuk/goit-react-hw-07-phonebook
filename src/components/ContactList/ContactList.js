import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {contactsActions} from 'redux/contacts';
import s from './ContactList.module.css';

const getFilteredContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
}

function ContactList() { 
  const contacts = useSelector(({contacts: {items, filter}}) => getFilteredContacts(items, filter));
  const dispatch = useDispatch();

  const onDeleteContact = id => (dispatch(contactsActions.deleteContact(id)));

  return (
    <ul className={s.contacts}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.contacts__item}>
          {name}: {number}
          <button type="button" className={s.contacts__button} onClick={() => onDeleteContact(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactList;
