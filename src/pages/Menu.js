import React, { useState } from 'react';
import '../styles/Menu.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <a href="#about" className="menu-link" onClick={toggleMenu}>About</a>
          <a href="#pricing" className="menu-link" onClick={toggleMenu}>Services &amp; Pricing</a>
          <a href="#projects-section" className="menu-link" onClick={toggleMenu}>Projects</a>
          <a href="#contact" className="menu-link" onClick={toggleMenu}>Contact</a>
        </nav>
      </div>
    </>
  );
}

export default Menu;