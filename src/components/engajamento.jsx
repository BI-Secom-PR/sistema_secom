import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { fetchPlatformEngagement } from '../data/fetchMetrics';

const formatNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
};

const Engajamento = ({ startDate, endDate, selectedCampaign }) => {
  // Importação da fonte Rawline
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Rawline:wght@300;400;600;700&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  const [engagementData, setEngagementData] = useState({
    likes: 0,
    comments: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(true);

  // Paleta de cores
  const colors = {
    primary: '#00D000',
    secondary: '#1E293B',
    border: '#E2E8F0',
    background: '#F8FAFC',
    lightBg: '#F1F5F9',
    likes: '#183EFF',
    comments: '#00D000',
    views: '#FFD000',
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
      fontSize: '1rem',
      fontWeight: '700',
      color: colors.secondary,
      margin: 0
    },
    subtitle: {
      fontSize: '1rem',
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
      padding: '16px',
      minHeight: '90px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    iconValueContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    valueText: {
      fontSize: '1.25rem',
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
        background,
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
        <Icon size={28} color={color} />
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
          background="linear-gradient(145deg, #ffffff 0%, #f0f7ff 100%)"
        />
        <EngagementItem 
          icon={MessageCircle}
          color={colors.comments}
          value={engagementData.comments}
          background="linear-gradient(145deg, #ffffff 0%, #f0fff4 100%)"
        />
        <EngagementItem 
          icon={Eye}
          color={colors.views}
          value={engagementData.views}
          background="linear-gradient(145deg, #ffffff 0%, #fffdf3 100%)"
        />
      </div>
    </Card>
  );
};

export default Engajamento;