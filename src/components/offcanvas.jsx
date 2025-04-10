import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { getMenuItems } from './menuItems';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi';

const OffcanvasMenu = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const theme = {
    background: isDarkMode ? '#2c2c2c' : '#ffffff',
    text: isDarkMode ? '#e6e6e6' : '#212529',
    textMuted: isDarkMode ? '#a0a0a0' : '#6c757d',
    border: isDarkMode ? '#2a2a4a' : '#dee2e6',
    secondary: isDarkMode ? '#e94560' : '#dc3545',
    darkModeButtonBg: isDarkMode ? '#1a3c66' : '#3b5bdb',
    darkModeButtonHover: isDarkMode ? '#194475' : '#2c4fe7',
  };

  const logout = () => {
    // Removendo dados do sessionStorage
    sessionStorage.removeItem('_role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('email');

    // Removendo dados do localStorage
    localStorage.removeItem('_role');
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    localStorage.removeItem('email');

    // Redirecionando para a página de login
    navigate('/login');
    window.location.reload();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop="true"
      className="custom-offcanvas"
      style={{ backgroundColor: theme.background }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ color: theme.text }}>
          <img
            src="https://logodownload.org/wp-content/uploads/2023/01/governo-federal-2023-logo-lula.png"
            alt="Logo Governo Federal"
            className="logo"
          />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <nav>
          <ul className="menu">
            {getMenuItems(isDarkMode).map((item, index) => (
              <Link
                className="nav-link lead"
                to={item.path}
                key={index}
                onClick={() => {
                  handleClose();
                  window.scrollTo(0, 0);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <li className="menu-item" style={{ color: theme.text }}>
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div 
          className="action-buttons-container" 
          style={{ 
            position: 'absolute', 
            bottom: '20px', 
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* Dark Mode Toggle Button */}
          <Button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Ativar modo escuro" : "Ativar modo claro"}
            style={{
              width: '65%',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '0 15px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: theme.darkModeButtonBg,
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.darkModeButtonHover;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.darkModeButtonBg;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isDarkMode ? <FiMoon size={18} /> : <FiSun size={18} />}
            <span>{isDarkMode ? 'Modo Escuro' : 'Modo Claro'}</span>
          </Button>

          {/* Logout Button */}
          <Button
            onClick={logout}
            style={{
              width: '65%',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '0 15px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: theme.secondary,
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#d13652' : '#c82333';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.secondary;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FiLogOut size={18} />
            <span>Sair</span>
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasMenu;