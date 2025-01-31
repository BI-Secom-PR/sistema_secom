import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { menuItems } from './menuItems';
import { useNavigate } from 'react-router-dom';

const OffcanvasMenu = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('_role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('email');
    window.location.reload(navigate('/login'));
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
              <li key={index} className="menu-item">
                <a
                  href={item.path}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  {item.icon}
                  <span className="menu-text">{item.name}</span>
                </a>
              </li>
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
