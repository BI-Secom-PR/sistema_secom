import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Menu from './components/menu';
import OffcanvasMenu from './components/offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Routers from './routes/Routers';
import { AuthProvider } from './routes/AuthContext';
import { useAuth } from './routes/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Importe o ThemeProvider e useTheme

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme(); // Acesse o estado do tema

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  return (
    <div
      className={`App ${showSidebar ? 'sidebar-open' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', // Cor de fundo do App
        color: isDarkMode ? '#ffffff' : '#000000', // Cor do texto
        minHeight: '100vh', // Garante que o fundo cubra toda a tela
      }}
    >
      <Router>
        {isAuthenticated && (
          isMobile ? (
            <>
              <button className="menu-button" onClick={handleShow}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" 
                  alt="Menu Icon" 
                  className="menu-icon"
                />
              </button>
              <OffcanvasMenu show={showSidebar} handleClose={handleClose} />
              {showSidebar && <div className="sidebar-overlay" onClick={handleClose}></div>}
            </>
          ) : (
            <Menu />
          )
        )}
        <div className={`main-content ${showSidebar && isMobile ? 'blurred' : ''}`}>
          <Routers />
        </div>
      </Router>
    </div>
  );
}

function AppWrapper() {
  return (
    <ThemeProvider> {/* Envolva a aplicação com o ThemeProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppWrapper;