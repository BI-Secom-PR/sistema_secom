import React, { useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { getMenuItems } from './menuItems';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import LogoGovClaro from '../assets/gov-logo.png';
import LogoGovEscuro from '../assets/gov-logo-escuro.png';

// Estilos CSS atualizados para o backdrop e Offcanvas
const offcanvasStyles = `
  /* Backdrop separado */
  .custom-backdrop {
    background-color: rgba(0, 0, 0, 0.2) !important;
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
  }
  .custom-offcanvas .offcanvas {
    opacity: 1 !important;
    transition: transform 0.3s ease-in-out;
  }
  .menu-item {
    padding: 12px 15px;
    border-radius: 8px;
    transition: background-color 0.2s ease-in-out;
  }
  .menu-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .menu-item.active {
    background-color: #FFD000;
    color: #000000;
    font-weight: 600;
  }
  [data-theme="dark"] .menu-item {
    color: #e0e0e0 !important;
  }
  [data-theme="dark"] .menu-item.active {
    background-color: #485dc9;
    color: #ffffff !important;
  }
  [data-theme="dark"] .menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  [data-theme="dark"] .custom-offcanvas .btn {
    color: #ffffff !important;
  }
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    width: 100%;
  }
  .custom-button {
    width: 90%;
    max-width: 220px;
  }
`;

// Injetar estilos no documento
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = offcanvasStyles;
document.head.appendChild(styleSheet);

const OffcanvasMenu = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const theme = {
    background: isDarkMode ? '#2c2c2c' : '#ffffff',
    sidebarBg: isDarkMode ? '#2c2c2c' : '#f8f9fa',
    text: isDarkMode ? '#ffffff' : '#212529',
    textMuted: isDarkMode ? '#e0e0e0' : '#6c757d',
    border: isDarkMode ? '#2a2a4a' : '#dee2e6',
    secondary: isDarkMode ? '#e94560' : '#dc3545',
    darkModeButtonBg: isDarkMode ? '#1a3c66' : '#3b5bdb',
    darkModeButtonHover: isDarkMode ? '#194475' : '#2c4fe7',
    menuItemHover: isDarkMode ? '#2e3553' : '#f1f3f5',
    activeItemBg: isDarkMode ? '#485dc9' : '#FFD000',
  };

  // Controlar o backdrop e garantir fechamento ao clicar fora
  useEffect(() => {
    if (!show) return;
    const backdropEl = document.querySelector('.offcanvas-backdrop');
    if (!backdropEl) return;

    // estilizar via classe dedicada
    backdropEl.classList.add('custom-backdrop');

    // fechar ao clicar no backdrop
    const handleOutsideClick = () => handleClose();
    backdropEl.addEventListener('click', handleOutsideClick);

    return () => {
      backdropEl.removeEventListener('click', handleOutsideClick);
      backdropEl.classList.remove('custom-backdrop');
    };
  }, [show, handleClose]);

  const handleMenuItemClick = (path) => {
    navigate(path);
    setTimeout(() => {
      handleClose();
      window.scrollTo(0, 0);
    }, 100);
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
    handleClose();
    window.location.reload();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop={true}
      backdropClassName="custom-backdrop"
      className="custom-offcanvas"
      style={{
        backgroundColor: theme.sidebarBg,
        width: '270px',
      }}
    >
      <Offcanvas.Header> {/* botão de X removido */}
        <Offcanvas.Title>
          <img
            src={isDarkMode ? LogoGovEscuro : LogoGovClaro}
            alt="Logo Governo Federal"
            style={{
              width: '150px',
              height: 'auto',
              objectFit: 'contain',
              filter: isDarkMode ? 'brightness(0.9) contrast(1.1)' : 'none',
            }}
          />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {getMenuItems(isDarkMode).map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index} style={{ margin: '5px 10px' }}>
                  <div
                    onClick={() => handleMenuItemClick(item.path)}
                    style={{
                      textDecoration: 'none',
                      color: isActive ? (isDarkMode ? '#ffffff' : '#000000') : theme.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    <div className={`menu-item ${isActive ? 'active' : ''}`} style={{
                      display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: isActive ? '600' : '400'
                    }}> 
                      <span style={{ fontSize: '18px', color: isDarkMode ? '#ffffff' : '#212529' }}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="button-container">
          <Button
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="custom-button"
            style={{
              height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
              gap: '12px', padding: '0 15px', fontSize: '14px', fontWeight: '500',
              backgroundColor: theme.darkModeButtonBg, border: 'none', borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)', cursor: 'pointer', color: '#ffffff', transition: 'all 0.2s ease'
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
            <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
          </Button>
          <Button
            onClick={logout}
            className="custom-button"
            style={{
              height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
              gap: '12px', padding: '0 15px', fontSize: '14px', fontWeight: '500',
              backgroundColor: theme.secondary, border: 'none', borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)', cursor: 'pointer', color: '#ffffff', transition: 'all 0.2s ease'
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
