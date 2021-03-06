import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://61a24087014e1900176de8a4.mockapi.io';

export const fetchContacts = createAsyncThunk(
    'contacts/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/contacts');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const addContact = createAsyncThunk(
    'contacts/add',
    async ({ name, number }, { getState, rejectWithValue }) => {
        try {
            const contact = {
                name,
                number,
            };
            const state = getState();
            const currentsContacts = state.contacts.items;

            if (currentsContacts.find(el => el.name === name)) {
                alert(`${name} is already in contacts`);
                return rejectWithValue();
            }

            const { data } = await axios.post('/contacts', contact);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const deleteContact = createAsyncThunk(
    'contacts/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/contacts/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
