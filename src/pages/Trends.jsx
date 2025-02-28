import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import xLogo from '../assets/x-logo.png';
import googleLogo from '../assets/google-logo.png';
import instagramLogo from '../assets/instagram-logo.png';
import tiktokLogo from '../assets/tiktok-logo.png';
import GoogleTrendsRss from '../components/GoogleTrends';

// Estilos customizados
const styles = {
  pageContainer: {
    fontFamily: 'Rawline, Inter, sans-serif',
    backgroundColor: '#f5f7fa',
    padding: '2rem 0',
  },
  mainContent: {
    padding: '2rem 3rem',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    marginBottom: '2.5rem',
    position: 'relative',
    paddingBottom: '1rem',
  },
  card: {
    borderRadius: '16px',
    border: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column', // Garante que o conteúdo do card seja organizado em coluna
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  cardLogo: {
    width: '28px',
    height: '28px',
    objectFit: 'contain',
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    margin: 0,
    color: '#1a1a1a',
  },
  trendItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  trendItemHover: {
    backgroundColor: '#f8f9fa',
  },
  trendRank: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: '1rem',
    fontWeight: '600',
  },
  trendName: {
    fontWeight: '500',
    fontSize: '1.05rem',
    color: '#333',
  },
  trendMetric: {
    color: '#6B7280',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  button: {
    borderRadius: '12px',
    padding: '0.75rem',
    fontWeight: '500',
    fontSize: '1rem',
    border: 'none',
    marginTop: 'auto', // Empurra o botão para o final do card
    transition: 'all 0.2s ease',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  iframeContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    height: '600px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
};

// Paleta de cores para os botões
const platformColors = {
  tiktok: {
    bg: '#000000',
    hover: '#1D1D1D',
  },
  x: {
    bg: '#1DA1F2',
    hover: '#0D8BDB',
  },
  google: {
    bg: '#EA4335',
    hover: '#D62D1E',
  },
  instagram: {
    bg: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    hover: 'linear-gradient(45deg, #e38a2f 0%, #d55e37 25%, #c7233c 50%, #b71f5c 75%, #a7157a 100%)',
  },
};

function TrendingTopics() {
  const trendingGoogle = [
    { rank: 1, topic: "atlético-mg x athletic", searches: "5M+" },
    { rank: 2, topic: "sport recife x fortaleza", searches: "2.8M+" },
    { rank: 3, topic: "atlético madrid x getafe", searches: "1.5M+" },
    { rank: 4, topic: "sintonia 5 temporada", searches: "1.2M+" },
    { rank: 5, topic: "aniversário do neymar", searches: "980K+" }
  ];

  const trendingInstagram = [
    { rank: 1, topic: "#brasil", likes: "1.2M" },
    { rank: 2, topic: "#brazil", likes: "980K" },
    { rank: 3, topic: "#love", likes: "875K" },
    { rank: 4, topic: "#instagood", likes: "750K" },
    { rank: 5, topic: "#riodejaneiro", likes: "680K" }
  ];

  // Componente para o item de tendência
  const TrendItem = ({ rank, topic, metric }) => (
    <div style={styles.trendItem} className="trend-item">
      <div className="d-flex align-items-center">
        <span style={styles.trendRank}>{rank}</span>
        <span style={styles.trendName}>{topic}</span>
      </div>
      <span style={styles.trendMetric}>{metric}</span>
    </div>
  );

  return (
    <div style={styles.pageContainer}>
      <Container fluid style={styles.mainContent}>
        <div className="mb-5">
          <h1 style={styles.pageTitle}>
            ASSUNTOS DO MOMENTO
          </h1>
        </div>

        <Row className="g-4">
          {/* TikTok Card */}
          <Col lg={3} md={6}>
            <Card style={styles.card} className="h-100">
              <div style={styles.cardHeader}>
                <Image src={tiktokLogo} alt="TikTok Logo" style={styles.cardLogo} />
                <h3 style={styles.cardTitle}>TikTok Trending</h3>
              </div>
              <div style={styles.iframeContainer}>
                <iframe 
                  src="https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/pt" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none'
                  }} 
                  title="TikTok Trending" 
                />
              </div>
              <Card.Body style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Button 
                  className="w-100 mt-auto" // mt-auto empurra o botão para o final
                  style={{
                    ...styles.button,
                    backgroundColor: platformColors.tiktok.bg,
                  }}
                  onClick={() => window.open("https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/pt", "_blank")}
                >
                  Ver mais no TikTok
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* X Card */}
          <Col lg={3} md={6}>
            <Card style={styles.card} className="h-100">
              <div style={styles.cardHeader}>
                <Image src={xLogo} alt="X Logo" style={styles.cardLogo} />
                <h3 style={styles.cardTitle}>X Trends</h3>
              </div>
              <div style={styles.iframeContainer}>
                <iframe 
                  src="https://trends24.in/brazil/" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none'
                  }} 
                  title="TikTok Trending" 
                />
              </div>
              <Card.Body style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Button 
                  className="w-100 mt-auto"
                  style={{
                    ...styles.button,
                    backgroundColor: platformColors.x.bg,
                  }}
                  onClick={() => window.open("https://trends24.in/brazil/", "_blank")}
                >
                  Ver mais no X
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Google Card */}
          <Col lg={3} md={6}>
            <Card style={styles.card} className="h-100">
              <div style={styles.cardHeader}>
                <Image src={googleLogo} alt="Google Logo" style={styles.cardLogo} />
                <h3 style={styles.cardTitle}>Google Trends - Em alta</h3>
              </div>
              <Card.Body style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <GoogleTrendsRss />
                <Button 
                  className="w-100 mt-auto"
                  style={{
                    ...styles.button,
                    backgroundColor: platformColors.google.bg,
                  }}
                  onClick={() => window.open("https://trends.google.com/trending?geo=BR", "_blank")}
                >
                  Ver mais no Google
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Instagram Card */}
          <Col lg={3} md={6}>
            <Card style={styles.card} className="h-100">
              <div style={styles.cardHeader}>
                <Image src={instagramLogo} alt="Instagram Logo" style={styles.cardLogo} />
                <h3 style={styles.cardTitle}>Instagram Trends</h3>
              </div>
              <Card.Body style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {trendingInstagram.map((trend, index) => (
                  <TrendItem 
                    key={index} 
                    rank={trend.rank} 
                    topic={trend.topic} 
                    metric={trend.likes} 
                  />
                ))}
                <Button 
                  className="w-100 mt-auto"
                  style={{
                    ...styles.button,
                    background: platformColors.instagram.bg,
                  }}
                >
                  Ver mais no Instagram
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TrendingTopics;