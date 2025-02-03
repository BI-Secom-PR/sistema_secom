import { LogOut, User } from 'lucide-react'
import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import campanhasImg from '../assets/campanhas.png';
import dashboardImg from '../assets/dashboard.png';
import monitoramentoImg from '../assets/monitoramento.png';
import powerBiImg from '../assets/powerbi.png';
import { Link } from 'react-router-dom';
import trendingTopicsImg from '../assets/trending-topics.png';

const Menu_direcionamento = () => {
  return (
    <>
        {/* Main Content */}
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

        <h2 className="mb-4"></h2>

        <Row className="g-4">
          {/* Campanhas Ativas */}
          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: '12px' }}>
              <Card.Body className="d-flex flex-column">
                <Link to='/campanhas_ativas'>
                <div style={{ flex: 1 }}>
                  <Image src={campanhasImg} fluid />
                </div>
                <Button
                  variant="danger"
                  className="w-100 mt-3"
                  style={{ backgroundColor: '#ff4131', border: 'none' }}
                >                   
                  Ver Campanhas Ativas
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Dashboard Planilha */}
          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: '12px' }}>
              <Card.Body className="d-flex flex-column">
                <Link to='/demandas'>
                <div style={{ flex: 1 }}>
                  <Image src={dashboardImg} fluid />
                </div>
                <Button
                  variant="danger"
                  className="w-100 mt-3"
                  style={{ backgroundColor: '#ff4131', border: 'none' }}
                >
                  Ver Dashboard Demandas
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Trends */}
          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: '12px' }}>
              <Card.Body className="d-flex flex-column">
                <Link to='/trends'>
                <div style={{ flex: 1 }}>
                  <Image src={trendingTopicsImg} fluid />
                </div>
                <Button
                  variant="danger"
                  className="w-100 mt-3"
                  style={{ backgroundColor: '#ff4131', border: 'none' }}
                >
                  Ver Trends
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Power BI */}
          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: '12px' }}>
              <Card.Body className="d-flex flex-column">
                <Link to='/powerbi'>
                <div style={{ flex: 1 }}>
                  <Image src={powerBiImg} fluid />
                </div>
                <Button
                  variant="danger"
                  className="w-100 mt-3"
                  style={{ backgroundColor: '#ff4131', border: 'none' }}
                >
                  Ver Power BI
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Monitoramento */}
          <Col md={4}>
            <Card className="border-0 h-100" style={{ borderRadius: '12px' }}>
              <Card.Body className="d-flex flex-column">
                <Link to='/monitoramento'>
                <div style={{ flex: 1 }}>
                  <Image src={monitoramentoImg} fluid />
                </div>
                <Button
                  variant="danger"
                  className="w-100 mt-3"
                  style={{ backgroundColor: '#ff4131', border: 'none' }}
                >
                  Ver Monitoramento
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </>
  )
}

export default Menu_direcionamento