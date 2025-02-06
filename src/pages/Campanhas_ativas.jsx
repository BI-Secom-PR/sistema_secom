import React, { useState } from "react";
import Cards from "../components/card";
import CardCampanha from "../components/card_campanha";
import { Col, Row, Button } from "react-bootstrap";
import Veiculos_investimentos from "../components/veiculos_investimentos";
import Engajamento from "../components/engajamento";
import { format, subDays } from "date-fns";

const Campanhas_ativas = () => {
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [tempStartDate, setTempStartDate] = useState(startDate);  // Estado temporário para data de início
  const [tempEndDate, setTempEndDate] = useState(endDate);        // Estado temporário para data final
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Função para alterar o estado temporário de startDate
  const handleStartDateChange = (e) => {
    setTempStartDate(e.target.value);
  };

  // Função para alterar o estado temporário de endDate
  const handleEndDateChange = (e) => {
    setTempEndDate(e.target.value);
  };

  // Atualizar startDate e endDate quando o botão for clicado
  const handleDateChange = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
  };

  return (
    <>
      <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center" 
     style={{ marginBottom: "30px", marginTop: "0px" }}>  {/* Ajustado para garantir o alinhamento */}
        <h1
          style={{
            fontFamily: "Rawline",
            fontWeight: "600",
            margin: 0,
            flex: "1",
            textAlign: "center"
          }}
        >
          CAMPANHAS ATIVAS
        </h1>

        <div
          className="d-flex flex-wrap gap-2 justify-content-end align-items-center"
          style={{
            minWidth: "280px",
          }}
        >
          <input
            type="date"
            id="startDate"
            value={tempStartDate}  // Agora usamos o estado temporário
            onChange={handleStartDateChange}  // Altera o estado temporário
            className="p-2"
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              width: "auto",
              minWidth: "130px"
            }}
          />
          <input
            type="date"
            id="endDate"
            value={tempEndDate}  // Agora usamos o estado temporário
            onChange={handleEndDateChange}  // Altera o estado temporário
            className="p-2"
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              width: "auto",
              minWidth: "130px"
            }}
          />
          <Button
            onClick={handleDateChange}  // Agora altera o estado final quando clicado
            style={{ backgroundColor: "#1f9b00", color: "white" }}
            className="px-4 py-2"
          >
            Atualizar
          </Button>
        </div>
      </div>
      </div>

      <Cards startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
      <br />

      <Row className="g-4">
      <Col lg={2} className="d-flex align-items-stretch" style={{ height: '100%' }}>
  <CardCampanha 
    startDate={startDate} 
    endDate={endDate} 
    onCampaignSelect={handleCampaignSelect} 
    selectedCampaign={selectedCampaign} 
  />
</Col>

        <Col lg={5}>
          <Veiculos_investimentos startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
        <Col lg={2}>
          <Engajamento startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
      </Row>
      <br />
    </>
  );
};

export default Campanhas_ativas;
