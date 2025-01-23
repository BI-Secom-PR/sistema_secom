import React from 'react'
import Cards from '../components/card'
import Card_campanha from '../components/card_campanha'
import { Col, Row } from 'react-bootstrap'
import Grafico_bi from '../components/grafico_bi'
import Veiculos_investimentos from '../components/veiculos_investimentos'
import Engajamento from '../components/engajamento'
import Trending_topics from '../components/trending_topics'
import GraficoComparativo from '../components/grafico_comparativo'
import Grafico_demografico from '../components/grafico_demografico'

const Home = () => {

  const impressoesPorEstado = {
    'São Paulo': 5000,
    'Rio de Janeiro': 3500,
    'Minas Gerais': 2800,
    'Bahia': 1200,
    'Rio Grande do Sul': 1500,
    'Paraná': 2000,
    'Distrito Federal': 800
  };

  return (
    <>
        <h1 style={{textAlign: "center"}}>SECOM DASHBOARD</h1>        
        <Cards />
        <br/>
        <Row>
        <Col lg={4} className="mb-3">
          {/* Responsividade ajustada para o Card de Campanhas */}
          <Card_campanha />
        </Col>
        <Col lg={4}>
          {/* Responsividade ajustada para o Gráfico */}
          <Grafico_bi />
        </Col>
        <Col lg={4}>
          {/* Responsividade ajustada para o Gráfico */}
          <Grafico_demografico />
        </Col>
        </Row>
        <br/>
        <Row>
          <Col xs={12} md={6} lg={5}><Veiculos_investimentos /></Col>
          <Col xs={12} md={6} lg={3}><Engajamento /></Col>
          <Col xs={12} md={6} lg={4}><Trending_topics /></Col>        
        </Row>
        <br/>
        <Row>
          <Col><GraficoComparativo /></Col>         
        </Row>
        
    </>
  )
}

export default Home