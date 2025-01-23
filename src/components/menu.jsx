import React from 'react'
import { menuItems } from './menuItems'

const menu = () => {
  return (
    <>
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
          </aside>
    </>
  )
}

export default menu