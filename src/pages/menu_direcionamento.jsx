import { LogOut, User } from 'lucide-react'
import React from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import campanhasImg from '../assets/campanhas.png';
import dashboardImg from '../assets/dashboard.png';
import monitoramentoImg from '../assets/monitoramento.png';
import powerBiImg from '../assets/powerbi.png';
import { Link } from 'react-router-dom';
import trendingTopicsImg from '../assets/trending-topics.png';

const Menu_direcionamento = () => {
  const imageStyle = {
    width: '100%',
    height: '330px',
    objectFit: 'cover',
    borderRadius: '12px',
    opacity: 0.12,
    transition: 'opacity 0.3s ease-in-out'
  };

  const overlayStyle = {
    position: 'absolute',
    top: '20px', // Modificado para alinhar ao topo
    left: '50%',
    transform: 'translateX(-50%)', // Removido translateY
    background: 'rgba(255, 255, 255, 0.9)',
    color: 'black',
    padding: '12px 20px',
    borderRadius: '10px',
    fontFamily: 'Rawline',
    fontSize: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s ease-in-out'
  };

  const cardContainerStyle = {
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '14px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1
          style={{
            fontSize: '2rem',
            fontFamily: 'Rawline',
            fontWeight: '600',
            textAlign: 'center',
            width: '100%',
          }}
        >
          PAINEL GERAL
        </h1>
      </div>

      <Row className="g-4" style={{ fontFamily: 'Rawline' }}>
        {[
          { link: '/campanhas_ativas', img: campanhasImg, text: 'Painel Campanhas Ativas' },
          { link: '/trends', img: dashboardImg, text: 'Painel Assuntos do Momento' },
          { link: '/powerbi', img: trendingTopicsImg, text: 'Painel Análise Detalhada' },
          { link: '/monitoramento', img: powerBiImg, text: 'Painel Imersão nas Redes' }
        ].map((item, index) => (
          <Col key={index} md={4}>
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              <div
                style={cardContainerStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('img').style.opacity = '0.8';
                  e.currentTarget.querySelector('div').style.background = 'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('img').style.opacity = '0.12';
                  e.currentTarget.querySelector('div').style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)';
                }}
              >
                <Image src={item.img} style={imageStyle} />
                <div style={overlayStyle}>{item.text}</div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Menu_direcionamento;