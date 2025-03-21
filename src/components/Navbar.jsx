import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      
      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false);
      }
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050A30] bg-opacity-95 backdrop-blur-sm">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={1500} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={user ? "/home" : "/"}>
              <h1 className="text-3xl font-bold text-white">Questor</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/home" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition duration-300">Home</Link>
              <Link to="/courses" className="text-blue-200 hover:text-white px-3 py-2 text-sm font-medium transition duration-300">Courses</Link>
              <a href="/feedback" className="text-blue-200 hover:text-white px-3 py-2 text-sm font-medium transition duration-300">Feedback</a>
              <a href="/chatwithai" className="text-blue-200 hover:text-white px-3 py-2 text-sm font-medium transition duration-300">Ai Assistant</a>
              <Link to="/contact" className="text-blue-200 hover:text-white px-3 py-2 text-sm font-medium transition duration-300">Contact</Link>
            </div>
          </div>
          
          {/* Sign in, Register, or Profile/Logout buttons */}
          <div className="hidden md:flex items-center">
            {loading ? (
              <div className="text-blue-200">Loading...</div>
            ) : user ? (
              <>
                <Link to="/userprofile" className="text-white underline hover:text-blue-200 px-4 py-2 text-sm font-medium transition duration-300">
                  {user.displayName || 'My Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-white underline hover:text-blue-200 px-4 py-2 text-sm font-medium transition duration-300">
                  Sign In
                </Link>
                <Link to="/register" className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300">
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900 bg-opacity-90 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/courses" className="text-blue-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Courses</Link>
            <a href="#" className="text-blue-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About Us</a>
            <a href="#" className="text-blue-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
            <Link to="/contact" className="text-blue-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-blue-800">
            <div className="flex flex-col px-5 space-y-2">
              {loading ? (
                <div className="text-blue-200">Loading...</div>
              ) : user ? (
                <>
                  <Link to="/userprofile" className="block w-full text-center px-4 py-2 text-sm font-medium text-white underline">
                    {user.displayName || 'My Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="block w-full text-center px-4 py-2 text-sm font-medium text-white underline">
                    Sign In
                  </Link>
                  <Link to="/register" className="block w-full text-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium text-white">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;