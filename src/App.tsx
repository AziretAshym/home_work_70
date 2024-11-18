import React from "react";
import ContactsForm from "./Containers/ContactsForm/ContactsForm.tsx";
import Navbar from "./Components/Navbar/Navbar.tsx";
import Home from "./Containers/Home/Home.tsx";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" replace />} />
          <Route path="/contacts" element={<Home />} />
          <Route path="/contacts/new-contact" element={<ContactsForm />} />
          <Route path="/contacts/:id" element={<ContactsForm />} />
          <Route
            path="*"
            element={<h1 className="text-center">Not Found</h1>}
          ></Route>
        </Routes>
      </div>
      ;
    </>
  );
};

export default App;
