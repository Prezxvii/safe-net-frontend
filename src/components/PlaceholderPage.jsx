import React from 'react';
import { Container, Typography, Box } from '@mui/material';

/**
 * Reusable component for creating simple placeholder pages (e.g., for Nav links).
 */
const PlaceholderPage = ({ title, message }) => {
  return (
    <Box sx={{ minHeight: '80vh', py: 12 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          fontWeight={700}
          color="primary.main" 
          gutterBottom
        >
          {title}
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          color="text.secondary" 
          sx={{ mb: 4 }}
        >
          {message}
        </Typography>

        <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', border: '1px solid #eee', borderRadius: '8px' }}>
             <Typography variant="body1" color="text.primary">
                **Development Note:** This page is a placeholder. Content development will begin after the core API logic is established.
             </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PlaceholderPage;