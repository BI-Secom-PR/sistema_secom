import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { fetchPlatformEngagement } from '../data/fetchMetrics';
import { useTheme } from '../context/ThemeContext';

const formatNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
};

const Engajamento = ({ startDate, endDate, selectedCampaign }) => {
  const { isDarkMode } = useTheme();
  const [engagementData, setEngagementData] = useState({
    likes: 0,
    comments: 0,
    views: 0,
  });
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

  // Paleta de cores
  const colors = {
    primary: isDarkMode ? '#bb86fc' : '#00D000',
    secondary: isDarkMode ? '#ffffff' : '#1E293B',
    border: isDarkMode ? '#444444' : '#E2E8F0',
    background: isDarkMode ? '#2d2d2d' : '#F8FAFC',
    lightBg: isDarkMode ? '#2c2c2c' : '#F1F5F9',
    likes: isDarkMode ? '#a3b2fd' : '#183EFF',
    comments: isDarkMode ? '#80fa80' : '#00D000',
    views: isDarkMode ? '#ffeb90' : '#FFD000',
    text: {
      primary: isDarkMode ? '#ffffff' : '#1E293B',
      secondary: isDarkMode ? '#94A3B8' : '#64748B',
      light: isDarkMode ? '#64748B' : '#94A3B8'
    }
  };

  const styles = {
    card: {
      border: `1px solid ${colors.border}`,
      borderRadius: '16px',
      padding: '24px',
      width: '100%',
      minHeight: isAbove4K ? '1300px' : '1300px', // Aumentado para fontes maiores
      fontFamily: 'Rawline, sans-serif',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      background: isDarkMode 
        ? 'linear-gradient(to bottom, #2d2d2d, #202020)' 
        : 'linear-gradient(to bottom, white, #F8FAFC)',
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
      fontSize: isAbove4K ? '1.75rem' : '1rem', // Aumentado para +75% (1rem → 1.75rem)
      fontWeight: '700',
      color: colors.secondary,
      margin: 0
    },
    subtitle: {
      fontSize: isAbove4K ? '1.75rem' : '1rem', // Aumentado para +75% (1rem → 1.75rem)
      fontWeight: '600',
      color: colors.secondary,
      marginBottom: '20px'
    },
    engagementContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      flex: 1
    },
    engagementItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isAbove4K ? '20px' : '16px', // Aumentado para fontes maiores
      minHeight: isAbove4K ? '120px' : '90px', // Aumentado para fontes maiores
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      backgroundColor: isDarkMode ? '#2c2c2c' : 'white',
    },
    iconValueContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    valueText: {
      fontSize: isAbove4K ? '2.2rem' : '1.25rem', // Aumentado para ~75% (1.25rem → 2.2rem)
      fontWeight: '700',
      color: colors.secondary
    },
    spinner: {
      color: colors.primary,
      width: '1.5rem',
      height: '1.5rem'
    }
  };

  useEffect(() => {
    const fetchEngagement = async () => {
      setLoading(true);
      try {
        const data = await fetchPlatformEngagement(startDate, endDate, selectedCampaign);
        if (data) {
          const totalLikes = data.reduce((acc, item) => acc + item.likes, 0);
          const totalComments = data.reduce((acc, item) => acc + item.comment, 0);
          const totalViews = data.reduce((acc, item) => acc + item.views, 0);
          
          setEngagementData({
            likes: totalLikes,
            comments: totalComments,
            views: totalViews,
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagement();
  }, [startDate, endDate, selectedCampaign]);

  const EngagementItem = ({ icon: Icon, color, value, background }) => (
    <div 
      style={{
        ...styles.engagementItem,
        borderLeft: `4px solid ${color}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
      }}
    >
      <div style={styles.iconValueContainer}>
        <Icon size={isAbove4K ? 40 : 28} color={color} /> {/* Aumentado ícone para consistência */}
        {loading ? (
          <Spinner animation="border" style={styles.spinner} />
        ) : (
          <span style={styles.valueText}>
            {typeof value === 'number' ? formatNumber(value) : value.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>Engajamento - META</h2>
      </div>
      
      {selectedCampaign && 
        <h3 style={styles.subtitle}>Campanha: {selectedCampaign}</h3>
      }
      
      <div style={styles.engagementContainer}>
        <EngagementItem 
          icon={ThumbsUp}
          color={colors.likes}
          value={engagementData.likes}
        />
        <EngagementItem 
          icon={MessageCircle}
          color={colors.comments}
          value={engagementData.comments}
        />
        <EngagementItem 
          icon={Eye}
          color={colors.views}
          value={engagementData.views}
        />
      </div>
    </Card>
  );
};

export default Engajamento;