import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { fetchMetrics } from '../data/fetchMetrics';
import metricCards from '../data/metricsCard';

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

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
      {metricCards.map((metric, idx) => {
        const matchedMetric = metrics.find(m => m.type === metric.type);
        const currentValue = matchedMetric ? matchedMetric.currentValue : null;
        const previousValue = matchedMetric ? matchedMetric.previousValue : null;
        const percentageDiff = currentValue !== null ? getPercentageDiff(currentValue, previousValue) : null;
        const isPositive = percentageDiff > 0;

        return (
          <Col key={idx} className="d-flex">
            <Card className={`metric-card ${metric.type} w-100`} style={{ minHeight: '200px' }}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center p-3">
                <div className="metric-content d-flex flex-column justify-content-center align-items-center gap-2">
                  <Card.Title className="metric-title h5 text-center text-truncate">
                    {metric.title}
                  </Card.Title>
                  {loading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    <Card.Text className="metric-type mb-0 text-center fw-bold" style={{ fontSize: '1.6rem' }}>
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
                <div className="d-flex align-items-center justify-content-center">
                  {loading ? (
                    <Spinner animation="border" variant="secondary" size="sm" />
                  ) : (
                    <small className={`text-${isPositive ? 'success' : 'danger'} h6`}>
                      {isPositive ? '↑' : '↓'} {Math.abs(percentageDiff)}%
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