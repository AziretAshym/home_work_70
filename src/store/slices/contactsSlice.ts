import { createSlice } from '@reduxjs/toolkit';
import { IContact } from '../../types';
import { addNewContact } from '../thunks/contact/contactThunks.ts';
import { RootState } from '../../app/store.ts';

interface contactsState {
  users: IContact[];
  loadings: {
    fetching: boolean;
    add: boolean;
  };
}

const initialState: contactsState = {
  users: [],
  loadings: {
    fetching: false,
    add: false,
  }
}

export const selectAddContactLoading = (state: RootState) => state.contacts.loadings.add
export const selectFetchContactLoading = (state: RootState) => state.contacts.loadings.fetching

export const contactsSlice = createSlice({
  name:'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewContact.pending, (state) => {
        state.loadings.add = true
      })
      .addCase(addNewContact.fulfilled, (state) => {
          state.loadings.add = false
        })
      .addCase(addNewContact.rejected, (state) => {
          state.loadings.add = false
        })


  }
});

export const contactsReducer = contactsSlice.reducer;
export const {} = contactsSlice.actions;
