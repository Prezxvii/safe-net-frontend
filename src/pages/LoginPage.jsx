import React from 'react';
import LoginCard from '../components/LoginCard'; // Import the new component

/**
 * Page component for the dedicated "/login" route.
 * Renders the LoginCard component.
 */
const LoginPage = () => {
  // The heavy lifting and styling are now contained within LoginCard
  return <LoginCard />;
};

export default LoginPage;