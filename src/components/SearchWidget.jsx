import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  InputAdornment, 
  CircularProgress,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';

// --- CONFIGURATION ---
// Access the backend API URL securely from the client environment variables
// This variable MUST be prefixed with REACT_APP_ in a CRA project.
// We are using a relative path here, which is often correct for development,
// but for production, this should contain the full base URL (e.g., https://safe-net-server.onrender.com)
// The correct path will be appended in the fetch call below.
const CLASSIFY_API_BASE_URL = process.env.REACT_APP_CLASSIFY_API_URL || 'https://safe-net-server.onrender.com';

// Helper to determine MUI color based on safety category
const getColor = (category) => {
  // 👇 FIX APPLIED: Update logic to handle 'Safe' and 'Unsafe' from the model's new JSON response
  switch (category?.toLowerCase()) {
    case 'safe': return 'success';
    case 'unsafe': return 'error'; // Treat 'Unsafe' as the most severe (error/blocked)
    case 'warning': return 'warning';
    case 'blocked': return 'error';
    default: return 'info';
  }
};

// Helper function to safely parse and format the score
const formatSafetyScore = (score) => {
  const safeScore = parseFloat(score?.toString());
  if (isNaN(safeScore)) {
    return 'N/A';
  }
  return safeScore.toFixed(1);
};


/**
 * SearchWidget Component.
 * Now makes a request to a secure backend endpoint for classification.
 */
const SearchWidget = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  /**
   * Handles form submission.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    if (!query.trim()) {
      setError("Please enter text or a URL to check.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // ----------------------------------------------------------------
      // 🛑 FIX 1: The correct URL is the BASE_URL + the endpoint path '/api/classify'
      // The previous error (404 Not Found) occurred because the request was sent to the base URL (/)
      // ----------------------------------------------------------------
      const API_ENDPOINT = `${CLASSIFY_API_BASE_URL}/api/classify`;
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ----------------------------------------------------------------
        // 🛑 FIX 2: The backend expects the field 'text', not 'content'
        // The previous backend code defined the route parameter as const { text } = req.body;
        // ----------------------------------------------------------------
        body: JSON.stringify({ text: query }), // CHANGED 'content' to 'text'
      });

      if (!response.ok) {
        // Attempt to parse error data for better debugging
        let errorData = await response.text(); 
        try {
            errorData = JSON.parse(errorData);
        } catch (e) {
            // response was not JSON, use the raw text
        }
        
        const message = errorData.error || errorData.message || `Backend API error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      
      // The backend should now return structured data from the model: 
      // { classification: 'SAFE' | 'UNSAFE', text: string } - Note: The structure in the prompt is slightly different than 
      // the backend, but we'll try to map it. We'll use 'classification' as the category for now.
      
      // Adjust the data structure to fit the component's expectations for simplicity
      // The backend returns: { classification: 'SAFE' | 'UNSAFE', text: string }
      // The component expects: { category: 'SAFE' | 'UNSAFE', safety_score: number, reason: string }
      // Since the backend doesn't send score/reason, we'll map the minimal data.
      setResult({
          category: data.classification,
          // Placeholder values since the current backend doesn't return these
          safety_score: data.classification === 'SAFE' ? 10.0 : 0.0, 
          reason: `Classification based on original text: "${data.text}".`
      });

    } catch (err) {
      console.error('Classification error:', err);
      const errorMessage = err.message || 'Connection Error: Ensure your backend server is running.';
      setError(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResult(null);
  };

  return (
    <Box>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%' 
        }}
      >
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter keywords, a URL, or text to check for safety..."
          fullWidth
          disabled={loading}
          sx={{
            maxWidth: 600,
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              height: '60px',
              paddingRight: '10px',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: '2px',
              },
              '& fieldset': {
                borderColor: '#eee',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 1 }}>
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {query.length > 0 && !loading && (
                    <Button
                        onClick={handleClear}
                        sx={{ minWidth: 0, p: 0, mr: 1, color: 'text.secondary' }}
                    >
                        <CloseIcon fontSize="small" />
                    </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ 
                    height: '48px', 
                    borderRadius: '50px', 
                    px: 3, 
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Check'}
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Result Display Box */}
      {result && (
        <Alert
          // Pass the category from the model response
          severity={getColor(result.category)}
          iconMapping={{
            success: <CheckCircleIcon fontSize="inherit" />,
            warning: <WarningIcon fontSize="inherit" />,
            error: <BlockIcon fontSize="inherit" />,
          }}
          sx={{ 
            mt: 4, 
            maxWidth: 600, 
            mx: 'auto', 
            textAlign: 'left',
            borderRadius: '8px',
            border: `1px solid`,
            // Use the determined color for the border
            borderColor: (theme) => theme.palette[getColor(result.category)].main,
          }}
        >
          <Typography variant="body1" fontWeight={700}>
            {/* Display the category returned by the model */}
            {result.category} - Safety Score: {formatSafetyScore(result.safety_score)}/10.0
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Display the reason returned by the model */}
            **Reason:** {result.reason}
          </Typography>
        </Alert>
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchWidget;
