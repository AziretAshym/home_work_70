import React, { useEffect, useState } from 'react';
import { IContactForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAddContactLoading, selectAllContacts } from '../../store/slices/contactsSlice.ts';
import { addNewContact, editContact } from '../../store/thunks/contact/contactThunks.ts';
import Spinner from '../../Components/UI/Spinner/Spinner.tsx';
import { useNavigate, useParams } from 'react-router-dom';

const ContactsForm = () => {

  const initialStateToForm: IContactForm = {
    name: "",
    phone: "",
    email: "",
    photo: "",
  };
  const addLoading = useAppSelector(selectAddContactLoading);
  const allContacts = useAppSelector(selectAllContacts);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState<IContactForm>(initialStateToForm);

  useEffect(() => {
    if (id) {
      const contactToEdit = allContacts.find((c) => c.id === id);
      if (contactToEdit) {
        setContact({
          name: contactToEdit.name,
          phone: contactToEdit.phone,
          email: contactToEdit.email,
          photo: contactToEdit.photo,
        });
      }
    }
  }, [id, allContacts]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contact.name && contact.photo && contact.email && contact.phone) {
      if (id) {
        await dispatch(editContact({ id, contact }));
      } else {
        await dispatch(addNewContact({ ...contact }));
      }
      navigate('/contacts');
    } else {
      alert('All fields must be filled in!');
    }
  };

  return (
    <>
      <h2 className="text-center mb-4">{id ? 'Edit Contact' : 'Add New Contact'}</h2>
      <div className="d-flex justify-content-center my-3">{addLoading ? <Spinner /> : null}</div>
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
        <div className="d-flex align-items-center gap-5">
          <p>Photo preview:</p>
          <img
            src={contact.photo || 'https://i.pinimg.com/474x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg'}
            alt={contact.name}
            style={{ width: '100px', height: '100px', borderRadius: '100%' }}
            className="border"
          />
        </div>

        <button type="submit" className="btn btn-outline-primary" disabled={addLoading}>
          {id ? 'Save' : 'Add Contact'}
        </button>
      </form>
    </>
  );
};

export default ContactsForm;
