import React, { useState } from 'react';
import { menuItems } from './menuItems';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import { Button } from 'react-bootstrap';
import { FiLogOut } from 'react-icons/fi';

const Menu = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutText, setShowLogoutText] = useState(false);

  const logout = () => {
    sessionStorage.removeItem('_role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('email');
    window.location.reload(navigate('/login'));
  };

  if (!isAuthenticated) return null;

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img
          src="https://logodownload.org/wp-content/uploads/2023/01/governo-federal-2023-logo-lula.png"
          alt="Logo Governo Federal"
          className="logo"
        />
      </div>
      <nav className="menu-container">
        <ul className="menu">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index} className={`menu-item ${isActive ? 'active' : ''}`}>
                <a
                  href={item.path}
                  style={{
                    textDecoration: 'none',
                    color: isActive ? '#000' : '#666',
                    fontWeight: isActive ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {item.icon}
                  <span className="menu-text">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="logout-container" style={{
        position: 'absolute',
        bottom: '20px',
        left: 0,
        right: 0,
        padding: '0 20px',
      }}>
        <div 
          className="tooltip-container"
          onMouseEnter={() => setShowLogoutText(true)}
          onMouseLeave={() => setShowLogoutText(false)}
        >
          <Button
            variant="danger"
            onClick={logout}
            className="logout-button"
            style={{
              width: isCollapsed ? '40px' : '100%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: isCollapsed ? '0' : '0 15px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: '#dc3545',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(220, 53, 69, 0.2)',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}
          >
            <FiLogOut size={20} />
            {(!isCollapsed || showLogoutText) && (
              <span 
                className="logout-text"
                style={{
                  position: isCollapsed ? 'absolute' : 'relative',
                  left: isCollapsed ? '45px' : 'auto',
                  backgroundColor: isCollapsed ? '#dc3545' : 'transparent',
                  padding: isCollapsed ? '5px 10px' : '0',
                  borderRadius: isCollapsed ? '4px' : '0',
                  whiteSpace: 'nowrap',
                  opacity: showLogoutText || !isCollapsed ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                Sair
              </span>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Menu;