import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Services from '../components/Services';
import PopularCourses from '../components/PopularCourses';

const LandingPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If not authenticated, redirect to login
        navigate('/');
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div className="bg-[#050A30] min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <PopularCourses />
      <Footer />
    </div>
  );
};

export default LandingPage;