import React from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * PageTransitionWrapper Component.
 * This component uses framer-motion's AnimatePresence to handle page transitions
 * using the current route key from React Router.
 */
const PageTransitionWrapper = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Box
                component={motion.div}
                key={location.pathname} // Keyed to the path for correct transitions
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                sx={{ width: '100%' }}
            >
                {children}
            </Box>
        </AnimatePresence>
    );
};

export default PageTransitionWrapper;