import React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Box,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion'; 

const faqData = [
  {
    id: 'faq-1',
    question: 'What is the Content Blocker App?',
    answer: 'It is an AI-powered tool designed to classify text, keywords, and URLs for safety. It provides a safety score (out of 10) and a category (Safe, Warning, or Blocked) based on the content analysis.',
  },
  {
    id: 'faq-2',
    question: 'How is the Safety Score calculated?',
    answer: 'The safety score is calculated by a large language model (LLM) that assesses various risk factors, including toxicity, profanity, hate speech, and self-harm. A score of 10.0 is completely safe, while a score near 0.0 indicates highly unsafe content.',
  },
  {
    id: 'faq-3',
    question: 'What is the difference between Warning and Blocked?',
    answer: 'A "Warning" classification means the content contains moderate risks (e.g., mild profanity or questionable context) and may need review. "Blocked" means the content contains high-risk, explicit, or highly toxic material and should be filtered or restricted.',
  },
  {
    id: 'faq-4',
    question: 'Is my data stored when I use the search?',
    answer: 'We do not permanently store the content you submit for classification. The content is sent to the LLM for analysis and is then discarded immediately after the result is returned.',
  },
  {
    id: 'faq-5',
    question: 'How can I report an inaccurate classification?',
    answer: 'If you believe a classification is inaccurate, please contact our support team with the exact text/URL submitted and the classification result. Our model is constantly being reviewed and improved.',
  },
];

const contentVariants = {
  open: { 
    opacity: 1, 
    height: "auto", 
    transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] 
    } 
  },
  collapsed: { 
    opacity: 0, 
    height: 0, 
    transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] 
    } 
  }
};

const MotionAccordion = motion(Accordion);

/**
 * FAQ Component using MUI Accordion for dropdown functionality with Framer Motion.
 */
const FAQ = () => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
        Frequently Asked Questions
      </Typography>
      
      {faqData.map((item, index) => (
        <MotionAccordion 
          key={item.id} 
          expanded={expanded === item.id} 
          onChange={handleChange(item.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          
          sx={{
            mt: 1,
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            border: expanded === item.id ? `1px solid ${theme.palette.primary.main}` : '1px solid #eee',
            '&:before': { 
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
            sx={{
              backgroundColor: expanded === item.id ? theme.palette.primary.light : theme.palette.background.paper,
            }}
          >
            <Typography variant="subtitle1" fontWeight={expanded === item.id ? 700 : 500}>
              {item.question}
            </Typography>
          </AccordionSummary>
          
          <AnimatePresence initial={false}>
            {expanded === item.id && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={contentVariants}
              >
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionAccordion>
      ))}
    </Box>
  );
};

export default FAQ;