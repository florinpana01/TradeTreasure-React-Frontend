import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <h1>Logo</h1>
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