import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; // Use React Router's Link

const navItems = [
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Safety Model', href: '/safety-model' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Resources', href: '/resources' },
];

/**
 * Header Component.
 */
const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}> 
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 2, md: 5 } }}>
        
        {/* 1. Logo/Name (Links to Home) */}
        <MuiLink component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0, fontWeight: 'bold', letterSpacing: 1 }}
          >
            SAFE-NET
          </Typography>
        </MuiLink>

        {/* 2. Centered Navigation Links */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 2, 
            mx: 'auto', 
            border: '1px solid #ddd',
            borderRadius: '50px', 
            p: '4px 16px' 
          }}
        >
          {navItems.map((item) => (
            <Button 
              key={item.name} 
              component={Link} // Use React Router Link
              to={item.href}
              sx={{ 
                color: 'black', 
                textTransform: 'none', 
                fontWeight: 600,
                px: 2 
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>

        {/* 3. Login/Signup Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/login"
            color="primary" 
            sx={{ textTransform: 'none', px: 3, fontWeight: 600 }}
          >
            Login
          </Button>
          
          <Button 
            variant="contained" 
            component={Link} 
            to="/signup"
            color="secondary"
            sx={{ textTransform: 'none', px: 3, fontWeight: 600 }}
          >
            Sign Up
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;