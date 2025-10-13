import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; // Use React Router's Link
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const footerLinks = [
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Safety Model', href: '/safety-model' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Resources', href: '/resources' },
];

/**
 * Footer Component.
 */
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ 
        bgcolor: 'background.paper', 
        color: 'text.primary', 
        py: 6, 
        mt: 'auto',
        borderTop: '1px solid #ddd'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* 1. Brand and Copyright */}
          <Grid item xs={12} sm={4}> 
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              SAFE-NET
            </Typography>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} Safe-Net AI. All rights reserved.
            </Typography>
          </Grid>

          {/* 2. Navigation Links */}
          <Grid item xs={6} sm={4}> 
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {footerLinks.map((item) => (
                <MuiLink 
                  key={item.name} 
                  component={Link} // Use React Router Link
                  to={item.href}
                  color="text.secondary" 
                  underline="hover"
                  variant="body2"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  {item.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* 3. Legal and Social */}
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Legal & Connect
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <MuiLink component={Link} to="/privacy" color="text.secondary" underline="hover" variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} to="/terms" color="text.secondary" underline="hover" variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                Terms of Service
              </MuiLink>
            </Box>
            
            {/* Social Icons (using standard anchor tags for external links) */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <MuiLink href="#" target="_blank" color="text.primary" sx={{ '&:hover': { color: 'primary.main' } }}>
                <TwitterIcon />
              </MuiLink>
              <MuiLink href="#" target="_blank" color="text.primary" sx={{ '&:hover': { color: 'primary.main' } }}>
                <LinkedInIcon />
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;