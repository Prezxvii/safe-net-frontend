import { createTheme } from '@mui/material/styles';

// Define the core Cyan color for easy reference
const CYAN_ACCENT = '#00BCD4'; // A vibrant Cyan/Light Blue

/**
 * Custom Material UI Theme Configuration (Monochromatic with Cyan Accent).
 */
const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: CYAN_ACCENT, // The vibrant Cyan accent color
      light: '#4FF1FF', 
      dark: '#008394',
      contrastText: '#FFFFFF', 
    },
    secondary: {
      main: '#000000', // Black
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF', 
      paper: '#F5F5F5', 
    },
    text: {
      primary: '#000000', 
      secondary: '#666666', 
    },
  },
  typography: {
    fontFamily: [
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Roboto',
    ].join(','),
    h2: {
      fontWeight: 600, 
      fontSize: '4rem', 
    },
    h5: {
      fontWeight: 400,
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: '#000000', 
        },
      },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '50px',
            },
            outlined: {
                borderColor: '#000000',
                color: '#000000',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderColor: '#000000',
                }
            },
            contained: {
                backgroundColor: '#000000',
                color: '#FFFFFF',
                '&:hover': {
                    backgroundColor: '#333333',
                }
            }
        }
    }
  }
});

export default theme;