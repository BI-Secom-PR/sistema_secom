import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { menuItems } from './menuItems';
import { Link } from 'react-router-dom';

const OffcanvasMenu = ({ show, handleClose }) => {
  
  const logout = () => {
    sessionStorage.removeItem('_role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('email');
    handleClose(); // Fechar o Offcanvas ao deslogar
    window.location.href = '/login'; // Redirecionar corretamente
  };

  return (
    <Offcanvas show={show} onHide={handleClose} backdrop="true" className="custom-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
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
            {menuItems.map((item, index) => (
              <Link 
                className="nav-link lead" 
                to={item.path} 
                onClick={() => {
                  handleClose(); // Fechar o menu ao clicar
                  window.scrollTo(0, 0); // Rolagem para o topo
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <li key={index} className="menu-item">
                
                  {item.icon}
                  <span> {item.name}</span>
                
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