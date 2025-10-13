import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';

/**
 * MuiClientProviders Component.
 * Wraps the entire application to apply the custom Material UI theme
 * and reset CSS with CssBaseline.
 */
const MuiClientProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline resets browser default styles */}
      <CssBaseline /> 
      {children}
    </ThemeProvider>
  );
};

export default MuiClientProviders;