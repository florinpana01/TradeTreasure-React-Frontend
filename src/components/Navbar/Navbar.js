import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { auth } from '../../firebase';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <nav>
      <img
        src={process.env.PUBLIC_URL + '/ttlogo.png'}
        alt="Logo"
        className="logo"
      />
      <div>
        <Link to="/">Home</Link>
        {/* <Link to="/profile">Profile</Link> */}
        <Link to="/product">Product</Link>
        {user ? (
          <Link to="/profile">Profile</Link>
        ):("")}
        {user ? (
          <Link to="/signin" onClick={() => auth.signOut()}>Sign Out</Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
