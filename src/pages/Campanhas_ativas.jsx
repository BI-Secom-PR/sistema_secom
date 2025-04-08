import React, { useState, useEffect } from "react";
import Cards from "../components/card";
import CardCampanha from "../components/card_campanha";
import { Col, Row, Button } from "react-bootstrap";
import Veiculos_investimentos from "../components/veiculos_investimentos";
import Engajamento from "../components/engajamento";
import { format, subDays } from "date-fns";
import GraficoComparativo from "../components/grafico_comparativo";
import { useTheme } from '../context/ThemeContext'; // Importe o useTheme
import { FaSun, FaMoon } from "react-icons/fa"; // Importe ícones do react-icons

const Campanhas_ativas = () => {
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(yesterday);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const { isDarkMode, toggleTheme } = useTheme(); // Acesse o estado do tema e a função para alternar

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

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ marginBottom: "30px", marginTop: "0px" }}>
          <div className="d-flex align-items-center" style={{ flex: "1", justifyContent: "center", position: "relative" }}>
            {/* Botão de alternância de tema à esquerda */}
            <Button
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              style={{
                backgroundColor: isDarkMode ? "#1a3c66" : "#3b5bdb", // Cor primária ajustada para claro/escuro
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "#194475" : "#2c4fe7"}
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
                color: isDarkMode ? "#ffffff" : "#000000", // Cor do título muda com o tema
              }}
              className="mb-3 mb-md-0"
            >
              CAMPANHAS ATIVAS
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
                border: `1px solid ${isDarkMode ? "#444444" : "#e5e7eb"}`, // Cor da borda muda com o tema
                borderRadius: "4px",
                width: "auto",
                minWidth: "130px",
                zIndex: 1001, // Adiciona um z-index maior que o do toggle
                backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff", // Cor de fundo muda com o tema
                color: isDarkMode ? "#ffffff" : "#000000", // Cor do texto muda com o tema
              }}
            />
            <input
              type="date"
              id="endDate"
              value={tempEndDate}
              onChange={handleEndDateChange}
              className="p-2 w-100 w-sm-auto"
              style={{
                border: `1px solid ${isDarkMode ? "#444444" : "#e5e7eb"}`, // Cor da borda muda com o tema
                borderRadius: "4px",
                width: "auto",
                minWidth: "130px",
                zIndex: 1001, // Adiciona um z-index maior que o do toggle
                backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff", // Cor de fundo muda com o tema
                color: isDarkMode ? "#ffffff" : "#000000", // Cor do texto muda com o tema
              }}
            />
            <Button
              onClick={handleDateChange}
              style={{
                backgroundColor: isDarkMode ? "#00D000" : "#00D000", // Cor do botão muda com o tema
                color: "white",
                zIndex: 1001, // Adiciona um z-index maior que o do toggle
                border: "none",
              }}
              className="px-4 py-2 w-100 w-sm-auto"
            >
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      <Cards startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
      <br />

      <Row className="g-4">
        <Col xs={12} md={6} lg={2} className="d-flex align-items-stretch">
          <CardCampanha
            startDate={startDate}
            endDate={endDate}
            onCampaignSelect={setSelectedCampaign}
            selectedCampaign={selectedCampaign}
          />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Veiculos_investimentos startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
        <Col xs={12} lg={4}>
          <Engajamento startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
        <Col xs={12} lg={12}>
          <GraficoComparativo startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
      </Row>
      <br />
    </>
  );
};

export default Campanhas_ativas;