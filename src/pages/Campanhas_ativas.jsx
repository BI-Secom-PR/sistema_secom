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
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleDateChange = () => {
    setStartDate(document.getElementById("startDate").value);
    setEndDate(document.getElementById("endDate").value);
  };

  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-wrap justify-content-between align-items-start" 
             style={{ marginBottom: "30px", marginTop: "10px" }}>
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
              marginTop: "-5px"
            }}
          >
            <input
              type="date"
              id="startDate"
              value={startDate}  // Alteração aqui
              onChange={handleDateChange}  // Usando onChange diretamente
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
              value={endDate}  // Alteração aqui
              onChange={handleDateChange}  // Usando onChange diretamente
              className="p-2"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                width: "auto",
                minWidth: "130px"
              }}
            />
            <Button
              onClick={handleDateChange}
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
        <Col lg={2}>
          <CardCampanha 
            startDate={startDate} 
            endDate={endDate} 
            onCampaignSelect={handleCampaignSelect} 
            selectedCampaign={selectedCampaign}  // Passando selectedCampaign corretamente
          />
        </Col>
        <Col lg={6}>
          <Veiculos_investimentos startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
        <Col lg={4}>
          <Engajamento startDate={startDate} endDate={endDate} selectedCampaign={selectedCampaign} />
        </Col>
      </Row>
      <br />
    </>
  );
};

export default Campanhas_ativas;
