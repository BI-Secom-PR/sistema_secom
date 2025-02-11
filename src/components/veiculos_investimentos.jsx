import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaPinterest, FaLinkedin, FaGoogle } from "react-icons/fa";
import { fetchPlatformMetrics } from '../data/fetchMetrics';
import tiktokLogo from "../assets/tiktok-logo.png";
import kwaiLogo from "../assets/kwai-logo.png";
import youtubeLogo from "../assets/youtube-logo.png";
import gdnLogo from "../assets/gdn-logo.png"

const Veiculos_investimentos = ({ startDate, endDate, selectedCampaign }) => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const getMetrics = async () => {
      const result = await fetchPlatformMetrics(startDate, endDate, selectedCampaign);
      
      // Lista de todas as plataformas que devem ser exibidas
      const allPlatforms = [
        { platform: "Instagram", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "Facebook", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "Pinterest", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "Linkedin", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "Google", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "Tiktok", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "Kwai", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "Youtube", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        { platform: "GDN", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
      ];

      // Mescla os dados retornados com a lista de todas as plataformas
      const mergedMetrics = allPlatforms.map(platform => {
        const found = result.find(item => item.platform.toLowerCase() === platform.platform.toLowerCase());
        return found ? found : platform;
      });

      setMetrics(mergedMetrics);
    };

    getMetrics();
  }, [startDate, endDate, selectedCampaign]);

  if (!metrics.length) {
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
      case "kwai": return <img src={kwaiLogo} alt="Kwai Logo" width="24" height="24" />;
      case "youtube": return <img src={youtubeLogo} alt="Kwai Logo" width="34" height="24" />;
      case "gdn": return <img src={gdnLogo} alt="Kwai Logo" width="34" height="24" />;
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
    padding: '0 1px' // Diminui o espaçamento interno
  };

  const sortedMetrics = [...metrics].sort((a, b) => (b.spend || 0) - (a.spend || 0));

  return (
    <Card className="investment-card">
      <h3 className="card-title">Investimento por veículo</h3>
      {sortedMetrics.map((item, index) => (
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
                    ? `R$ ${item.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                    : "R$ 0,00"}
                </div>
              </div>
              <div className="metrics" style={{ display: 'flex', justifyContent: 'space-between', gap: '1px', flex: 1 }}>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CPM</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.CPM ? `R$ ${item.CPM.toFixed(2)}` : "R$0,00"}
                  </strong>
                </div>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CPV</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.CPV ? `R$ ${item.CPV.toFixed(2)}` : "R$0,00"}
                  </strong>
                </div>
                <div style={metricStyle}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CPC</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                    {item.CPC ? `R$ ${item.CPC.toFixed(2)}` : "R$0,00"}
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
}

export default Veiculos_investimentos;