import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {contactsActions} from 'redux/contacts';
import s from './Filter.module.css';

function Filter() {
  const value = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const onFilterChange = e => dispatch(contactsActions.filterContacts(e.target.value));

  return (
    <>
      <p className={s.filter}>Find contacts by name</p>
      <input
        type="text"
        className={s.filter__input}
        value={value}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        onChange={onFilterChange}
      />
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
};

export default Filter;
