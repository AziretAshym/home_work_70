import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../types';
import { addNewContact, deleteContact, fetchContacts } from '../thunks/contact/contactThunks.ts';
import { RootState } from '../../app/store.ts';

interface contactsState {
  users: IContact[];
  loadings: {
    add: boolean;
    fetching: boolean;
  };
}

const initialState: contactsState = {
  users: [],
  loadings: {
    add: false,
    fetching: false,
  }
}

export const selectAddContactLoading = (state: RootState) => state.contacts.loadings.add;
export const selectFetchContactLoading = (state: RootState) => state.contacts.loadings.fetching;
export const selectAllContacts = (state: RootState) => state.contacts.users;

const contactsSlice = createSlice({
  name:'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewContact.pending, (state) => {
        state.loadings.add = true;
      })
      .addCase(addNewContact.fulfilled, (state) => {
        state.loadings.add = false;
      })
      .addCase(addNewContact.rejected, (state) => {
        state.loadings.add = false;
      })

      .addCase(fetchContacts.pending, (state) => {
        state.loadings.fetching = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<IContact[]>) => {
        state.loadings.fetching = false;
        state.users = action.payload
      })
      .addCase(fetchContacts.rejected, (state) => {
          state.loadings.fetching = false;
      })

      .addCase(deleteContact.pending, (state) => {
        state.loadings.add = true;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.loadings.add = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.loadings.add = false;
      })
  }
});

export const contactsReducer = contactsSlice.reducer;
export const {} = contactsSlice.actions;
