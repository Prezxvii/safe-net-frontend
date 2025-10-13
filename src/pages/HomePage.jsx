import React from 'react';
import Hero from '../components/Hero';
import HowItWorksSection from '../components/HowItWorksSection'; 
import FAQ from '../components/FAQ'; 

/**
 * The default page component (home page).
 */
const HomePage = () => {
  return (
    <React.Fragment>
      <Hero />
      <HowItWorksSection />
      {/* We use the FAQ component directly on the homepage */}
      <FAQ />
    </React.Fragment>
  );
}

export default HomePage;