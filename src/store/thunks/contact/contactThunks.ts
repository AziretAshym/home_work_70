import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContact, IContactApi, IContactForm } from '../../../types';
import axiosApi from '../../../AxiosApi.ts';

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async (contact: IContactForm, { dispatch }) => {
    const response = await axiosApi.post('/contacts.json', contact);
    await dispatch(fetchContacts());
    return response.data;
  }
);

export const fetchContacts = createAsyncThunk<IContact[], void>(
  'contacts/fetchContacts',
  async () => {
    const response = await axiosApi.get<IContactApi | null>('contacts.json');

    if (response.data) {
      const contactsInObj = response.data;
      return Object.keys(contactsInObj).map((contactId) => {
        return {
          ...contactsInObj[contactId],
          id: contactId,
        };
      });
    }
    return [];
  }
);