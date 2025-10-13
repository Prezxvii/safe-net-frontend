import React from 'react';
import { Container, Typography, Box, Divider, Grid, Paper } from '@mui/material';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GavelIcon from '@mui/icons-material/Gavel';

const safetyPillars = [
  {
    icon: GavelIcon,
    title: "1. Policy Adherence",
    description: "Strict alignment with globally recognized safety standards for filtering harmful content, including child safety and hate speech guidelines.",
  },
  {
    icon: ModelTrainingIcon,
    title: "2. Adversarial Training",
    description: "The model is continuously tested against adversarial examples to ensure robustness against prompt injection and malicious attempts to bypass filtering.",
  },
  {
    icon: TrendingUpIcon,
    title: "3. Real-time Calibration",
    description: "Utilizing a feedback loop from user reporting (optional) and proprietary datasets, the model is calibrated weekly to adapt to new terminology and emerging online threats.",
  },
];

/**
 * Page component for the dedicated "/safety-model" route.
 */
const SafetyModelPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      
      {/* --- Header --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center', textAlign: 'center' }}>
        <SecurityIcon sx={{ mr: 2, fontSize: 48, color: 'primary.main' }} />
        <Typography variant="h3" component="h1" fontWeight={700}>
          The SAFE-NET Safety Model
        </Typography>
      </Box>

      {/* --- Subheading/Introduction --- */}
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
        A deep dive into the technology, training, and ethical frameworks that power our highly accurate, LLM-based content classification engine.
      </Typography>

      <Divider sx={{ mb: 6 }} />

      {/* --- Section 1: Core Architecture --- */}
      <Box sx={{ mb: 8, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: 'secondary.main', mb: 3 }}>
          Core Architecture & Scoring
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
          Our classification is not based on simple keyword blocking. We leverage a high-performance **LLaMA-family model** via the OpenRouter platform, fine-tuned specifically for safety detection across multiple harm categories: **Toxicity, Self-Harm, Explicit Content, and Hate Speech.**
        </Typography>
        
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderLeftColor: 'primary.main', mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={700}>Safety Score Breakdown (0.0 to 10.0)</Typography>
            <Typography variant="body2" color="text.secondary">
                The score represents the confidence level of the model that the content is safe. Scores **above 7.0** are categorized as **Blocked**; scores **between 3.0 and 7.0** are **Warning**; scores **below 3.0** are **Safe**.
            </Typography>
        </Paper>
      </Box>

      {/* --- Section 2: Three Pillars of Protection --- */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" fontWeight={600} align="center" gutterBottom sx={{ color: 'secondary.main', mb: 5 }}>
          Our Three Pillars of Protection
        </Typography>
        <Grid container spacing={4}>
          {safetyPillars.map((pillar, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <pillar.icon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>{pillar.title}</Typography>
                <Typography variant="body1" color="text.secondary">{pillar.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Container>
  );
};

export default SafetyModelPage;