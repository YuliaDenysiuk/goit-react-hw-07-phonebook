import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';
import { filterContacts } from './contacts-actions';
import { fetchContacts, addContact, deleteContact } from './contacts-operations';

const items = createReducer([], {
    [fetchContacts.fulfilled]: (_, {payload}) => payload,
    [addContact.fulfilled]: (state, { payload }) => {
        if (state.find(el => el.name === payload.name)) {
            alert(`${payload.name} is already in contacts`)
            return;
        } else {
            return [payload, ...state];
        }
    },
    [deleteContact.fulfilled]: (state, {payload}) => state.filter(contact => contact.id !== payload),
});

const filter = createReducer('', {
    [filterContacts]: (_, { payload }) => payload,
});

const loading = createReducer(false, {    
    [fetchContacts.pending]: () => true,
    [fetchContacts.fulfilled]: () => false,
    [fetchContacts.rejected]: () => false,
    [addContact.pending]: () => true,
    [addContact.fulfilled]: () => false,
    [addContact.rejected]: () => false,
    [deleteContact.pending]: () => true,
    [deleteContact.fulfilled]: () => false,
    [deleteContact.rejected]: () => false,
})

export default combineReducers({
    items,
    filter,
    loading,
});
