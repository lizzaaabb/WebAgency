import React, { useState } from 'react';
import '../styles/Menu.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavigation = (page) => {
    // Method 1: Try immediate scroll to top, then navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close menu and navigate
    setIsOpen(false);
    if (window.navigateTo) {
      window.navigateTo(page);
    }
    
    // Method 2: Also try scrolling after navigation with longer delay
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
    
    // Method 3: Try without smooth behavior as backup
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 800);
  };
  
  return (
    <>
      <button
        className={`menu-toggle ${isOpen ? 'open' : ''}`}
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="menu-nav">
          <a
            href="#"
            className="menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('about');
            }}
          >
            About
          </a>
          <a
            href="#"
            className="menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('pricing');
            }}
          >
            Services &amp; Pricing
          </a>
          <a
            href="#"
            className="menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('projects');
            }}
          >
            Projects
          </a>
          <a
            href="#"
            className="menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('contact');
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}

export default Menu;
