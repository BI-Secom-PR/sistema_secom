import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import xLogo from "../assets/x-logo.png";
import googleLogo from "../assets/google-logo.png";
import instagramLogo from "../assets/instagram-logo.png";
import tiktokLogo from "../assets/tiktok-logo.png";
import GoogleTrendsRss from "../components/GoogleTrends";

// Componente para item de tendência
const TrendItem = ({ rank, topic, metric, isDarkMode, styles }) => (
  <div
    style={styles.trendItem}
    className="trend-item"
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = isDarkMode ? "#3c3c3c" : "#f8f9fa";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = isDarkMode ? "#2c2c2c" : "#ffffff";
    }}
  >
    <div className="d-flex align-items-center">
      <span style={styles.trendRank}>{rank}</span>
      <span style={styles.trendName}>{topic}</span>
    </div>
    <span style={styles.trendMetric}>{metric}</span>
  </div>
);

// Componente para card de tendência
const TrendCard = ({ platform, logo, title, children, buttonUrl, buttonText, platformColors, styles, isDarkMode }) => (
  <Col lg={3} md={6}>
    <Card style={styles.card} className="h-100">
      <div style={styles.cardHeader}>
        <Image src={logo} alt={`${platform} Logo`} style={styles.cardLogo} />
        <h3 style={styles.cardTitle}>{title}</h3>
      </div>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
          padding: "1.5rem",
        }}
      >
        {children}
        <Button
          className="w-100 mt-auto"
          style={{
            ...styles.button,
            background: platformColors[platform].bg,
          }}
          onClick={() => window.open(buttonUrl, "_blank")}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

// Componente principal
const TrendingTopics = () => {
  const { isDarkMode } = useTheme();

  const styles = {
    pageContainer: {
      fontFamily: "Rawline, Inter, sans-serif",
      backgroundColor: isDarkMode ? "#1b1b1b" : "#f5f7fa",
      padding: "2rem 0",
      color: isDarkMode ? "#ffffff" : "#000000",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    mainContent: {
      padding: "2rem 3rem",
      maxWidth: "1440px",
      margin: "0 auto",
    },
    titleContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginBottom: "2.5rem",
      width: "100%",
    },
    pageTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      textAlign: "center",
      margin: 0,
      paddingBottom: "1rem",
      color: isDarkMode ? "#ffffff" : "#1a1a1a",
    },
    card: {
      borderRadius: "16px",
      border: "none",
      boxShadow: isDarkMode ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 4px 15px rgba(0, 0, 0, 0.07)",
      transition: "background-color 0.3s ease, color 0.3s ease",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    cardHeader: {
      padding: "1.5rem",
      borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
    },
    cardLogo: {
      width: "28px",
      height: "28px",
      objectFit: "contain",
      filter: isDarkMode ? "brightness(0.9)" : "none",
    },
    cardTitle: {
      fontSize: "1.3rem",
      fontWeight: "600",
      margin: 0,
      color: isDarkMode ? "#ffffff" : "#1a1a1a",
    },
    trendItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 1.5rem",
      borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
      transition: "background-color 0.2s ease",
      cursor: "pointer",
      backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
    },
    trendRank: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
      marginRight: "1rem",
      fontWeight: "600",
      color: isDarkMode ? "#cccccc" : "#333333",
    },
    trendName: {
      fontWeight: "500",
      fontSize: "1.05rem",
      color: isDarkMode ? "#ffffff" : "#333",
    },
    trendMetric: {
      color: isDarkMode ? "#cccccc" : "#6B7280",
      fontSize: "0.9rem",
      fontWeight: "500",
    },
    button: {
      borderRadius: "12px",
      padding: "0.75rem",
      fontWeight: "500",
      fontSize: "1rem",
      border: "none",
      marginTop: "auto",
      transition: "background-color 0.2s ease",
    },
    iframeContainer: {
      borderRadius: "12px",
      overflow: "hidden",
      height: "600px",
      border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
    },
  };

  const platformColors = {
    tiktok: {
      bg: "#000000",
      hover: "#1D1D1D",
    },
    x: {
      bg: "#1DA1F2",
      hover: "#0D8BDB",
    },
    google: {
      bg: "#EA4335",
      hover: "#D62D1E",
    },
    instagram: {
      bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      hover: "linear-gradient(45deg, #e38a2f 0%, #d55e37 25%, #c7233c 50%, #b71f5c 75%, #a7157a 100%)",
    },
  };

  const trendingInstagram = [
    { rank: 1, topic: "#brasil", likes: "1.2M" },
    { rank: 2, topic: "#brazil", likes: "980K" },
    { rank: 3, topic: "#love", likes: "875K" },
    { rank: 4, topic: "#instagood", likes: "750K" },
    { rank: 5, topic: "#riodejaneiro", likes: "680K" },
  ];

  return (
    <div style={styles.pageContainer}>
      <Container fluid style={styles.mainContent}>
        <div className="mb-5">
          <div style={styles.titleContainer}>
            <h1 style={styles.pageTitle}>ASSUNTOS DO MOMENTO</h1>
          </div>
        </div>

        <Row className="g-4">
          <TrendCard
            platform="tiktok"
            logo={tiktokLogo}
            title="TikTok Trending"
            buttonUrl="https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/pt"
            buttonText="Ver mais no TikTok"
            platformColors={platformColors}
            styles={styles}
            isDarkMode={isDarkMode}
          >
            <div style={styles.iframeContainer}>
              <iframe
                src="https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/pt"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="TikTok Trending"
              />
            </div>
          </TrendCard>

          <TrendCard
            platform="x"
            logo={xLogo}
            title="X Trends"
            buttonUrl="https://trends24.in/brazil/"
            buttonText="Ver mais no X"
            platformColors={platformColors}
            styles={styles}
            isDarkMode={isDarkMode}
          >
            <div style={styles.iframeContainer}>
              <iframe
                src="https://trends24.in/brazil/"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="X Trending"
              />
            </div>
          </TrendCard>

          <TrendCard
            platform="google"
            logo={googleLogo}
            title="Google Trends - Em alta"
            buttonUrl="https://trends.google.com/trending?geo=BR"
            buttonText="Ver mais no Google"
            platformColors={platformColors}
            styles={styles}
            isDarkMode={isDarkMode}
          >
            <GoogleTrendsRss isDarkMode={isDarkMode} />
          </TrendCard>

          <TrendCard
            platform="instagram"
            logo={instagramLogo}
            title="Instagram Trends"
            buttonUrl="" // Instagram não tem URL funcional no original
            buttonText="Ver mais no Instagram"
            platformColors={platformColors}
            styles={styles}
            isDarkMode={isDarkMode}
          >
            {trendingInstagram.map((trend, index) => (
              <TrendItem
                key={index}
                rank={trend.rank}
                topic={trend.topic}
                metric={trend.likes}
                isDarkMode={isDarkMode}
                styles={styles}
              />
            ))}
          </TrendCard>
        </Row>
      </Container>
    </div>
  );
};

export default TrendingTopics;