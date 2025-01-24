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
  <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
    {metricCards.map((metric, idx) => {
      const percentageDiff = getPercentageDiff(metric.currentValue, metric.previousValue);
      const isPositive = percentageDiff > 0;

      return (
        <Col key={idx} className="d-flex">
          <Card className={`metric-card ${metric.type} w-100`} style={{minHeight: '200px'}}>
            <Card.Body className="d-flex flex-column justify-content-between p-3">
              <div className="metric-content d-flex flex-column flex-sm-row justify-content-between gap-3">
                <div className="d-flex flex-column gap-2 flex-grow-1">
                  <Card.Title className="metric-title h5 text-truncate" style={{maxWidth: '100%'}}>
                    {metric.title}
                  </Card.Title>
                  <Card.Text className="metric-type text-secondary mb-0 text-truncate">
                    Valores: {metric.type}
                  </Card.Text>
                </div>
                <div className="icon-container d-flex justify-content-center align-items-center">
                  {metric.icon}
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="py-2">
              <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                <small 
                  className={`text-${isPositive ? 'success' : 'danger'} d-inline-block text-truncate`}
                  style={{maxWidth: '100%'}}
                  title={`${Math.abs(percentageDiff)}% em relação ao período anterior`}
                >
                  {isPositive ? '↑' : '↓'} {Math.abs(percentageDiff)}% em relação ao período anterior
                </small>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      )
    })}
  </Row>
);
}

export default Cards;