import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import HowItWorksSection from '../components/HowItWorksSection'; 
import TimelineIcon from '@mui/icons-material/Timeline';

/**
 * Page component for the dedicated "How It Works" route.
 */
export default function HowItWorksPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      
      {/* --- Page Header --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center', textAlign: 'center' }}>
        <TimelineIcon sx={{ mr: 2, fontSize: 48 }} color="primary" />
        <Typography variant="h3" component="h1" fontWeight={700}>
          Our Content Filtering Timeline
        </Typography>
      </Box>

      {/* --- Introduction/Detailed Context --- */}
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
        SAFE-NET&apos;s process is designed for speed and accuracy. Below is a detailed look at the three phases our AI model uses to classify content in milliseconds.
      </Typography>

      <Divider sx={{ mb: 6 }} />

      {/* --- CORE STEP-BY-STEP VISUALIZATION --- */}
      <HowItWorksSection /> 

      <Divider sx={{ my: 8 }} />

      {/* --- Advanced Detail Section --- */}
      <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
          The Power of Real-Time LLM Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Unlike simple keyword-based blockers, SAFE-NET utilizes a fine-tuned, multi-faceted Large Language Model (LLM) for semantic analysis. This allows us to understand **context, intent, and nuance**, drastically reducing false positives and improving protection against novel threats.
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          component="div" 
        >
          **Key advantages include:**
          <Box component="ul" sx={{ mt: 1, textAlign: 'left', px: { xs: 2, sm: 4 } }}>
            <li>**Contextual Scoring:** Identifying harm based on surrounding text, not just single words.</li>
            <li>**Multi-Language Support:** Core filtering logic is language-agnostic.</li>
            <li>**Adaptive Learning:** Continuous monitoring of threat data to update model performance.</li>
          </Box>
        </Typography>
      </Box>

    </Container>
  );
}