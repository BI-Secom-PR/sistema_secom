import { LogOut, User } from 'lucide-react';
import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import campanhasImg from '../assets/campanhas.png';
import dashboardImg from '../assets/dashboard.png';
import trendingTopicsImg from '../assets/trending-topics.png';
import powerBiImg from '../assets/powerbi.png';
import StilingueImg from '../assets/stilingue.png';
import DemograficoImg from '../assets/demografico.png';

const Menu_direcionamento = () => {
  const imageStyle = {
    width: '100%',
    height: '330px',
    objectFit: 'cover',
    borderRadius: '12px',
    opacity: 0.2,
    transition: 'opacity 0.3s ease-in-out'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '12px 12px 0 0',
    fontFamily: 'Rawline',
    fontSize: '1.2rem',
    fontWeight: '600',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 2 // Added to ensure title stays on top
  };

  const cardContainerStyle = {
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '14px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden'
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 style={{ fontSize: '2rem', fontFamily: 'Rawline', fontWeight: '600', textAlign: 'center', width: '100%' }}>
          PAINEL GERAL
        </h1>
      </div>
      <Row className="g-4" style={{ fontFamily: 'Rawline' }}>
        {[
          { link: '/campanhas_ativas', img: campanhasImg, text: 'Painel Campanhas Ativas' },
          { link: '/trends', img: dashboardImg, text: 'Painel Assuntos do Momento' },
          { link: '/powerbi', img: trendingTopicsImg, text: 'Painel Análise Detalhada' },
          { link: '/monitoramento', img: powerBiImg, text: 'Painel Imersão nas Redes' },
          { link: '/demografico', img: DemograficoImg, text: 'Painel Análise Demográfica' },
          { link: '/stilingue', img: StilingueImg, text: 'Painel Stilingue' }
        ].map((item, index) => (
          <Col key={index} md={4}>
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              <div
                style={cardContainerStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('img').style.opacity = '0.8';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('img').style.opacity = '0.2';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)';
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