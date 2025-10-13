import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MuiClientProviders from './components/MuiClientProviders';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter enables routing (for /faq, /how-it-works, etc.) */}
    <BrowserRouter>
      {/* MuiClientProviders applies the custom MUI theme and resets CSS */}
      <MuiClientProviders>
        <App />
      </MuiClientProviders>
    </BrowserRouter>
  </React.StrictMode>
);
