import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShieldIcon from '@mui/icons-material/Shield';
import { motion } from 'framer-motion'; 

const steps = [
  {
    icon: SearchIcon,
    title: "1. User Input & Request",
    description: "The user enters a URL, keyword, or block of text. This request is securely transmitted to our backend API endpoint.",
    color: 'text.primary',
  },
  {
    icon: AutoFixHighIcon,
    title: "2. AI Classification via OpenRouter",
    description: "Our server forwards the content to a pre-selected, fine-tuned model (e.g., Llama 3 via OpenRouter) which rapidly classifies the content across safety categories.",
    color: 'primary.main',
  },
  {
    icon: ShieldIcon,
    title: "3. Safety Decision & Action",
    description: "Based on the classification score and the user's customized sensitivity settings, the system either displays the content, flags it with a warning, or fully blocks access.",
    color: 'primary.main',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
    } 
  },
};

const MotionGrid = motion(Grid);

/**
 * HowItWorksSection Component.
 */
const HowItWorksSection = () => {
  return (
    <Box 
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      sx={{ 
        py: 12, 
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          align="center" 
          fontWeight={600}
          gutterBottom
          sx={{ mb: 8 }}
        >
          How Our Filtering AI Works
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <MotionGrid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              variants={itemVariants}
            >
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  height: '100%',
                  borderRight: { xs: 'none', md: index < steps.length - 1 ? '1px solid #eee' : 'none' }, 
                  borderBottom: { xs: index < steps.length - 1 ? '1px solid #eee' : 'none', md: 'none' },
                }}
              >
                <step.icon 
                  sx={{ fontSize: 48, color: step.color, mb: 2 }} 
                  aria-hidden="true" 
                />
                <Typography 
                  variant="h5" 
                  component="h3" 
                  fontWeight={600} 
                  gutterBottom
                >
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
              </Paper>
            </MotionGrid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;