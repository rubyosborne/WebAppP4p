import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componets/Navbar/Navbar';
import Home from './componets/Home/Home';
import AboutUs from './componets/About us/AboutUs';
import Main from './componets/main';
import Auth from './componets/auth';


function AppContent({ currentUser }) {
    const location = useLocation();
  
    return (
      <>
        {location.pathname !== "/auth" && <Navbar />}
        <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/main" element={currentUser ? <Main /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!currentUser ? <Auth /> : <Navigate to="/main" />} />
        </Routes>
      </>
    );
}

  export default AppContent;
