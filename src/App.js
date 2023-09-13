import { useEffect, useState} from "react";
import { Auth } from "./componets/auth";
import { Main } from "./componets/main"
import { db, auth, storage } from "./config/firebase" 

import {ref, uploadBytes} from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom';


import React from 'react';
import AccessAlarm from '@mui/icons-material/AccessAlarm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./componets/Home/Home"
import AboutUs from "./componets/About us/AboutUs"
import Navbar from "./componets/Navbar/Navbar"
import AppContent from '/Users/rubyosborne/Desktop/test/src/AppContent.js'
function App() {

  const [currentUser, setCurrentUser] = useState(null);

  
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

  

    return (
      <BrowserRouter>
        <AppContent currentUser={currentUser} />
      </BrowserRouter>
    );
  }
  
  export default App;