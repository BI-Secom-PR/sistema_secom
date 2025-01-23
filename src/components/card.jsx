import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { metricCards } from '../data/metricsCard'; // Importando o array de dados

function Cards() {
  return (
    <Row xs={1} md={5} className="g-4">
      {metricCards.map((metric, idx) => (
        <Col key={idx} >
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
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Cards;
