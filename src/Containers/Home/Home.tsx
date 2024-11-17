import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllContacts, selectFetchContactLoading } from '../../store/slices/contactsSlice.ts';
import Spinner from '../../Components/UI/Spinner/Spinner.tsx';
import { fetchContacts } from '../../store/thunks/contact/contactThunks.ts';

const Home = () => {
  const fetchLoading = useAppSelector(selectFetchContactLoading);
  const allContacts = useAppSelector(selectAllContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  return (
    <>
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
              {allContacts.map((contact) => (
                <div className="card w-25 mx-auto mb-3" key={contact.id}>
                  <div className="card-body d-flex align-items-center">
                    <img className="me-5" src={contact.photo} alt={contact.name} style={{width: "75px", height: "75px", borderRadius: "100%"}}/>
                    <h5 className="card-title">{contact.name}</h5>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;