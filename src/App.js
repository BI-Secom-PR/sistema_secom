import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Menu from './components/menu';
import OffcanvasMenu from './components/offcanvas'; // Assuma que este é seu componente Offcanvas
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Routers from './routes/Routers';
import { AuthProvider } from './routes/AuthContext';
import { useAuth } from './routes/AuthContext';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define o estado inicial
  const [showSidebar, setShowSidebar] = useState(false); // Controla a visibilidade da sidebar

  // Função para atualizar o estado com base no redimensionamento da janela
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setShowSidebar(false); // Fecha a sidebar se a tela voltar para desktop
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Controle do estado da sidebar
  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  //autenticação
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
    <div className={`App ${showSidebar ? 'sidebar-open' : ''}`}>
      <Router>
        {/* Renderiza o botão de menu e o Offcanvas no modo mobile */}
        {isAuthenticated && ( // Só mostra o menu se estiver autenticado
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
    </AuthProvider>
  );
}

export default App;
