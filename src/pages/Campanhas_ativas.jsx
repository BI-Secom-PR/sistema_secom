import React, { useState } from 'react'
import Cards from '../components/card'
import Card_campanha from '../components/card_campanha'
import { Col, Row } from 'react-bootstrap'
import Grafico_bi from '../components/grafico_bi'
import Veiculos_investimentos from '../components/veiculos_investimentos'
import Engajamento from '../components/engajamento'
import Grafico_demografico from '../components/grafico_demografico'
import { format, subDays } from 'date-fns'

const Campanhas_ativas = () => {  
  // Estados compartilhados
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  // Função para atualizar datas
  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  // Função para atualizar campanha selecionada
  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign)
  }

  return (
    <>
      <h1 style={{
        textAlign: "center",
        fontFamily: "Rawline",
        fontWeight: "600"
      }}>CAMPANHAS ATIVAS</h1>        
      <Cards 
        startDate={startDate}
        endDate={endDate}
        selectedCampaign={selectedCampaign}
      />
      <br/>
      <Row>
        <Col lg={4} className="mb-3">
          <Card_campanha 
            onDateChange={handleDateChange}
            onCampaignSelect={handleCampaignSelect}
            startDate={startDate}
            endDate={endDate}
            selectedCampaign={selectedCampaign}
          />
        </Col>
        <Col lg={4}>
          <Grafico_bi 
            startDate={startDate}
            endDate={endDate}
            selectedCampaign={selectedCampaign}
          />
        </Col>
        <Col lg={4}>
          <Grafico_demografico 
            startDate={startDate}
            endDate={endDate}
            selectedCampaign={selectedCampaign}
          />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col xs={12} md={6} lg={8}>
          <Veiculos_investimentos 
            startDate={startDate}
            endDate={endDate}
            selectedCampaign={selectedCampaign}
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Engajamento 
            startDate={startDate}
            endDate={endDate}
            selectedCampaign={selectedCampaign}
          />
        </Col>
      </Row>
      <br/>
    </>
  )
}

export default Campanhas_ativas