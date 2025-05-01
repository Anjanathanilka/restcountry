// /components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    if (username.trim()) {
      login({ name: username });
    }
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login to Countries App</Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;