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
    borderRadius: '12px'
  };

  const overlayStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'rgba(255, 255, 255, 0.5)',
    color: 'black',
    padding: '10px 15px',
    borderRadius: '8px',
    fontFamily: 'Rawline',
    fontSize: '1.2rem',
    fontWeight: '500',
    textAlign: 'left',
    maxWidth: '80%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Sutil sombra para o overlay
  };

  const cardContainerStyle = {
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    border: '1px solid rgba(0, 0, 0, 0.08)', // Borda sutil
    borderRadius: '14px', // Bordas um pouco mais arredondadas
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08)', // Sombra suave
    overflow: 'hidden', // Garante que a sombra não ultrapasse as bordas arredondadas
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.12)' // Sombra mais pronunciada no hover
    }
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
          {/* Campanhas Ativas */}
          <Col md={4}>
            <Link to='/campanhas_ativas' style={{ textDecoration: 'none' }}>
              <div style={cardContainerStyle}>
                <Image src={campanhasImg} style={imageStyle} />
                <div style={overlayStyle}>
                  Painel Campanhas Ativas
                </div>
              </div>
            </Link>
          </Col>

          {/* Dashboard Planilha */}
          <Col md={4}>
            <Link to='/trends' style={{ textDecoration: 'none' }}>
              <div style={cardContainerStyle}>
                <Image src={dashboardImg} style={imageStyle} />
                <div style={overlayStyle}>
                  Painel Assuntos do Momento
                </div>
              </div>
            </Link>
          </Col>

          {/* Trends */}
          <Col md={4}>
            <Link to='/powerbi' style={{ textDecoration: 'none' }}>
              <div style={cardContainerStyle}>
                <Image src={trendingTopicsImg} style={imageStyle} />
                <div style={overlayStyle}>
                  Painel Análise Detalhada
                </div>
              </div>
            </Link>
          </Col>

          {/* Power BI */}
          <Col md={4}>
            <Link to='/monitoramento' style={{ textDecoration: 'none' }}>
              <div style={cardContainerStyle}>
                <Image src={powerBiImg} style={imageStyle} />
                <div style={overlayStyle}>
                  Painel Imersão nas Redes
                </div>
              </div>
            </Link>
          </Col>
        </Row>
    </>
  );
}

export default Menu_direcionamento;