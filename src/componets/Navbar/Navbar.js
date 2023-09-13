import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import { FaWrench, FaTimes, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MechProjects
            <FaWrench />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            {click ? <FaTimes color='white' /> : <FaBars color='white' />}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/posts' className='nav-links' onClick={closeMobileMenu}>
                Projects
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/aboutUs'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
