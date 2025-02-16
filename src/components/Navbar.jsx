import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
    console.log("Navigated to:", pathname);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-white bg-opacity-50 backdrop-blur-lg p-4 text-black fixed w-full z-10 top-0">
      <div className="mx-auto text-center flex w-5/6 justify-between">
        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4 items-center text-sm">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <Link to="/about" className="hover:text-gray-700">About</Link>
        </div>

        <div className="text-3xl sm:text-2xl font-extrabold">
          <a href="/">Haji Afrid</a>
        </div>

        <div className="hidden sm:flex space-x-4 items-center text-sm">
          <Link to="/projects" className="hover:text-gray-700">Projects</Link>
          <Link to="/experience" className="hover:text-gray-700">Experience</Link>
          <Link to="/contact" className="hover:text-gray-700">Contact</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="text-xl focus:outline-none" 
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 text-white flex flex-col items-center justify-center z-50">
          <button 
            onClick={closeMobileMenu} 
            className="text-2xl absolute top-5 right-5 focus:outline-none"
          >
            ✕
          </button>
          <ul className="font-medium text-2xl space-y-6 text-center">
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
            <li><Link to="/projects" onClick={closeMobileMenu}>Projects</Link></li>
            <li><Link to="/experience" onClick={closeMobileMenu}>Experience</Link></li>
            <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
