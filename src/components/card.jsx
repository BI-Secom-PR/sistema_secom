import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { fetchMetrics } from '../data/fetchMetrics';
import metricCards from '../data/metricsCard';
import '../Cards.css'; // Novo arquivo de estilos CSS

function Cards({ startDate, endDate, selectedCampaign }) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const data = await fetchMetrics(metricCards, startDate, endDate, selectedCampaign);
      setMetrics(data);
    } catch (error) {
      console.error('Erro ao carregar métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, [startDate, endDate, selectedCampaign]);

  const getPercentageDiff = (current, previous) => {
    if (!previous || previous === 0) {
      return current > 0 ? '100.00' : '0.00';
    }
    return (((current - previous) / previous) * 100).toFixed(2);
  };

  const getIcon = (type) => {
    const iconContainerStyle = {
      backgroundColor: '#b3e1ff', // Azul claro quase branco
      padding: '10px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    const iconSize = 30;

    switch (type) {
      case 'investment':
        return <div style={iconContainerStyle}><img src="https://img.icons8.com/?size=100&id=QHui8fGzf5rs&format=png&color=000000" alt="investment" width={iconSize} height={iconSize} /></div>;
      case 'clicks':
        return <div style={iconContainerStyle}><img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="clicks" width={iconSize} height={iconSize} /></div>;
      case 'views':
        return <div style={iconContainerStyle}><img src="https://img.icons8.com/?size=100&id=85028&format=png&color=000000" alt="views" width={iconSize} height={iconSize} /></div>;
      case 'engagement':
        return <div style={iconContainerStyle}><img src="https://img.icons8.com/?size=100&id=qtmxiFzhBiJq&format=png&color=000000" alt="engagement" width={iconSize} height={iconSize} /></div>;
      case 'impressions':
        return <div style={iconContainerStyle}><img src="https://img.icons8.com/?size=100&id=3TL0RN7MtStC&format=png&color=000000" alt="impressions" width={iconSize} height={iconSize} /></div>;
      default:
        return null;
    }
  };

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 rawline-font">
      {metricCards.map((metric, idx) => {
        const matchedMetric = metrics.find(m => m.type === metric.type);
        const currentValue = matchedMetric ? matchedMetric.currentValue : null;
        const previousValue = matchedMetric ? matchedMetric.previousValue : null;
        let percentageDiff = currentValue !== null ? getPercentageDiff(currentValue, previousValue) : null;

        const isPositive = percentageDiff > 0;
        const isZero = percentageDiff === '0.00' || percentageDiff === null;

        return (
          <Col key={idx} className="d-flex">
            <Card className={`metric-card ${metric.type} w-100 rawline-font`} style={{ minHeight: '200px' }}>
              <Card.Body className="d-flex flex-column p-3">
                <div className="metric-content d-flex flex-column gap-2">
                  <Card.Title className="d-flex align-items-center justify-content-between gap-2 rawline-title">
                    {metric.title}
                    {getIcon(metric.type)}
                  </Card.Title>
                  {loading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    <Card.Text className="metric-type mb-0 text-left fw-bold rawline-metric" style={{ fontSize: '1.6rem' }}>
                      {currentValue !== null && currentValue !== undefined
                        ? metric.type === 'investment'
                          ? `R$ ${currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          : Math.round(currentValue).toLocaleString('pt-BR')
                        : '—'}
                    </Card.Text>
                  )}
                </div>
              </Card.Body>
              <Card.Footer className="py-2">
                <div className="d-flex align-items-left justify-content-left">
                  {loading ? (
                    <Spinner animation="border" variant="secondary" size="sm" />
                  ) : (
                    <small 
                      className={`text-${isZero ? 'muted' : isPositive ? 'success' : 'danger'} rawline-percentage`}
                      style={{ fontSize: '1.4rem', fontWeight: '600' }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>
                        {isZero ? '' : isPositive ? '↑' : '↓'}
                      </span>
                     
                      {Math.abs(percentageDiff)}%
                    </small>
                  )}
                </div>
              </Card.Footer>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default Cards;
