import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import { menuItems } from './menuItems'

const offcanvas = ({ show, handleClose }) => {
  return (
    <>
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
                  <li key={index} className={`menu-item ${index === 0 ? 'active' : ''}`}>
                    <a
                      href={item.path}
                      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}
                    >
                      <img src={item.icon} alt={item.name} className="icon" />
                      <span className="menu-text">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}

export default offcanvas