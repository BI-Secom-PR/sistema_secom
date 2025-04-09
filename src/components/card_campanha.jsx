import { useState, useEffect } from "react";
import { fetchCampaigns } from "../data/fetchMetrics";
import { Card, Spinner, Badge } from "react-bootstrap"; 
import { graficoMetrics } from "../data/graficoMetrics";
import { useTheme } from '../context/ThemeContext'; // Importe o useTheme

const CardCampanha = ({    
  onCampaignSelect, 
  startDate, 
  endDate, 
  selectedCampaign 
}) => {
  const { isDarkMode } = useTheme(); // Acesse o estado do tema

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const colors = {
    primary: isDarkMode ? '#00D000' : '#00D000',
    secondary: isDarkMode ? '#ffffff' : '#1E293B',
    selected: isDarkMode ? '#008500' : '#008500',
    border: isDarkMode ? '#444444' : '#E2E8F0',
    background: isDarkMode ? '#2d2d2d' : '#F8FAFC',
    lightBg: isDarkMode ? '#2c2c2c' : '#fefeff',
    error: '#EF4444',
    text: {
      primary: isDarkMode ? '#ffffff' : '#1E293B',
      secondary: isDarkMode ? '#d3dae4' : '#64748B',
      light: isDarkMode ? '#d3dae4' : '#94A3B8'
    }
  };

  const styles = {
    card: {
      border: `1px solid ${colors.border}`,
      borderRadius: '16px',
      padding: '24px',
      width: '100%',
      minHeight: '500px',
      fontFamily: 'Rawline, sans-serif',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(to bottom, ${colors.background}, ${colors.lightBg})`,
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    },
    header: {
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '1rem',
      fontWeight: '700',
      color: colors.secondary,
      margin: 0
    },
    badge: {
      backgroundColor: colors.primary,
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '0.7rem',
      fontWeight: '600',
      color: 'white',
      display: 'inline-block',
      alignSelf: 'center'
    },
    campaignsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      flex: 1,
      overflowY: 'auto',
      maxHeight: '400px',
      padding: '4px'
    },
    campaignItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px 16px',
      cursor: 'pointer',
      borderRadius: '12px',
      border: `1px solid transparent`,
      transition: 'all 0.2s ease',
      backgroundColor: colors.background,
      minHeight: '60px'
    },
    selectedCampaign: {
      backgroundColor: `${colors.primary}40`,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    statusDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: colors.primary,
      flexShrink: 0,
      boxShadow: '0 0 0 2px rgba(0, 208, 0, 0.2)',
      marginTop: '4px'
    },
    campaignName: {
      flex: 1,
      fontWeight: '500',
      color: colors.text.primary,
      fontSize: '14px',
      lineHeight: '1.4',
      wordBreak: 'break-word',
      whiteSpace: 'normal',
      overflow: 'visible',
      display: 'block',
      maxWidth: '100%',
      textOverflow: 'clip',
      hyphens: 'auto',
      WebkitHyphens: 'auto',
      MozHyphens: 'auto',
      msHyphens: 'auto'
    },
    errorMessage: {
      padding: '16px',
      borderRadius: '8px',
      color: colors.error,
      backgroundColor: `${colors.error}10`,
      fontWeight: '500',
      marginBottom: '16px'
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      color: colors.text.secondary,
      textAlign: 'center',
      flex: 1
    },
    spinner: {
      color: colors.primary,
      width: '3rem',
      height: '3rem'
    }
  };

  const loadCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCampaigns(startDate, endDate);
      const yesterday = new Date(endDate);
      yesterday.setDate(yesterday.getDate() - 1);

      const campaignsWithStatus = await Promise.all(
        data.map(async (campaign) => {
          const metrics = await graficoMetrics(startDate, endDate, campaign.Nome_Interno_Campanha);
          const yesterdayMetric = metrics.actual.find(item => {
            const metricDate = new Date(item.date);
            return metricDate.toDateString() === yesterday.toDateString();
          });
          const isActive = yesterdayMetric && yesterdayMetric.impressions > 0;
          return {
            ...campaign,
            isActive,
          };
        })
      );
      setCampaigns(campaignsWithStatus);
    } catch (error) {
      setError("Erro ao carregar campanhas. Por favor, tente novamente.");
      console.error("Erro ao carregar campanhas:", error);
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

  const renderCampaignName = (name) => {
    return (
      <div style={styles.campaignName}>
        {name || 'Sem nome'}
      </div>
    );
  };

  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>Em veiculação</h2>
        <Badge style={styles.badge}>
          {campaigns.length} campanhas
        </Badge>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Spinner animation="border" style={styles.spinner}>
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {campaigns.length > 0 ? (
            <div style={styles.campaignsList} className="custom-scrollbar">
              {campaigns.map((campaign) => {
                const isSelected = selectedCampaign === campaign.Nome_Interno_Campanha;
                const dotColor = campaign.isActive ? (isSelected ? colors.selected : colors.primary) : "#afafaf";
                const dotStyle = campaign.isActive 
                  ? { 
                      ...styles.statusDot,
                      backgroundColor: dotColor,
                      boxShadow: '0 0 0 2px rgba(0, 208, 0, 0.2)' 
                    }
                  : {
                      ...styles.statusDot, 
                      backgroundColor: dotColor,
                      boxShadow: 'none'
                    };

                return (
                  <div 
                    key={campaign.Nome_Interno_Campanha}
                    onClick={() => handleCampaignSelect(campaign.Nome_Interno_Campanha)}
                    style={{
                      ...styles.campaignItem,
                      ...(isSelected ? styles.selectedCampaign : {})
                    }}
                  >
                    <span style={dotStyle}></span>
                    {renderCampaignName(campaign.Nome_Interno_Campanha)}
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={colors.text.light} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p style={{ marginTop: '16px', fontWeight: '500' }}>
                Nenhuma campanha ativa encontrada.
              </p>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default CardCampanha;