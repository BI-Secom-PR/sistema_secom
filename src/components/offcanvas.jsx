import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { menuItems } from './menuItems';
import { Link, useNavigate } from 'react-router-dom';


const OffcanvasMenu = ({ show, handleClose }) => {
  const navigate = useNavigate();
  
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