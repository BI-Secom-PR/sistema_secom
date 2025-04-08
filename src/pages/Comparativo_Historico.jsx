import React, { useState, useEffect } from "react";
import CardsHistorico from "../components/card_historico";
import CardCampanha from "../components/card_campanha";
import { Col, Row, Button } from "react-bootstrap";
import Veiculos_investimentos from "../components/veiculos_investimentos";
import { format, subDays } from "date-fns";
import VeiculosHistoricos from "../components/veiculos_historico";
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons

const Comparativo_Historico = () => {
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(yesterday);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add the theme context
  const { isDarkMode, toggleTheme } = useTheme();

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Dados buscados com sucesso para:", { startDate, endDate });
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError("Erro ao carregar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    setTempStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setTempEndDate(e.target.value);
  };

  const handleDateChange = () => {
    const newEndDate = tempEndDate > yesterday ? yesterday : tempEndDate;
    setStartDate(tempStartDate);
    setEndDate(newEndDate);
  };

  if (loading) {
    return (
      <div style={{ 
        color: isDarkMode ? "#ffffff" : "#000000",
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        padding: "20px",
        textAlign: "center"
      }}>
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        color: isDarkMode ? "#ffffff" : "#000000",
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        padding: "20px",
        textAlign: "center"
      }}>
        <p>{error}</p>
        <Button 
          onClick={fetchInitialData}
          style={{
            backgroundColor: isDarkMode ? "#1a3c66" : "#3b5bdb",
            border: "none",
            color: "#ffffff"
          }}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ marginBottom: "30px", marginTop: "0px" }}>
          <div className="d-flex align-items-center" style={{ flex: "1", justifyContent: "center", position: "relative" }}>
            {/* Theme toggle button on the left */}
            <Button
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              style={{
                backgroundColor: isDarkMode ? "#1a3c66" : "#3b5bdb",
                border: "none",
                color: "#ffffff",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                transition: "all 0.2s ease-in-out",
                position: "absolute",
                left: "0",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "#1a4980" : "#2c4fe7"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "#1a3c66" : "#3b5bdb"}
            >
              {isDarkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
            </Button>
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
              COMPARATIVO CAMPANHAS HISTÓRICO
            </h1>
          </div>
          
          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end align-items-center" style={{ minWidth: "280px", zIndex: 1001 }}>
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
                zIndex: 1001,
              }}
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
                zIndex: 1001,
              }}
            />
            <Button
              onClick={handleDateChange}
              style={{
                backgroundColor: isDarkMode ? "#00D000" : "#00D000",
                color: "white",
                border: "none",
                zIndex: 1001,
              }}
              className="px-4 py-2 w-100 w-sm-auto"
            >
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      <CardsHistorico startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
      <br />
      <Row className="g-4">
        <Col xs={12} md={6} lg={3} className="d-flex align-items-stretch">
          <CardCampanha
            startDate={startDate}
            endDate={endDate}
            onCampaignSelect={setSelectedCampaign}
            selectedCampaign={selectedCampaign}
          />
        </Col>
        <Col xs={12} md={6} lg={9}>
          <VeiculosHistoricos startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
      </Row>
      <br />
    </>
  );
};

export default Comparativo_Historico;