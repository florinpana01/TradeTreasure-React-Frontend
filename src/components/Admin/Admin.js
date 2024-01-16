import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Admin.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import MenuItem from '@mui/material/MenuItem';

function Admin() {
    const auth = getAuth(); // Move the getAuth call to the beginning
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [newUser, setNewUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user', // Set 'user' as the default role
      allowExtraEmails: false,
    });
    console.log(userData);
  
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch('http://localhost:8001/api/users');
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
      
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8001/api/users/email/${user.email}`);
            if (response.ok) {
              const userData = await response.json();
              setUserData(userData);
              if (userData.role === 'admin') {
                await fetchUsers();
              } else {
                history.push('/');
              }
            } else {
              //console.error('Error fetching user data:', response.statusText);
            }
          } catch (error) {
            //console.error('Error fetching user data:', error);
          }
        };
      
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          console.log('Auth State Changed:', user);
      
          setUser(user);
      
          if (user) {
            // Fetch user data by email
            await fetchUserData();
          } else {
            history.push('/signin');
          }
        });
      
        return () => unsubscribe();
      }, [auth, history, user]);
      
      
      

  const handleNewUserChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      console.log(userCredential);
  
      // If successful, proceed with your existing user registration logic
      const response = await fetch('http://localhost:8001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        // User created successfully
        console.log('User created successfully');
  
        // Refresh the users list
        setUsers((prevUsers) => [...prevUsers, newUser]);
  
        // Reset the form fields
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'user',
          allowExtraEmails: false,
        });
      } else {
        // Handle errors
        console.error('Failed to create user');
        // Perform any additional error handling, such as showing an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  };  

  const theme = createTheme();

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2>Users List</h2>
        {users.map((user) => (
          <div key={user.id} className="user">
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Email address: {user.email}</p>
            <p>Followers: {user.followers}</p>
            {/* <Button variant="outlined" color="secondary" onClick={() => handleDeleteUser(user.email)}>
              Delete
            </Button> */}
          </div>
        ))}
      </div>
      <div className="admin-form">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create User
              </Typography>
              <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={newUser.firstName}
                      onChange={handleNewUserChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={newUser.lastName}
                      onChange={handleNewUserChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={newUser.email}
                      onChange={handleNewUserChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={newUser.password}
                      onChange={handleNewUserChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="role"
                      label="Role"
                      select
                      value={newUser.role}
                      onChange={handleNewUserChange}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create User
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Admin;
