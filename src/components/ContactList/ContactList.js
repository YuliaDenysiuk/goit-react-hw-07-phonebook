import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {contactsSelectors, contactsOperations} from 'redux/contacts';
import s from './ContactList.module.css';
import { Loader } from 'components/Loader';

const getFilteredContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
};

function ContactList() {
  const isLoading = useSelector(contactsSelectors.isLoading);
  const contacts = useSelector(({contacts: {items, filter}}) => getFilteredContacts(items, filter));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => (dispatch(contactsOperations.deleteContact(id)));

  return (
  <>
    {isLoading && <Loader />}
    <ul className={s.contacts}>      
      {(contacts.length > 1) && (
        contacts.map(({ id, name, phone }) => (
        <li key={id} className={s.contacts__item}>
          {name}: {phone}
          <button type="button" className={s.contacts__button} onClick={() => onDeleteContact(id)}>Delete</button>
        </li>))
      )}
    </ul>
  </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactList;
