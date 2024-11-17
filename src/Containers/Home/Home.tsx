import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllContacts, selectFetchContactLoading } from '../../store/slices/contactsSlice.ts';
import Spinner from '../../Components/UI/Spinner/Spinner.tsx';
import { fetchContacts } from '../../store/thunks/contact/contactThunks.ts';
import ContactModal from '../../Components/ContactDetails/ContactDetails.tsx';

const Home = () => {
  const fetchLoading = useAppSelector(selectFetchContactLoading);
  const allContacts = useAppSelector(selectAllContacts);
  const dispatch = useAppDispatch();

  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <>
      <h1 className="text-center mb-5">All contacts</h1>
      {fetchLoading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner />
        </div>
      ) : (
        <>
          {allContacts.length === 0 ? (
            <p>No contacts</p>
          ) : (
            <>
              {allContacts.slice().reverse().map((contact) => (
                <div
                  className="card w-25 mx-auto mb-3"
                  key={contact.id}
                  onClick={() => handleContactClick(contact)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body d-flex align-items-center">
                    <img
                      className="me-5"
                      src={contact.photo}
                      alt={contact.name}
                      style={{
                        width: '75px',
                        height: '75px',
                        borderRadius: '100%',
                      }}
                    />
                    <h5 className="card-title">{contact.name}</h5>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
      {isModalOpen && selectedContact && (
        <ContactModal contact={selectedContact} onClose={closeModal} />
      )}
    </>
  );
};

export default Home;
