import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaPinterest, FaLinkedin, FaGoogle } from "react-icons/fa";
import { fetchPlatformMetrics } from '../data/fetchMetrics';

const Veiculos_investimentos = ({ startDate, endDate, selectedCampaign }) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const getMetrics = async () => {
      const result = await fetchPlatformMetrics(startDate, endDate, selectedCampaign);
      setMetrics(result);
    };

    getMetrics();
  }, [startDate, endDate, selectedCampaign]);

  if (!metrics) {
    return <div>Carregando métricas...</div>;
  }

  // Função para escolher o ícone conforme a plataforma
  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <FaInstagram style={{ color: "#E1306C" }} />;
      case "facebook":
        return <FaFacebook style={{ color: "#4267B2" }} />;
      case "pinterest":
        return <FaPinterest style={{ color: "#E60023" }} />;
      case "linkedin":
        return <FaLinkedin style={{ color: "#0077B5" }} />;
      case "google":
        return <FaGoogle style={{ color: "#DB4437" }} />;
      default:
        return null;
    }
  };

  // Função para calcular o progresso (a lógica pode variar dependendo do seu critério)
  const calculateProgress = (platform) => {
    if (platform.spend && platform.impressions) {
      return Math.min(100, (platform.spend / platform.impressions) * 100); // Exemplo de cálculo
    }
    return 0; // Se os dados não estiverem completos, o progresso será 0
  };

  return (
    <Card className="investment-card">
      <h3 className="card-title">Investimento por veículo</h3>
      {metrics
        .filter(item => item.spend && item.spend > 0) // Filtra plataformas com investimento
        .map((item, index) => (
          <Row key={index} className="platform-row">
            <Col xs={12} sm={12} md={12} lg={12} className="platform">
              <div className="platform-header">
                <div className="icon">{getIcon(item.platform)}</div>
                <div className="platform-info">
                  <strong>{item.platform}</strong>
                  <div className="investment" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    {item.spend ? `R$${item.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$0,00"}
                  </div>
                </div>
                <div className="metrics d-flex flex-wrap justify-content-end" style={{ marginLeft: 'auto', gap: '2rem' }}>
                  <div className="metric">
                    <span>CPM</span>
                    <strong>{item.CPM ? `R$${item.CPM.toFixed(2)}` : "R$0,00"}</strong>
                  </div>
                  <div className="metric">
                    <span>CPV</span>
                    <strong>{item.CPV ? `R$${item.CPV.toFixed(2)}` : "R$0,00"}</strong>
                  </div>
                  <div className="metric">
                    <span>CPC</span>
                    <strong>{item.CPC ? `R$${item.CPC.toFixed(2)}` : "R$0,00"}</strong>
                  </div>
                  <div className="metric">
                    <span>CTR</span>
                    <strong>{item.CTR ? `${(item.CTR * 100).toFixed(2)}%` : "0%"}</strong>
                  </div>
                  <div className="metric">
                    <span>VTR</span>
                    <strong>{item.VTR ? `${(item.VTR * 100).toFixed(2)}%` : "0%"}</strong>
                  </div>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${calculateProgress(item)}%`,
                    backgroundColor: "#ff4027",
                  }}
                ></div>
              </div>
            </Col>
          </Row>
        ))}
    </Card>
  );
};

export default Veiculos_investimentos;