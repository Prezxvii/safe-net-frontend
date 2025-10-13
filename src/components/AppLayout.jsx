import React from 'react';
import { Box } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer'; 

/**
 * AppLayout Component.
 * The central layout wrapper for the entire application.
 */
const AppLayout = ({ children }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Header />

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Footer /> 
    </Box>
  );
};

export default AppLayout;