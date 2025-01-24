import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { campaigns } from '../data/campaigns'; // Dados de campanhas

const Card_campanha = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const toggleCampaignSelection = (id) => {
    setSelectedCampaigns((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((campaignId) => campaignId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Card className="campaign-card">
      <Card.Body>
        {/* Título */}
        <h3 className="campaign-title">Campanhas Secom</h3>

        {/* Legenda de Status */}
        <div className="status-legend">
          <span>
            <span className="dot active"></span> Ativas
          </span>
          <span>
            <span className="dot paused"></span> Pausada/Cancelada
          </span>
          <span>
            <span className="dot concluded"></span> Concluída
          </span>
        </div>

        {/* Filtro de Data */}
        <div className="date-filter">
          <div className="date-inputs">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
            <span className="date-separator">até</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="date-input"
            />
            <Button variant="success" className="apply-filter">
              Aplicar
            </Button>
          </div>
          
        </div>

        {/* Lista de Campanhas */}
        <div className="campaigns-list">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className={`campaign-item ${
                selectedCampaigns.includes(campaign.id) ? 'selected' : ''
              }`}
              onClick={() => toggleCampaignSelection(campaign.id)}
            >
              <div className="campaign-info">
                <span className={`dot ${campaign.status}`}></span>
                <span className="campaign-name">{campaign.name}</span>
              </div>
              <img
                src={campaign.image}
                alt={campaign.name}
                className="campaign-image"
              />
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Card_campanha;
