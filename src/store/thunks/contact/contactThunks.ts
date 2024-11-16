import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContactForm } from '../../../types';
import axiosApi from '../../../AxiosApi.ts';

export const addNewContact = createAsyncThunk<void, IContactForm>(
  'contacts/addNewContact',
  async (contactToAdd) => {
    await axiosApi.post('contacts.json', {...contactToAdd});
  }
)