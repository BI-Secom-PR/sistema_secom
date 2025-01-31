import React from 'react';
import { menuItems } from './menuItems';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext'; // Importa o contexto de autenticação
import { Button } from 'react-bootstrap';

const Menu = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('_role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('email');
    window.location.reload(navigate('/login'));
  };

  if (!isAuthenticated) return null; // Oculta o menu se o usuário não estiver logado

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
            const isActive = location.pathname === item.path; // Verifica se o caminho atual corresponde ao item
            return (
              <li key={index} className={`menu-item ${isActive ? 'active' : ''}`}>
                <a
                  href={item.path}
                  style={{
                    textDecoration: 'none',
                    color: isActive ? '#000' : '#666', // Cor ativa
                    fontWeight: isActive ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
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
      <div className="logout-container" style={{ padding: '20px', textAlign: 'center' }}>
        <Button variant="danger" onClick={logout} className="w-100">
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default Menu;