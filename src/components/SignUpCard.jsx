import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Link as MuiLink,
  Divider,
  InputAdornment, 
  IconButton 
} from '@mui/material';
import { Link } from 'react-router-dom'; // Use React Router Link
import GoogleIcon from '@mui/icons-material/Google'; 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * SignUpCard Component.
 * The standalone, stylized registration form component.
 */
const SignUpCard = () => {
  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sign Up attempt with:', { name, email, password });
    // TODO: Integrate actual API registration fetch here
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh', 
        py: 4 
      }}
    >
      <Paper
        elevation={0}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: '90%', sm: 400 },
          p: 5, 
          textAlign: 'center',
          backgroundColor: 'background.default', 
          borderRadius: '16px',
          
          // Cyan Border and Blur/Glow Effect
          border: '2px solid',
          borderColor: 'primary.main', 
          boxShadow: (theme) => `0 0 15px 3px ${theme.palette.primary.main}30, 0 4px 10px rgba(0,0,0,0.05)`, 
        }}
      >
        {/* Title */}
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} sx={{ mt: 1, mb: 1 }}>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Join SAFE-NET to unlock custom parental controls.
        </Typography>

        {/* 1. Sign Up with Google */}
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<GoogleIcon />}
          color="secondary"
          sx={{ mb: 2, textTransform: 'none', borderRadius: '50px' }}
          onClick={() => console.log('Google sign up clicked')}
        >
          Sign Up with Google
        </Button>
        
        {/* Divider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                or
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
        </Box>

        {/* 2. Sign Up with Email Form */}
        <TextField
          label="Full Name"
          type="text"
          fullWidth
          required
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* PASSWORD FIELD */}
        <TextField
          label="Choose Password"
          type={showPassword ? 'text' : 'password'} 
          fullWidth
          required
          margin="normal"
          variant="outlined"
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  color="inherit"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          color="secondary" 
          sx={{ mt: 1, textTransform: 'none', borderRadius: '50px', fontWeight: 700 }}
        >
          Sign Up
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.primary">
            Already have an account? 
            <MuiLink component={Link} to="/login" color="primary.main" sx={{ ml: 0.5 }} underline="hover">
              Log In
            </MuiLink>
          </Typography>
        </Box>
        
      </Paper>
    </Box>
  );
};

export default SignUpCard;