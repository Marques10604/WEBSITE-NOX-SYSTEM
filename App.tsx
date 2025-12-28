import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-x-hidden selection:bg-zinc-200 selection:text-black">
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      <UseCases />
      <Portfolio />
      <Footer />
    </div>
  );
};

export default App;