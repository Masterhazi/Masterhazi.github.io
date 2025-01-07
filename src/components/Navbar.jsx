import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Navigated to:', pathname);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white-1000 bg-opacity-50 backdrop-blur-lg p-4 text-white fixed w-full z-10 top-0" style={{ cursor: 'default' }}>
      <div className="mx-auto text-center flex w-5/6 justify-between">
        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4 items-center text-sm">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="text-3xl sm:text-2xl font-extrabold">
          <a href="/">Haji Afrid</a>
        </div>
        <div className="hidden sm:flex space-x-4 items-center text-sm">
          <Link to="/projects">Projects</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button onClick={toggleMobileMenu} className="text-xl focus:outline-none">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-center z-50 ${
            isMobileMenuOpen ? 'flex flex-col items-center justify-center' : 'hidden'
          }`}
        >
          <button onClick={closeMobileMenu} className="text-xl absolute top-4 right-4 focus:outline-none">
            ✕
          </button>
          <ul className="font-medium text-2xl space-y-4">
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
            <li><Link to="/projects" onClick={closeMobileMenu}>Projects</Link></li>
            <li><Link to="/experience" onClick={closeMobileMenu}>Experience</Link></li>
            <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
