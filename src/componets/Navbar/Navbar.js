import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { FaWrench, FaTimes, FaBars } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';
import { signOut } from 'firebase/auth';
import { auth } from '/Users/rubyosborne/Desktop/test/src/config/firebase.js';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '/Users/rubyosborne/Desktop/test/src/config/firebase.js';
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
    const [click, setClick] = useState(false);
    const [unsubscribePH, setUnsubscribePH] = useState(null);
    const [unsubscribeEC, setUnsubscribeEC] = useState(null);
    const [unsubscribeTemp, setUnsubscribeTemp] = useState(null);
    const [unsubscribeairTemp, setUnsubscribeairTemp] = useState(null);
    const [unsubscribeLight, setUnsubscribeLight] = useState(null);
    const [unsubscribeHummidity, setUnsubscribeHummidity] = useState(null);
    const navigate = useNavigate();
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        // ... (the logic that sets up the unsubscribing functions from Main.js)

        return () => {
            // Cleanup logic
            unsubscribeEC && unsubscribeEC();
            unsubscribePH && unsubscribePH();
            unsubscribeTemp && unsubscribeTemp();
            unsubscribeairTemp && unsubscribeairTemp();
            unsubscribeLight && unsubscribeLight();
            unsubscribeHummidity && unsubscribeHummidity();
        };
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            unsubscribeEC && unsubscribeEC();
            unsubscribePH && unsubscribePH();
            unsubscribeTemp && unsubscribeTemp();
            unsubscribeairTemp && unsubscribeairTemp();
            unsubscribeLight && unsubscribeLight();
            unsubscribeHummidity && unsubscribeHummidity();
            navigate('/auth');
            console.log("unsubbed");
            
        } catch (err) {
            console.error(err);
        }
    };

       return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Eden
                        <BiLeaf />
                    </Link>
                    <div className="menu-items-container">
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? <FaTimes color='white' /> : <FaBars color='white' />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/main' className='nav-links' onClick={closeMobileMenu}>
                                    My Plants
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
                            <li className='nav-item'>
                                <div className='nav-links logout-button' onClick={logout}>
                                    Log Out
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
