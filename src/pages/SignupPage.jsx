import React from 'react';
import SignUpCard from '../components/SignUpCard'; // Import the new component

/**
 * Page component for the dedicated "/signup" route.
 * Renders the SignUpCard component.
 */
const SignupPage = () => {
  // The heavy lifting and styling are now contained within SignUpCard
  return <SignUpCard />;
};

export default SignupPage;