import { useEffect, useState} from "react";
import { Auth } from "./componets/auth";
import { Main } from "./componets/main"
import { db, auth, storage } from "./config/firebase" 

import {ref, uploadBytes} from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
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

  

  return <div>{currentUser ? <Main /> : <Auth />}</div>;
      
 
}

export default App;