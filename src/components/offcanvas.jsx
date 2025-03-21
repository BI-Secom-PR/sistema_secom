import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { getMenuItems } from './menuItems'; // Importe a função getMenuItems
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Importe o useTheme

const OffcanvasMenu = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Acesse o estado do tema

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
      style={{ backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff' }} // Cor de fundo dinâmica
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ color: isDarkMode ? '#ffffff' : '#000000' }}> {/* Cor do texto dinâmica */}
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
            {getMenuItems(isDarkMode).map((item, index) => ( // Use getMenuItems e passe isDarkMode
              <Link
                className="nav-link lead"
                to={item.path}
                key={index}
                onClick={() => {
                  handleClose(); // Fechar o menu ao clicar
                  window.scrollTo(0, 0); // Rolagem para o topo
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <li className="menu-item" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}> {/* Cor do texto dinâmica */}
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div className="logout-container" style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
          <Button
            variant="danger"
            className="w-100 py-2"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasMenu;