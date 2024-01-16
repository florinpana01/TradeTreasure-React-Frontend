import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { auth } from '../../firebase';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/users/email/${user.email}`);
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        // Fetch user data by email
        await fetchUserData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

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
        ) : ("")}
        {user ? (
          <Link to="/signin" onClick={() => auth.signOut()}>Sign Out</Link>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
        {userData && userData.role === 'admin' ? (
          <Link to="/admin">Admin Dashboard</Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
