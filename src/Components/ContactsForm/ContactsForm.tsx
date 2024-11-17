import React, { useState } from 'react';
import { IContactForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAddContactLoading } from '../../store/slices/contactsSlice.ts';
import { addNewContact } from '../../store/thunks/contact/contactThunks.ts';
import Spinner from '../UI/Spinner/Spinner.tsx';
import { useNavigate } from 'react-router-dom';

const ContactsForm = () => {

  const initialStateToForm = {
    name: "",
    phone: "",
    email: "",
    photo: "",
  }

  const addLoading = useAppSelector(selectAddContactLoading);
  const dispatch =useAppDispatch();
  const [contact, setContact] =useState<IContactForm>(initialStateToForm);
  const navigate = useNavigate();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setContact(prevState => ({
      ...prevState,
      [name]: value,
    }))
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contact.name && contact.photo && contact.email && contact.phone) {
      await dispatch(addNewContact({...contact}));
      setContact(initialStateToForm);
      navigate('/contacts');
    } else {
      alert('All fields must be filled in!');
    }
  }

  return (
    <>
      <h2 className="text-center mb-4">Add new Contact</h2>
      <div className="d-flex justify-content-center my-3">{addLoading ? <Spinner/> : null}</div>
      <form className="w-50 mx-auto" onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={contact.name}
            onChange={onChangeInput}
            required
          />
          <span className="input-group-text bg-primary-subtle text-primary w-25 ps-5">Contact name</span>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            name="phone"
            value={contact.phone}
            onChange={onChangeInput}
            required
          />
          <span className="input-group-text bg-primary-subtle text-primary w-25 ps-5">Contact number</span>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={contact.email}
            onChange={onChangeInput}
            required
          />
          <span className="input-group-text bg-primary-subtle text-primary w-25 ps-5">Contact Email</span>
        </div>

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Photo URL"
            name="photo"
            value={contact.photo}
            onChange={onChangeInput}
            required
          />
          <span className="input-group-text bg-primary-subtle text-primary w-25 ps-5">Contact photo</span>
        </div>
        <button
          type={"submit"}
          className="btn btn-outline-primary"
          disabled={addLoading}
        >Add contact
        </button>
      </form>

    </>
  );
};

export default ContactsForm;