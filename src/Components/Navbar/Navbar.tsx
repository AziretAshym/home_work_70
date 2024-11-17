import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-primary-subtle mb-5">
        <div className="container-fluid">
          <NavLink to="/contacts" className="navbar-brand fs-1 ms-5 text-white">Contacts</NavLink>
          <NavLink to="/contacts/new-contact" className="btn btn-outline-primary me-5">Add new contact</NavLink>

        </div>
      </nav>
    </>
  );
};

export default Navbar;