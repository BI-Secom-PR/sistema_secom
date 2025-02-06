import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaPinterest, FaLinkedin, FaGoogle } from "react-icons/fa";
import { fetchPlatformMetrics } from '../data/fetchMetrics';
import tiktokLogo from "../assets/tiktok-logo.png";

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
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
        <span className="ms-3">Carregando métricas...</span>
      </div>
    );
  }

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram": return <FaInstagram style={{ color: "#E1306C" }} />;
      case "facebook": return <FaFacebook style={{ color: "#4267B2" }} />;
      case "pinterest": return <FaPinterest style={{ color: "#E60023" }} />;
      case "linkedin": return <FaLinkedin style={{ color: "#0077B5" }} />;
      case "google": return <FaGoogle style={{ color: "#DB4437" }} />;
      case "tiktok": return <img src={tiktokLogo} alt="TikTok Logo" width="24" height="24" />;
      default: return null;
    }
  };

  const calculateProgress = (platform) => {
    if (platform.spend && platform.impressions) {
      return Math.min(100, (platform.spend / platform.impressions) * 100);
    }
    return 0;
  };

  const metricStyle = {
    width: '65px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 2px'
  };

  return (
    <Card className="investment-card">
      <h3 className="card-title">Investimento por veículo</h3>
      {metrics.map((item, index) => (
        <Row key={index} className="platform-row">
          <Col xs={12} className="platform">
            <div className="platform-header" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div className="icon" style={{ marginRight: '8px' }}>{getIcon(item.platform)}</div>
              <div className="platform-info" style={{ width: '150px', marginRight: '10px' }}>
                <strong style={{ fontSize: '1.1rem', display: 'block' }}>
                  {item.platform}
                </strong>
                <div className="investment" style={{ fontSize: '1.1rem' }}>
                  {item.spend
                    ? `R$${item.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                    : "R$0,00"}
                </div>
              </div>
              <div className="metrics" style={{ display: 'flex', justifyContent: 'space-between', gap: '2px', flex: 1 }}>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CPM</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.CPM ? `R$${item.CPM.toFixed(2)}` : "R$0,00"}
                  </strong>
                </div>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CPV</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.CPV ? `R$${item.CPV.toFixed(2)}` : "R$0,00"}
                  </strong>
                </div>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CPC</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.CPC ? `R$${item.CPC.toFixed(2)}` : "R$0,00"}
                  </strong>
                </div>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CTR</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.CTR ? `${(item.CTR * 100).toFixed(2)}%` : "0%"}
                  </strong>
                </div>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>VTR</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.VTR ? `${(item.VTR * 100).toFixed(2)}%` : "0%"}
                  </strong>
                </div>
              </div>
            </div>
            <div className="progress-bar" style={{ width: `${calculateProgress(item)}%` }}></div>
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default Veiculos_investimentos;