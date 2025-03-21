import React, { useState, useEffect } from 'react';
import { getMenuItems } from './menuItems';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import { Button } from 'react-bootstrap';
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';

// Importação das logos locais
import LogoGovClaro from '../assets/gov-logo.png'; // Ajuste o caminho conforme sua estrutura
import LogoGovEscuro from '../assets/gov-logo-escuro.png'; // Ajuste o caminho conforme sua estrutura

const Menu = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  
  const theme = {
    background: isDarkMode ? '#2c2c2c' : '#ffffff',
    sidebarBg: isDarkMode ? '#2c2c2c' : '#f8f9fa',
    primary: isDarkMode ? '#3f3f3f' : '#4361ee',
    secondary: isDarkMode ? '#e94560' : '#dc3545',
    text: isDarkMode ? '#e6e6e6' : '#212529',
    textMuted: isDarkMode ? '#a0a0a0' : '#6c757d',
    border: isDarkMode ? '#2a2a4a' : '#dee2e6',
    logoFilter: isDarkMode ? 'brightness(0.9) contrast(1.1)' : 'none',
    menuItemHover: isDarkMode ? '#2a2a4a' : '#f1f3f5',
    activeItemBg: isDarkMode ? '#183EFF' : '#FFD000',
    boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [isDarkMode]);

  if (!isAuthenticated) return null;

  return (
    <aside 
      className="sidebar" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: theme.sidebarBg,
        width: isHovered ? '265px' : '110px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        transition: 'width 0.3s ease-in-out',
        borderRight: `1px solid ${theme.border}`,
        boxShadow: theme.boxShadow,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <div className="logo-container" style={{ 
        padding: '20px 0', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.border}`,
        transition: 'all 0.3s ease-in-out',
        minHeight: '70px',
      }}>
        <img
          src={isDarkMode ? LogoGovEscuro : LogoGovClaro} // Alterna entre as logos
          alt="Logo Governo Federal"
          style={{ 
            width: isHovered ? '150px' : '80px',
            height: 'auto',
            transition: 'width 0.3s ease-in-out',
            filter: theme.logoFilter,
            objectFit: 'contain',
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: isHovered ? 'space-between' : 'center',
        alignItems: 'center',
        padding: isHovered ? '15px' : '15px 0',
        borderBottom: `1px solid ${theme.border}`,
        transition: 'all 0.3s ease-in-out',
      }}>
        {isHovered && (
          <span style={{ 
            color: theme.text, 
            fontWeight: 500,
            fontSize: '14px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
          }}>
            Mudar tema
          </span>
        )}
        
        <div style={{
          display: 'flex',
          gap: isHovered ? '10px' : '0',
          alignItems: 'center',
          justifyContent: 'center',
          width: isHovered ? 'auto' : '100%',
          flexDirection: isHovered ? 'row' : 'column',
        }}>
          <Button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            style={{
              backgroundColor: theme.primary,
              border: 'none',
              color: '#ffffff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease-in-out',
              margin: isHovered ? '0' : '5px 0',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#1a4980' : '#2c4fe7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.primary}
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </Button>
        </div>
      </div>

      <nav style={{ 
        flex: 1,
        overflowY: 'auto',
        padding: '15px 0',
      }}>
        <ul style={{ 
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        }}>
          {getMenuItems(isDarkMode).map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li 
                key={index}
                style={{
                  margin: '2px 0',
                  padding: '0 10px',
                }}
              >
                <Link 
                  to={item.path} 
                  onClick={() => window.scrollTo(0, 0)} 
                  style={{
                    textDecoration: 'none',
                    color: isActive ? (isDarkMode ? '#ffffff' : '#000000') : theme.textMuted,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? theme.activeItemBg : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = theme.menuItemHover)}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ 
                    fontSize: '18px',
                    minWidth: '18px',
                  }}>
                    {item.icon}
                  </span>
                  <span 
                    style={{
                      fontWeight: isActive ? '600' : '400',
                      fontSize: '14px',
                      opacity: isHovered ? 1 : 0,
                      width: isHovered ? 'auto' : 0,
                      transition: 'opacity 0.2s ease-in-out, width 0s',
                      overflow: 'hidden',
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{
        padding: '15px',
        borderTop: `1px solid ${theme.border}`,
      }}>
        <Button
          onClick={logout}
          style={{
            width: '100%',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isHovered ? 'flex-start' : 'center',
            gap: '8px',
            padding: isHovered ? '0 15px' : '0',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: theme.secondary,
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            color: '#ffffff',
            overflow: 'hidden',
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
          <span style={{
            opacity: isHovered ? 1 : 0,
            width: isHovered ? 'auto' : 0,
            transition: 'opacity 0.2s ease-in-out',
            overflow: 'hidden',
          }}>
            Sair
          </span>
        </Button>
      </div>
    </aside>
  );
};

export default Menu;