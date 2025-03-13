import { useState, useEffect } from "react";
import { fetchCampaigns } from "../data/fetchMetrics";
import { Card, Spinner, Badge } from "react-bootstrap"; 
import { graficoMetrics } from "../data/graficoMetrics";

const CardCampanha = ({    
  onCampaignSelect, 
  startDate, 
  endDate, 
  selectedCampaign 
}) => {
  // Importação da fonte Rawline
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Rawline:wght@300;400;600;700&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Paleta de cores
  const colors = {
    primary: '#00D000',
    secondary: '#1E293B',
    selected: '#008500',
    border: '#E2E8F0',
    background: '#F8FAFC',
    lightBg: '#F1F5F9',
    error: '#EF4444',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      light: '#94A3B8'
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
      background: 'linear-gradient(to bottom, white, #F8FAFC)',
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
      fontSize: '1.2rem',
      fontWeight: '700',
      color: colors.secondary,
      margin: 0
    },
    badge: {
      backgroundColor: colors.primary,
      padding: '4px 8px',         // Reduzido o padding
      borderRadius: '20px',       // Mantém o formato arredondado
      fontSize: '0.7rem',         // Reduzido o tamanho da fonte
      fontWeight: '600',
      color: 'white',
      display: 'inline-block',    // Garante que o badge não se expanda
      alignSelf: 'center'         // Alinha verticalmente
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
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      cursor: 'pointer',
      borderRadius: '12px',
      border: `1px solid transparent`,
      transition: 'all 0.2s ease',
      backgroundColor: 'white'
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
      boxShadow: '0 0 0 2px rgba(0, 208, 0, 0.2)'
    },
    campaignName: {
      flex: 1,
      fontWeight: '500',
      color: colors.text.primary,
      fontSize: '14px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
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
      // Busca a lista de campanhas
      const data = await fetchCampaigns(startDate, endDate);
      
      // Define a data de ontem com base no endDate
      const yesterday = new Date(endDate);
      yesterday.setDate(yesterday.getDate() - 1);
  
      // Para cada campanha, busca os dados de métricas e verifica se ontem teve impressões
      const campaignsWithStatus = await Promise.all(
        data.map(async (campaign) => {
          const metrics = await graficoMetrics(startDate, endDate, campaign.Nome_Interno_Campanha);
          
          // Procura o registro de ontem na array "actual"
          const yesterdayMetric = metrics.actual.find(item => {
            const metricDate = new Date(item.date);
            return metricDate.toDateString() === yesterday.toDateString();
          });
          
          // Considera ativa se houver registro de ontem e impressões maiores que zero
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
                
                // Se a campanha não teve métricas (isActive false), usa cinza; caso contrário, mantém as cores originais.
                const dotColor = campaign.isActive ? (isSelected ? colors.selected : colors.primary) : "#808080";

                return (
                  <div 
                    key={campaign.Nome_Interno_Campanha}
                    onClick={() => handleCampaignSelect(campaign.Nome_Interno_Campanha)}
                    style={{
                      ...styles.campaignItem,
                      ...(isSelected ? styles.selectedCampaign : {})
                    }}
                  >
                    <span
                      style={{
                        ...styles.statusDot,
                        backgroundColor: dotColor
                      }}
                    ></span>
                  
                    <span style={styles.campaignName}>
                      {campaign.Nome_Interno_Campanha || 'Sem nome'}
                    </span>
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