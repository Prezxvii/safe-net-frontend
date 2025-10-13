import React from 'react';
import { Container, Box, Typography, Divider, Button } from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import FAQ from '../components/FAQ'; 
import { Link } from 'react-router-dom';

/**
 * Page component for the dedicated "FAQ" route.
 */
export default function FAQPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      
      {/* --- Page Header --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center', textAlign: 'center' }}>
        <LiveHelpIcon sx={{ mr: 2, fontSize: 48 }} color="secondary" />
        <Typography variant="h3" component="h1" fontWeight={700}>
          Need Help? We&apos;ve Got Answers.
        </Typography>
      </Box>

      {/* --- Subheading/Introduction --- */}
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
        Find answers to the most common questions about our AI, data usage, safety settings, and troubleshooting tips.
      </Typography>

      <Divider sx={{ mb: 6 }} />

      {/* --- THE FULL FAQ COMPONENT --- */}
      <FAQ />

      {/* --- Additional Support Call-to-Action --- */}
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 10, textAlign: 'center', p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Can&apos;t find what you&apos;re looking for?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Our support team is ready to assist you.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          component={Link}
          to="/contact" // Assuming you create a /contact route
          sx={{ mt: 1 }}
        >
          Contact Support
        </Button>
      </Box>

    </Container>
  );
}