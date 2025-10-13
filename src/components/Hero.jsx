import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SearchWidget from './SearchWidget'; 

/**
 * Hero Component.
 * Implements the centralized, high-impact typography with the SearchWidget.
 */
const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'center',
        textAlign: 'center',
        pt: 10, 
        pb: 8, 
        backgroundColor: 'background.default', 
      }}
    >
      <Container maxWidth="lg">
        
        <Typography
          variant="h2"
          component="h1"
          sx={{ 
            fontWeight: 600, 
            fontSize: { xs: '3rem', sm: '5rem', md: '6rem' }, 
            color: 'text.primary',
            lineHeight: 1.1,
          }}
        >
          Filtering <Box component="span" sx={{ fontWeight: 600, color: 'primary.main' }}>Content</Box>
        </Typography>

        <Typography
          variant="h2"
          component="h1"
          sx={{ 
            fontWeight: 600, 
            fontSize: { xs: '3rem', sm: '5rem', md: '6rem' }, 
            color: 'text.primary',
            mb: 6, 
            lineHeight: 1.1,
          }}
        >
          <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>with</Box> AI
        </Typography>


        <Container maxWidth="sm">
            <Typography
            variant="h6"
            color="text.secondary" 
            sx={{ mb: 8, fontWeight: 300 }}
            >
            The next generation of online safety. Instantly scan URLs, text, and keywords with our AI engine to block inappropriate content and create a safer digital experience.
            </Typography>
        </Container>

        <SearchWidget />
        
      </Container>
    </Box>
  );
};

export default Hero;