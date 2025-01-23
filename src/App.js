import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Menu from './components/menu';
import Offcanvas from './components/offcanvas'; // Assuma que este é seu componente Offcanvas
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Routers from './routes/Routers';

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

  return (
    <div className={`App ${showSidebar ? 'sidebar-open' : ''}`}>
      <Router>
        {/* Renderiza o botão de menu e o Offcanvas no modo mobile */}
        {isMobile ? (
          <>
            <button className="menu-button" onClick={handleShow}>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" 
                alt="Menu Icon" 
                className="menu-icon"
              />
            </button>
            <Offcanvas show={showSidebar} handleClose={handleClose} />
            {/* Overlay para escurecer o fundo ao abrir a sidebar */}
            {showSidebar && <div className="sidebar-overlay" onClick={handleClose}></div>}
          </>
        ) : (
          <Menu /> // Renderiza a sidebar fixa no modo desktop
        )}
        <div className={`main-content ${showSidebar && isMobile ? 'blurred' : ''}`}>
          <Routers />
        </div>
      </Router>
    </div>
  );
}

export default App;
