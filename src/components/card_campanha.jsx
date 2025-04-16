import { useState, useEffect } from "react";
import { Card, Spinner, Badge } from "react-bootstrap";
import { fetchCampaigns } from "../data/fetchMetrics";
import { graficoMetrics } from "../data/graficoMetrics";
import { useTheme } from "../context/ThemeContext";

// Componente para item de campanha
const CampaignItem = ({ campaign, isSelected, colors, styles, onSelect }) => {
  const dotColor = campaign.isActive ? (isSelected ? colors.selected : colors.primary) : "#afafaf";
  const dotStyle = {
    ...styles.statusDot,
    backgroundColor: dotColor,
    boxShadow: campaign.isActive ? "0 0 0 2px rgba(0, 208, 0, 0.2)" : "none",
  };

  return (
    <div
      style={{
        ...styles.campaignItem,
        ...(isSelected ? styles.selectedCampaign : {}),
      }}
      onClick={() => onSelect(campaign.Nome_Interno_Campanha)}
    >
      <span style={dotStyle} />
      <div style={styles.campaignName}>{campaign.Nome_Interno_Campanha || "Em definição..."}</div>
    </div>
  );
};

// Componente principal
const CardCampanha = ({ onCampaignSelect, startDate, endDate, selectedCampaign }) => {
  const { isDarkMode } = useTheme();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAbove4K, setIsAbove4K] = useState(false);

  // Verifica resolução > 4K
  useEffect(() => {
    const checkResolution = () => {
      setIsAbove4K(window.innerWidth > 3840 || window.innerHeight > 2160);
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  const colors = {
    primary: isDarkMode ? "#00D000" : "#00D000",
    secondary: isDarkMode ? "#ffffff" : "#1E293B",
    selected: isDarkMode ? "#008500" : "#008500",
    border: isDarkMode ? "#444444" : "#E2E8F0",
    background: isDarkMode ? "#2d2d2d" : "#F8FAFC",
    lightBg: isDarkMode ? "#2c2c2c" : "#fefeff",
    error: "#EF4444",
    text: {
      primary: isDarkMode ? "#ffffff" : "#1E293B",
      secondary: isDarkMode ? "#d3dae4" : "#64748B",
      light: isDarkMode ? "#d3dae4" : "#94A3B8",
    },
  };

  const styles = {
    card: {
      border: `1px solid ${colors.border}`,
      borderRadius: "16px",
      padding: "24px",
      width: "100%",
      minHeight: "500px",
      fontFamily: "Rawline, sans-serif",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      background: `linear-gradient(to bottom, ${colors.background}, ${colors.lightBg})`,
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    },
    header: {
      marginBottom: "20px",
      paddingBottom: "12px",
      borderBottom: `1px solid ${colors.border}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: isAbove4K ? "1.75rem" : "1rem", // Aumentado para +75% (1rem → 1.75rem)
      fontWeight: "700",
      color: colors.secondary,
      margin: 0,
    },
    badge: {
      backgroundColor: colors.primary,
      padding: "4px 8px",
      borderRadius: "20px",
      fontSize: isAbove4K ? "1.2rem" : "0.7rem", // Aumentado para ~75% (0.7rem → 1.2rem)
      fontWeight: "600",
      color: "white",
      display: "inline-block",
      alignSelf: "center",
    },
    campaignsList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flex: 1,
      padding: "4px",
      ...(campaigns.length > 15 ? { overflowY: "auto", maxHeight: "1012px" } : {}),
    },
    campaignItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      padding: isAbove4K ? "16px 20px" : "12px 16px", // Aumentado para fontes maiores
      cursor: "pointer",
      borderRadius: "12px",
      border: "1px solid transparent",
      transition: "all 0.2s ease",
      backgroundColor: colors.background,
      minHeight: isAbove4K ? "100px" : "60px", // Aumentado para acomodar fonte maior
    },
    selectedCampaign: {
      backgroundColor: `${colors.primary}40`,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
    statusDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: colors.primary,
      flexShrink: 0,
      marginTop: "4px",
    },
    campaignName: {
      flex: 1,
      fontWeight: "500",
      color: colors.text.primary,
      fontSize: isAbove4K ? "1.5rem" : "14px", // Aumentado para ~75% (14px → 1.5rem)
      lineHeight: "1.4",
      wordBreak: "break-word",
      whiteSpace: "normal",
      display: "block",
      maxWidth: "100%",
      hyphens: "auto",
    },
    errorMessage: {
      padding: "16px",
      borderRadius: "8px",
      color: colors.error,
      backgroundColor: `${colors.error}10`,
      fontWeight: "500",
      marginBottom: "16px",
      fontSize: isAbove4K ? "1.75rem" : "1rem", // Aumentado para +75% (1rem → 1.75rem)
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 0",
      color: colors.text.secondary,
      textAlign: "center",
      flex: 1,
      fontSize: isAbove4K ? "1.75rem" : "1rem", // Aumentado para +75% (1rem → 1.75rem)
    },
    spinner: {
      color: colors.primary,
      width: "3rem",
      height: "3rem",
    },
  };

  const loadCampaigns = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const data = await fetchCampaigns(startDate, endDate);
      console.log("Dados retornados por fetchCampaigns:", data);
      
      const yesterday = new Date(endDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(endDate);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      const campaignsWithStatus = await Promise.all(
        data.map(async (campaign) => {
          console.log(`Buscando métricas para campanha: ${campaign.Nome_Interno_Campanha}`);
          const metrics = await graficoMetrics(startDate, endDate, campaign.Nome_Interno_Campanha);
          console.log(`Métricas retornadas para ${campaign.Nome_Interno_Campanha}:`, metrics);
          
          // Verifica métrica do dia anterior
          const yesterdayMetric = metrics.actual.find(
            (item) => new Date(item.date).toDateString() === yesterday.toDateString()
          );
          console.log(`Métrica do dia anterior (${yesterday.toDateString()}) para ${campaign.Nome_Interno_Campanha}:`, yesterdayMetric);
  
          // Se há métrica do dia anterior com impressões, a campanha é ativa
          if (yesterdayMetric && yesterdayMetric.impressions > 0) {
            console.log(`Campanha ${campaign.Nome_Interno_Campanha} marcada como ATIVA (métrica do dia anterior encontrada)`);
            return {
              ...campaign,
              isActive: true,
            };
          }
  
          // Verifica a última métrica com impressões
          const lastActiveMetric = metrics.actual
            .filter((item) => item.impressions > 0)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
          console.log(`Última métrica com impressões para ${campaign.Nome_Interno_Campanha}:`, lastActiveMetric);
  
          // Se não há métrica com impressões ou a última métrica é anterior a 2 dias, a campanha é inativa
          const isInactive = !lastActiveMetric || new Date(lastActiveMetric.date) <= twoDaysAgo;
          console.log(`Campanha ${campaign.Nome_Interno_Campanha} marcada como ${isInactive ? "INATIVA" : "ATIVA"}`);
  
          return {
            ...campaign,
            isActive: !isInactive,
          };
        })
      );
  
      console.log("Campanhas com status final:", campaignsWithStatus);
      setCampaigns(campaignsWithStatus);
    } catch (err) {
      setError("Erro ao carregar campanhas. Por favor, tente novamente.");
      console.error("Erro ao carregar campanhas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, [startDate, endDate]);

  const handleCampaignSelect = (campaignName) => {
    onCampaignSelect(campaignName === selectedCampaign ? null : campaignName);
  };

  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>Em veiculação</h2>
        <Badge style={styles.badge}>{campaigns.length} campanhas</Badge>
      </div>

      {error && <div style={styles.errorMessage}>{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Spinner animation="border" style={styles.spinner}>
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : campaigns.length > 0 ? (
        <div style={styles.campaignsList} className="custom-scrollbar">
          {campaigns.map((campaign) => (
            <CampaignItem
              key={campaign.Nome_Interno_Campanha}
              campaign={campaign}
              isSelected={selectedCampaign === campaign.Nome_Interno_Campanha}
              colors={colors}
              styles={styles}
              onSelect={handleCampaignSelect}
            />
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text.light}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ marginTop: "16px", fontWeight: "500", fontSize: isAbove4K ? "1.75rem" : "1rem" }}>
            Nenhuma campanha ativa encontrada.
          </p>
        </div>
      )}
    </Card>
  );
};

export default CardCampanha;