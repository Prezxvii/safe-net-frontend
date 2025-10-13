import React from 'react';
import { Container, Typography, Box, Divider, Grid, Button, Paper, Link } from '@mui/material';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';

const resourceCards = [
  {
    icon: DescriptionIcon,
    title: "Official API Documentation",
    description: "Detailed parameters, response structures, and examples for integrating the classification endpoint.",
    buttonText: "View Documentation",
    link: "#",
    color: 'primary.main',
  },
  {
    icon: CodeIcon,
    title: "SDKs & Code Examples",
    description: "Downloadable software development kits for Node.js, Python, and React integration.",
    buttonText: "Explore GitHub",
    link: "#",
    color: 'secondary.main',
  },
  {
    icon: StorageIcon,
    title: "Datasets & Benchmarks",
    description: "Access our public datasets and performance benchmarks compared to other open-source models.",
    buttonText: "Download Data",
    link: "#",
    color: 'text.secondary',
  },
];

/**
 * Page component for the dedicated "/resources" route.
 */
const ResourcesPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      
      {/* --- Header --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center', textAlign: 'center' }}>
        <DeveloperModeIcon sx={{ mr: 2, fontSize: 48, color: 'secondary.main' }} />
        <Typography variant="h3" component="h1" fontWeight={700}>
          Developer Resources
        </Typography>
      </Box>

      {/* --- Subheading/Introduction --- */}
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
        Everything you need to integrate SAFE-NET's content classification into your own apps, servers, or projects.
      </Typography>

      <Divider sx={{ mb: 6 }} />

      {/* --- Resource Cards --- */}
      <Grid container spacing={4} justifyContent="center">
        {resourceCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              elevation={1} 
              sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px' }}
            >
              <Box sx={{ mb: 2 }}>
                <card.icon sx={{ fontSize: 48, color: card.color, mb: 1 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>{card.title}</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1, mb: 3 }}>
                {card.description}
              </Typography>
              <Button 
                variant="outlined" 
                color="secondary"
                href={card.link}
                target="_blank"
                fullWidth
              >
                {card.buttonText}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* --- Contact / Support CTA --- */}
      <Box sx={{ mt: 10, textAlign: 'center', maxWidth: 800, mx: 'auto', p: 4, bgcolor: 'background.paper', borderRadius: '8px' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Need Enterprise Support?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          For high-volume integration, custom LLM fine-tuning, or direct support, please contact our enterprise team.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link}
          to="/contact" 
        >
          Request Enterprise Access
        </Button>
      </Box>

    </Container>
  );
};

export default ResourcesPage;