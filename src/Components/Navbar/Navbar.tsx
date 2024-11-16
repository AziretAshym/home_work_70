import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-primary-subtle mb-5">
        <div className="container-fluid">
          <a className="navbar-brand fs-1 ms-5 text-white">Contacts</a>
          <button className="btn btn-outline-primary me-5" type="button">Add new contact</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;