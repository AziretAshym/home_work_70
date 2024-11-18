import React from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { deleteContact } from '../../store/thunks/contact/contactThunks.ts';
import { useNavigate } from 'react-router-dom';

const ContactDetails = ({ contact, onClose }) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  const handleDelete = async () => {
    await dispatch(deleteContact(contact.id));
    onClose();
  };

  const handleEdit = () => {
    navigate(`/contacts/${contact.id}`);
  };

  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >

        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{contact.name}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body d-flex align-items-center gap-5  ">
              <img
                src={contact.photo}
                alt={contact.name}
                style={{width: '10%', borderRadius: '10px'}}
                className="mb-3"
              />

              <div className="d-flex flex-column">
                <strong>Phone: <a href="#">{contact.phone}</a></strong>
                <strong>Email: <a href="#">{contact.email}</a></strong>

              </div>
            </div>


            <div className="modal-footer gap-3">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleEdit}
              >Edit</button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleDelete}
              >Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;