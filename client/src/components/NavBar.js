import { useState } from 'react';
import './styles.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Review Roam</div>
      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Services</a>
        <a href="/">Contact</a>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;



