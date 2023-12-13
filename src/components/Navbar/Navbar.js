import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
            <img
        src={process.env.PUBLIC_URL + '/ttlogo.png'} // Replace with the actual path to your image
        alt="Logo"
        className="logo"
      />
      <div>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/product">Product</Link>
        <Link to="/signin">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;