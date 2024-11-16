import React from "react";
import ContactsForm from './Components/ContactsForm/ContactsForm.tsx';
import Navbar from './Components/Navbar/Navbar.tsx';

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container">
        <ContactsForm />
      </div>;
    </>
  )
};

export default App;
