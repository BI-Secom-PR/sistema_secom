import React from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Importe o useTheme
import { FaSun, FaMoon } from "react-icons/fa"; // Importe ícones do react-icons
import campanhasImg from '../assets/campanhas.png';
import dashboardImg from '../assets/dashboard.png';
import trendingTopicsImg from '../assets/trending-topics.png';
import StilingueImg from '../assets/stilingue.png';
import DemograficoImg from '../assets/demografico.png';

const Menu_direcionamento = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Acesse o estado do tema e a função para alternar

  const imageStyle = {
    width: '100%',
    height: '330px',
    objectFit: 'cover',
    borderRadius: '12px',
    opacity: 0.6,
    transition: 'opacity 0.3s ease-in-out'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(24, 62, 255, 0.9)', // Mantive o overlay azul, mas pode ajustar se quiser
    color: isDarkMode ? 'black' : 'white',
    padding: '12px 20px',
    borderRadius: '12px 12px 0 0',
    fontFamily: 'Rawline',
    fontSize: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: isDarkMode ? '0 3px 6px rgba(255, 255, 255, 0.1)' : '0 3px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 2
  };

  const cardContainerStyle = {
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '14px',
    boxShadow: isDarkMode 
      ? '0 4px 6px rgba(255, 255, 255, 0.05), 0 1px 3px rgba(255, 255, 255, 0.08)' 
      : '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff' // Fundo do card dinâmico
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center" style={{ width: '100%', justifyContent: 'center', position: 'relative' }}>
          <h1 
            style={{ 
              fontSize: '2rem', 
              fontFamily: 'Rawline', 
              fontWeight: '600', 
              textAlign: 'center',
              color: isDarkMode ? '#ffffff' : '#000000' // Cor do título dinâmica
            }}
          >
            PAINEL GERAL
          </h1>
        </div>
      </div>
      <Row className="g-4" style={{ fontFamily: 'Rawline' }}>
        {[
          { link: '/campanhas_ativas', img: campanhasImg, text: 'Campanhas Ativas' },
          { link: '/demografico', img: DemograficoImg, text: 'Análise Demográfica' },
          { link: '/powerbi', img: trendingTopicsImg, text: 'Análise Detalhada' },
          { link: '/trends', img: dashboardImg, text: 'Assuntos do Momento' },
          { link: '/stilingue', img: StilingueImg, text: 'Debate Digital' }
        ].map((item, index) => (
          <Col key={index} md={4}>
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              <div
                style={cardContainerStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('img').style.opacity = '0.8';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 6px 12px rgba(255, 255, 255, 0.15)' 
                    : '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('img').style.opacity = '0.6';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 4px 6px rgba(255, 255, 255, 0.05), 0 1px 3px rgba(255, 255, 255, 0.08)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={overlayStyle}>{item.text}</div>
                <Image src={item.img} style={imageStyle} />
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Menu_direcionamento;