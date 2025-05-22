"use client"

import React, { useState, useEffect, useCallback } from "react"
import Cards from "../components/card"
import CardCampanha from "../components/card_campanha"
import { Col, Row, Button, Spinner, Alert } from "react-bootstrap"
import Veiculos_investimentos from "../components/veiculos_investimentos"
import Engajamento from "../components/engajamento"
import { format, subDays } from "date-fns"
import GraficoComparativo from "../components/grafico_comparativo"
import Trends from "../components/Trends"
import Demografico from "../components/Demografico"
import { useTheme } from '../context/ThemeContext'

const Painel_8_Telas = () => {
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd")
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState(yesterday)
  const [tempStartDate, setTempStartDate] = useState(startDate)
  const [tempEndDate, setTempEndDate] = useState(endDate)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [autoRetrying, setAutoRetrying] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  
  const { isDarkMode, toggleTheme } = useTheme()

  // Função para buscar dados com mecanismo de retry
  const fetchInitialData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setAutoRetrying(false)

    try {
      const response = await fetch(
        `https://api-nest-alpha.vercel.app/plataforma_dia/campaigns?startDate=${startDate}&endDate=${endDate}`,
      )

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data || data.length === 0) {
        throw new Error("Nenhum dado retornado do servidor")
      }

      console.log("Dados buscados com sucesso para:", { startDate, endDate })
      setDataLoaded(true)
    } catch (err) {
      console.error("Erro ao buscar dados:", err)
      setError(`${err.message}. Tentativa ${retryCount + 1} de 3.`)

      if (retryCount < 2) {
        setAutoRetrying(true)
        setTimeout(() => {
          setRetryCount((prev) => prev + 1)
        }, 5000)
      } else {
        setError("Não foi possível carregar os dados após várias tentativas. Por favor, tente novamente manualmente.")
      }
    } finally {
      setLoading(false)
    }
  }, [startDate, endDate, retryCount])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData, retryCount])

  useEffect(() => {
    setRetryCount(0)
  }, [startDate, endDate])

  const handleStartDateChange = (e) => {
    setTempStartDate(e.target.value)
  }

  const handleEndDateChange = (e) => {
    setTempEndDate(e.target.value)
  }

  const handleDateChange = () => {
    const newEndDate = tempEndDate > yesterday ? yesterday : tempEndDate
    setStartDate(tempStartDate)
    setEndDate(newEndDate)
    setRetryCount(0)
  }

  const handleManualRetry = () => {
    setRetryCount(0)
  }

  const ComponentFallback = ({ componentName, onRetry }) => (
    <div className="p-4 rounded shadow-sm text-center" style={{
      backgroundColor: isDarkMode ? "#2c2c2c" : "#f8f9fa",
      color: isDarkMode ? "#e0e0e0" : "#212529"
    }}>
      <p className="mb-3">Não foi possível carregar o componente {componentName}.</p>
      <Button 
        variant={isDarkMode ? "outline-light" : "outline-primary"} 
        size="sm" 
        onClick={onRetry}
      >
        Tentar novamente
      </Button>
    </div>
  )

  return (
    <>
      <div className="d-flex flex-column" style={{
        color: isDarkMode ? "#ffffff" : "#000000",
        backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff"
      }}>
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center"
          style={{ marginBottom: "30px", marginTop: "0px" }}
        >
          <div className="d-flex align-items-center" style={{ flex: "1", justifyContent: "center", position: "relative" }}>
            <h1
              style={{
                fontFamily: "Rawline",
                fontWeight: "600",
                margin: 0,
                textAlign: "center",
                color: isDarkMode ? "#ffffff" : "#000000", 
              }}
              className="mb-3 mb-md-0"
            >
              CAMPANHAS ATIVAS
            </h1>
          </div>
          <div
            className="d-flex flex-column flex-sm-row gap-2 justify-content-end align-items-center"
            style={{ minWidth: "280px", zIndex: 1001 }}
          >
            <input
              type="date"
              id="startDate"
              value={tempStartDate}
              onChange={handleStartDateChange}
              max={yesterday}
              className="p-2 w-100 w-sm-auto"
              style={{ 
                border: `1px solid ${isDarkMode ? "#444444" : "#e5e7eb"}`,
                borderRadius: "4px", 
                minWidth: "130px",
                backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
              }}
              disabled={loading}
            />
            <input
              type="date"
              id="endDate"
              value={tempEndDate}
              onChange={handleEndDateChange}
              className="p-2 w-100 w-sm-auto"
              style={{ 
                border: `1px solid ${isDarkMode ? "#444444" : "#e5e7eb"}`,
                borderRadius: "4px", 
                minWidth: "130px",
                backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
              }}
              disabled={loading}
            />
            <Button
              onClick={handleDateChange}
              style={{ 
                backgroundColor: "#00D000", 
                color: "white",
                border: "none" 
              }}
              className="px-4 py-2 w-100 w-sm-auto"
              disabled={loading}
            >
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5" style={{
          color: isDarkMode ? "#ffffff" : "#000000"
        }}>
          <Spinner animation="border" variant="success" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3">Carregando dados das campanhas...</p>
        </div>
      )}

      {error && (
        <Alert variant={isDarkMode ? "dark" : "warning"} className="mb-4" style={{
          backgroundColor: isDarkMode ? "#2c2c2c" : undefined,
          color: isDarkMode ? "#e0e0e0" : undefined,
          borderColor: isDarkMode ? "#444444" : undefined
        }}>
          <Alert.Heading>Problema ao carregar dados</Alert.Heading>
          <p>{error}</p>
          {autoRetrying ? (
            <div className="d-flex align-items-center">
              <Spinner animation="border" size="sm" className="me-2" />
              <span>Tentando novamente automaticamente...</span>
            </div>
          ) : (
            <Button variant={isDarkMode ? "outline-light" : "outline-warning"} onClick={handleManualRetry}>
              Tentar novamente
            </Button>
          )}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <ErrorBoundary fallback={<ComponentFallback componentName="Cards" onRetry={handleManualRetry} />}>
            <Cards startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
          </ErrorBoundary>
          <br />
          <Row className="g-4">
            <Col xs={12} md={6} lg={3} className="d-flex align-items-stretch">
              <ErrorBoundary fallback={<ComponentFallback componentName="Campanhas" onRetry={handleManualRetry} />}>
                <CardCampanha
                  startDate={startDate}
                  endDate={endDate}
                  onCampaignSelect={setSelectedCampaign}
                  selectedCampaign={selectedCampaign}
                />
              </ErrorBoundary>
            </Col>
            <Col xs={12} md={6} lg={7}>
              <ErrorBoundary fallback={<ComponentFallback componentName="Investimentos" onRetry={handleManualRetry} />}>
                <Veiculos_investimentos startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
              </ErrorBoundary>
            </Col>
            <Col xs={12} lg={2}>
              <ErrorBoundary fallback={<ComponentFallback componentName="Engajamento" onRetry={handleManualRetry} />}>
                <Engajamento startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
              </ErrorBoundary>
            </Col>
            <Col xs={12} lg={4}>
              <ErrorBoundary
                fallback={<ComponentFallback componentName="Gráfico Comparativo" onRetry={handleManualRetry} />}
              >
                <GraficoComparativo startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
              </ErrorBoundary>
            </Col>
            <Col xs={12} lg={4}>
              <ErrorBoundary fallback={<ComponentFallback componentName="Demografico" onRetry={handleManualRetry} />}>
                <Demografico startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
              </ErrorBoundary>
            </Col>
            <Col xs={12} lg={4}>
              <ErrorBoundary fallback={<ComponentFallback componentName="Trends" onRetry={handleManualRetry} />}>
                <Trends startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
              </ErrorBoundary>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro capturado pela ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default Painel_8_Telas