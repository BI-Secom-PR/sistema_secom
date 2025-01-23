import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { metricCards } from '../data/metricsCard';

function Cards() {
  const getPercentageDiff = (current, previous) => {
    const diff = ((current - previous) / previous) * 100;
    return diff.toFixed(2);
  }

  return (
    <Row xs={1} md={5} className="g-4">
      {metricCards.map((metric, idx) => {
        const percentageDiff = getPercentageDiff(metric.currentValue, metric.previousValue);
        const isPositive = percentageDiff > 0;

        return (
          <Col key={idx}>
            <Card className={`metric-card ${metric.type}`}>
              <Card.Body className="metric-card-body">
                <div className="metric-content">
                  <div>
                    <Card.Title className="metric-title">{metric.title}</Card.Title>
                    <Card.Text className="metric-type">Valores: {metric.type}</Card.Text>
                  </div>
                  <div className="icon-container">{metric.icon}</div>
                </div>
              </Card.Body>
              <Card.Footer style={{ whiteSpace: 'nowrap', fontSize: '16px' }}>
              <small className={`text-${isPositive ? 'success' : 'danger'} d-inline-flex align-items-center`}>
                {isPositive ? '↑' : '↓'} {Math.abs(percentageDiff)}% em relação ao período anterior
              </small>
              </Card.Footer>
            </Card>
          </Col>
        )
      })}
    </Row>
  );
}

export default Cards;