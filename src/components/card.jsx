import { useState, useEffect } from "react";
import { Card, Col, Row, Spinner, Badge } from "react-bootstrap";
import { fetchMetrics } from "../data/fetchMetrics";
import metricCards from "../data/metricsCard";
import { useTheme } from "../context/ThemeContext";

// Componente para cada card de métrica
const MetricCard = ({ metric, metrics, loading, isDarkMode, cardColors, isAbove4K }) => {
  const matchedMetric = metrics.find((m) => m.type === metric.type);
  const currentValue = matchedMetric ? matchedMetric.currentValue : null;
  const previousValue = matchedMetric ? matchedMetric.previousValue : null;
  const percentageDiff = currentValue !== null ? getPercentageDiff(currentValue, previousValue) : null;
  const isPositive = percentageDiff > 0;
  const isZero = percentageDiff === "0.00" || percentageDiff === null;

  const colors = cardColors[metric.type] || {
    bg: isDarkMode ? "#2d2d2d" : "#F8FAFC",
    border: isDarkMode ? "#444444" : "#CBD5E1",
    gradient: isDarkMode
      ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
      : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
  };

  return (
    <Col className="d-flex">
      <Card
        style={{
          minHeight: isAbove4K ? "300px" : "220px", // Aumentado para fontes maiores
          position: "relative",
          borderRadius: "16px",
          border: `1px solid ${colors.border}`,
          background: colors.gradient,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          overflow: "hidden",
        }}
        className="w-100 h-100"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow =
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        }}
      >
        {getIcon(metric.type)}
        <Card.Body className="d-flex flex-column p-4" style={{ zIndex: 2, position: "relative" }}>
          <Card.Title
            style={{
              fontSize: isAbove4K ? "1.75rem" : "16px", // Aumentado para +75% (16px → 1.75rem)
              color: isDarkMode ? "#ffffff" : "#1E293B",
              fontWeight: "600",
              letterSpacing: "0.025em",
              marginBottom: "20px",
            }}
          >
            {metric.title}
          </Card.Title>
          <div className="flex-grow-1 d-flex align-items-center">
            {loading ? (
              <div className="d-flex justify-content-center w-100">
                <Spinner
                  animation="border"
                  style={{
                    color: colors.border,
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                />
              </div>
            ) : (
              <div className="d-flex flex-column">
                <div
                  style={{
                    fontSize: isAbove4K ? "3.5rem" : "32px", // Aumentado para +75% (32px → 3.5rem)
                    fontWeight: "700",
                    color: isDarkMode ? "#ffffff" : "#1E293B",
                    lineHeight: "1.2",
                  }}
                >
                  {currentValue !== null && currentValue !== undefined
                    ? metric.type === "investment"
                      ? `R$ ${currentValue.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : Math.round(currentValue).toLocaleString("pt-BR")
                    : "—"}
                </div>
              </div>
            )}
          </div>
        </Card.Body>
        <Card.Footer
          style={{
            backgroundColor: "transparent",
            borderTop: `1px solid ${colors.border}20`,
            padding: isAbove4K ? "16px 20px" : "12px 16px", // Aumentado para fontes maiores
          }}
        >
          <div className="d-flex align-items-center">
            {loading ? (
              <Spinner animation="border" variant="secondary" size="sm" />
            ) : (
              <>
                {!isZero && (
                  <Badge
                    pill
                    bg={isPositive ? "success" : "danger"}
                    style={{
                      opacity: 0.9,
                      padding: "0.4rem 0.75rem",
                      fontSize: isAbove4K ? "1.5rem" : "14px", // Aumentado para +75% (14px → 1.5rem)
                      fontWeight: "600",
                    }}
                  >
                    {isPositive ? "↑" : "↓"} {Math.abs(percentageDiff)}%
                  </Badge>
                )}
                <span
                  style={{
                    fontSize: isAbove4K ? "1.4rem" : "13px", // Aumentado para ~75% (13px → 1.4rem)
                    color: isDarkMode ? "#94A3B8" : "#64748B",
                    marginLeft: isZero ? "0" : "10px",
                    fontWeight: "500",
                  }}
                >
                  {isZero ? "Sem alteração" : "em relação ao período anterior"}
                </span>
              </>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

// Função para calcular a diferença percentual
const getPercentageDiff = (current, previous) => {
  if (!previous || previous === 0) {
    return current > 0 ? "100.00" : "0.00";
  }
  return (((current - previous) / previous) * 100).toFixed(2);
};

// Função para obter o ícone
const getIcon = (type) => {
  const iconSize = 120;
  const iconContainerStyle = {
    position: "absolute",
    top: "-20px",
    right: "-20px",
    opacity: 0.1,
    zIndex: 1,
  };

  const icons = {
    investment: "https://img.icons8.com/?size=100&id=isKLtsMbtVgn&format=png&color=000000",
    clicks: "https://img.icons8.com/?size=100&id=11202&format=png&color=000000",
    views: "https://img.icons8.com/?size=100&id=60022&format=png&color=000000",
    engagement: "https://img.icons8.com/?size=100&id=qtmxiFzhBiJq&format=png&color=000000",
    impressions: "https://img.icons8.com/?size=100&id=d9LlgLF7QeYY&format=png&color=000000",
  };

  return icons[type] ? (
    <div style={iconContainerStyle}>
      <img src={icons[type]} alt={type} width={iconSize} height={iconSize} />
    </div>
  ) : null;
};

// Componente principal
const Cards = ({ startDate, endDate, selectedCampaign }) => {
  const { isDarkMode } = useTheme();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAbove4K, setIsAbove4K] = useState(false); // Novo estado para resolução

  // Verifica resolução > 4K
  useEffect(() => {
    const checkResolution = () => {
      setIsAbove4K(window.innerWidth > 3840 || window.innerHeight > 2160);
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  const cardColors = {
    investment: {
      bg: isDarkMode ? "#2d2d2d" : "#ffffff",
      border: isDarkMode ? "#444444" : "#E2E8F0",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
    },
    clicks: {
      bg: isDarkMode ? "#2d2d2d" : "#ffffff",
      border: isDarkMode ? "#444444" : "#E2E8F0",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
    },
    engagement: {
      bg: isDarkMode ? "#2d2d2d" : "#ffffff",
      border: isDarkMode ? "#444444" : "#E2E8F0",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
    },
    views: {
      bg: isDarkMode ? "#2d2d2d" : "#ffffff",
      border: isDarkMode ? "#444444" : "#E2E8F0",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
    },
    impressions: {
      bg: isDarkMode ? "#2d2d2d" : "#ffffff",
      border: isDarkMode ? "#444444" : "#E2E8F0",
      gradient: isDarkMode
        ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
    },
  };

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const data = await fetchMetrics(metricCards, startDate, endDate, selectedCampaign);
      setMetrics(data);
    } catch (error) {
      console.error("Erro ao carregar métricas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, [startDate, endDate, selectedCampaign]);

  return (
    <Row
      xs={1}
      sm={2}
      md={3}
      lg={4}
      xl={5}
      className="g-4"
      style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}
    >
      {metricCards.map((metric, idx) => (
        <MetricCard
          key={idx}
          metric={metric}
          metrics={metrics}
          loading={loading}
          isDarkMode={isDarkMode}
          cardColors={cardColors}
          isAbove4K={isAbove4K} // Passando isAbove4K para o MetricCard
        />
      ))}
    </Row>
  );
};

export default Cards;