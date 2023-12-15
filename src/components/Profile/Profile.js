import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../../firebase';

const defaultTheme = createTheme();

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const history = useHistory();

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
      } else {
        // Redirect to the login page if the user is not logged in
        history.push('/signin');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [history, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <AccountCircleIcon />
          </Avatar>
          {userData ? (
            <>
              <Typography component="h1" variant="h5">
                {userData.firstName} {userData.lastName}'s Profile
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
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
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      I want to delete my account
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <p>Please log in to view this page.</p>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
