import React, { useState, useEffect } from 'react';
import { getMenuItems } from './menuItems';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import { Button } from 'react-bootstrap';
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';
import LogoGovClaro from '../assets/gov-logo.png';
import LogoGovEscuro from '../assets/gov-logo-escuro.png';

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
    menuItemHover: isDarkMode ? '#2e3553' : '#f1f3f5',
    activeItemBg: isDarkMode ? '#485dc9' : '#FFD000',
    boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
    darkModeButtonBg: isDarkMode ? '#1a3c66' : '#3b5bdb',
    darkModeButtonHover: isDarkMode ? '#194475' : '#2c4fe7',
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
        width: isHovered ? '270px' : '110px',
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
      <div
        className="logo-container"
        style={{
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.border}`,
          transition: 'all 0.3s ease-in-out',
          minHeight: '70px',
        }}
      >
        <img
          src={isDarkMode ? LogoGovEscuro : LogoGovClaro}
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

      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '15px 0',
        }}
      >
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
          }}
        >
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
                  <span
                    style={{
                      fontSize: '18px',
                      minWidth: '18px',
                    }}
                  >
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

      <div
        style={{
          padding: '15px',
          borderTop: `1px solid ${theme.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {/* Botão de alternância de tema (Dark Mode) */}
        <Button
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Ativar modo escuro" : "Ativar modo claro"}
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
            backgroundColor: theme.darkModeButtonBg,
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            color: '#ffffff',
            overflow: 'hidden',
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
          <span
            style={{
              opacity: isHovered ? 1 : 0,
              width: isHovered ? 'auto' : 0,
              transition: 'opacity 0.2s ease-in-out',
              overflow: 'hidden',
            }}
          >
            {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
          </span>
        </Button>

        {/* Botão de logout existente */}
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
          <span
            style={{
              opacity: isHovered ? 1 : 0,
              width: isHovered ? 'auto' : 0,
              transition: 'opacity 0.2s ease-in-out',
              overflow: 'hidden',
            }}
          >
            Sair
          </span>
        </Button>
      </div>
    </aside>
  );
};

export default Menu;