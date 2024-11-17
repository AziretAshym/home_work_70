import React from 'react';

const ContactDetails = ({ contact, onClose }) => {
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
              <h5 className="modal-title">{contact.name}</h5>
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

              <div>
                <p><strong>Phone:</strong> {contact.phone}</p>

                <p><strong>Email:</strong> {contact.email}</p>
              </div>
            </div>


            <div className="modal-footer gap-3">
              <button type="button" className="btn btn-outline-primary">Edit</button>
              <button type="button" className="btn btn-outline-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;