import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CompensationRules from './components/CompensationRules';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ClaimFlow from './components/ClaimFlow';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <HowItWorks />
              <CompensationRules />
              <Testimonials />
              <FAQ />
            </>
          } />
          <Route path="/claim" element={<ClaimFlow />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
