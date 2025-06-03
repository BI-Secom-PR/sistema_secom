import React, { useState, useEffect } from 'react';
import { Card, Spinner } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaPinterest, FaLinkedin, FaGoogle } from "react-icons/fa";
import { fetchPlatformMetrics } from '../data/fetchMetrics';
import tiktokLogo from "../assets/tiktok-logo.png";
import kwaiLogo from "../assets/kwai-logo.png";
import youtubeLogo from "../assets/youtube-logo.png";
import gdnLogo from "../assets/gdn-logo.png";
import demandLogo from "../assets/google-demand-logo.png";
import { useTheme } from '../context/ThemeContext';

const Veiculos_investimentos = ({ startDate, endDate, selectedCampaign }) => {
  const { isDarkMode } = useTheme();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isAbove4K, setIsAbove4K] = useState(false);

  useEffect(() => {
    const checkResolution = () => {
      const is4KPlus = window.innerWidth > 3840 || window.innerHeight > 2160;
      setIsAbove4K(is4KPlus);
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  const colors = {
    primary: isDarkMode ? '#bb86fc' : '#00D000',
    secondary: isDarkMode ? '#ffffff' : '#1E293B',
    border: isDarkMode ? '#444444' : '#E2E8F0',
    background: isDarkMode ? '#2d2d2d' : '#F8FAFC',
    lightBg: isDarkMode ? '#2c2c2c' : '#F1F5F9',
    text: {
      primary: isDarkMode ? '#ffffff' : '#1E293B',
      secondary: isDarkMode ? '#d3dae4' : '#64748B',
      light: isDarkMode ? '#64748B' : '#94A3B8'
    },
    platforms: {
      instagram: '#E1306C',
      facebook: '#4267B2',
      pinterest: '#E60023',
      linkedin: '#0077B5',
      google: '#DB4437',
      tiktok: '#000000',
      kwai: '#FF7300',
      youtube: '#FF0000',
      gdn: '#4285F4'
    }
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 992;

  const styles = {
    card: {
      border: `1px solid ${colors.border}`,
      borderRadius: '16px',
      padding: isMobile ? '16px' : '24px',
      width: '100%',
      height: isAbove4K ? "auto" : "1300px", // Auto height for 4K+ resolutions
      minHeight: isAbove4K ? "1300px" : "auto", // Ensure minimum height for content
      fontFamily: 'Rawline, sans-serif',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      background: isDarkMode 
        ? 'linear-gradient(to bottom, #2d2d2d, #2c2c2c)' 
        : 'linear-gradient(to bottom, white, #F8FAFC)',
      overflowY: isAbove4K ? 'visible' : 'auto' // No scroll for 4K+, scroll for smaller resolutions
    },
    header: {
      marginBottom: isMobile ? '12px' : '20px',
      paddingBottom: isMobile ? '8px' : '12px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: isAbove4K ? '1.8rem' : isMobile ? '1rem' : '1.2rem',
      fontWeight: '700',
      color: colors.secondary,
      margin: 0
    },
    platformsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: isAbove4K ? '24px' : isMobile ? '12px' : '16px',
      marginTop: isAbove4K ? '16px' : isMobile ? '8px' : '10px'
    },
    platformRow: {
      padding: isAbove4K ? '24px' : isMobile ? '12px' : '16px',
      borderRadius: '12px',
      backgroundColor: isDarkMode ? '#2c2c2c' : 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden',
      border: `1px solid ${colors.border}`
    },
    platformHeader: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      width: '100%',
      gap: isAbove4K ? '20px' : '10px',
      position: 'relative',
      zIndex: 1
    },
    platformTopRow: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      marginBottom: isMobile ? '10px' : 0
    },
    icon: {
      width: isAbove4K ? '40px' : '30px',
      height: isAbove4K ? '40px' : '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isAbove4K ? '32px' : '24px',
      marginRight: isAbove4K ? '15px' : '10px'
    },
    platformInfo: {
      width: isMobile ? 'calc(100% - 40px)' : isAbove4K ? '200px' : '150px',
      marginRight: isMobile ? 0 : isAbove4K ? '30px' : '20px'
    },
    platformName: {
      fontSize: isAbove4K ? '1.5rem' : isMobile ? '0.9rem' : '1rem',
      fontWeight: '600',
      display: 'block',
      color: colors.text.primary
    },
    investment: {
      fontSize: isAbove4K ? '1.8rem' : isMobile ? '0.9rem' : '1.1rem',
      fontWeight: '700',
      color: colors.text.secondary
    },
    metricsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: isAbove4K ? '16px' : isMobile ? '8px 5px' : '10px',
      backgroundColor: colors.lightBg,
      width: isMobile ? '100%' : 'auto',
      overflowX: isMobile ? 'auto' : 'visible'
    },
    metrics: {
      display: 'flex',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      gap: isAbove4K ? '30px' : isMobile ? '10px' : '15px',
      width: '100%',
      minWidth: isMobile ? '400px' : 'auto'
    },
    metricItem: {
      width: isAbove4K ? '80px' : isMobile ? '60px' : '55px', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 0,
      flexShrink: 0
    },
    metricLabel: {
      fontSize: isAbove4K ? '1.3rem' : isMobile ? '0.7rem' : '0.85rem',
      fontWeight: '700',
      color: colors.text.secondary,
      marginBottom: isAbove4K ? '8px' : '4px'
    },
    metricValue: {
      fontSize: isAbove4K ? '1.4rem' : isMobile ? '0.8rem' : '1rem',
      fontWeight: '700',
      color: colors.text.primary,
      whiteSpace: 'nowrap'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: isAbove4K ? '300px' : '200px',
      gap: isAbove4K ? '20px' : '10px'
    },
    spinner: {
      color: colors.primary,
      width: isAbove4K ? '3rem' : '1.5rem',
      height: isAbove4K ? '3rem' : '1.5rem'
    }
  };

  useEffect(() => {
    const getMetrics = async () => {
      setLoading(true);
      try {
        const result = await fetchPlatformMetrics(startDate, endDate, selectedCampaign);
        
        const allPlatforms = [
          { platform: "Instagram", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Facebook", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Pinterest", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Linkedin", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Google Search", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Tiktok", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Kwai", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Youtube", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Google GDN", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
          { platform: "Google Demand", spend: 0, CPM: 0, CPV: 0, CPC: 0, CTR: 0, VTR: 0, impressions: 0 },
        ];

        const mergedMetrics = allPlatforms.map(platform => {
          const found = result.find(item => item.platform.toLowerCase() === platform.platform.toLowerCase());
          return found ? found : platform;
        });

        setMetrics(mergedMetrics);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    getMetrics();
  }, [startDate, endDate, selectedCampaign]);

  const getIcon = (platform) => {
    const logoSize = isAbove4K ? 32 : 24;
    const youtubeWidth = isAbove4K ? 44 : 34;
    
    switch (platform.toLowerCase()) {
      case "instagram": return <FaInstagram style={{ color: colors.platforms.instagram, fontSize: logoSize }} />;
      case "facebook": return <FaFacebook style={{ color: colors.platforms.facebook, fontSize: logoSize }} />;
      case "pinterest": return <FaPinterest style={{ color: colors.platforms.pinterest, fontSize: logoSize }} />;
      case "linkedin": return <FaLinkedin style={{ color: colors.platforms.linkedin, fontSize: logoSize }} />;
      case "google search": return <FaGoogle style={{ color: colors.platforms.google, fontSize: logoSize }} />;
      case "tiktok": return <img src={tiktokLogo} alt="TikTok Logo" width={logoSize} height={logoSize} />;
      case "kwai": return <img src={kwaiLogo} alt="Kwai Logo" width={logoSize} height={logoSize} />;
      case "youtube": return <img src={youtubeLogo} alt="Youtube Logo" width={youtubeWidth} height={logoSize} />;
      case "google gdn": return <img src={gdnLogo} alt="GDN Logo" width={logoSize} height={logoSize} />;
      case "google demand": return <img src={demandLogo} alt="Demand Logo" width={logoSize} height={logoSize} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <Card style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Investimento por veículo</h2>
        </div>
        <div style={styles.loadingContainer}>
          <Spinner animation="border" style={styles.spinner} />
          <span style={{ 
            color: colors.text.secondary, 
            fontSize: isAbove4K ? '1.5rem' : '1rem'
          }}>
            Carregando métricas...
          </span>
        </div>
      </Card>
    );
  }

  const sortedMetrics = [...metrics].sort((a, b) => (b.spend || 0) - (a.spend || 0));

  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>Investimento por veículo</h2>
      </div>
      
      <div style={styles.platformsList}>
        {sortedMetrics.map((item, index) => (
          <div key={index} style={styles.platformRow}>
            <div style={styles.platformHeader}>
              {isMobile ? (
                <>
                  <div style={styles.platformTopRow}>
                    <div style={styles.icon}>{getIcon(item.platform)}</div>
                    <div style={styles.platformInfo}>
                      <span style={styles.platformName}>
                        {item.platform}
                      </span>
                      <div style={styles.investment}>
                        {item.spend
                          ? `R$ ${item.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          : "R$ 0,00"}
                      </div>
                    </div>
                  </div>
                  <div style={styles.metricsContainer} data-metrics-container>
                    <div style={styles.metrics}>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CPM</span>
                        <span style={styles.metricValue}>
                          {item.CPM ? `R$ ${item.CPM.toFixed(2)}` : "R$0,00"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CPV</span>
                        <span style={styles.metricValue}>
                          {item.CPV ? `R$ ${item.CPV.toFixed(2)}` : "R$0,00"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CPC</span>
                        <span style={styles.metricValue}>
                          {item.CPC ? `R$ ${item.CPC.toFixed(2)}` : "R$0,00"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CTR</span>
                        <span style={styles.metricValue}>
                          {item.CTR ? `${(item.CTR * 100).toFixed(2)}%` : "0%"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>VTR</span>
                        <span style={styles.metricValue}>
                          {item.VTR ? `${(item.VTR * 100).toFixed(2)}%` : "0%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.icon}>{getIcon(item.platform)}</div>
                  <div style={styles.platformInfo}>
                    <span style={styles.platformName}>
                      {item.platform}
                    </span>
                    <div style={styles.investment}>
                      {item.spend
                        ? `R$ ${item.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                        : "R$ 0,00"}
                    </div>
                  </div>
                  <div style={styles.metricsContainer} data-metrics-container>
                    <div style={styles.metrics}>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CPM</span>
                        <span style={styles.metricValue}>
                          {item.CPM ? `R$ ${item.CPM.toFixed(2)}` : "R$0,00"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CPV</span>
                        <span style={styles.metricValue}>
                          {item.CPV ? `R$ ${item.CPV.toFixed(2)}` : "R$0,00"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CPC</span>
                        <span style={styles.metricValue}>
                          {item.CPC ? `R$ ${item.CPC.toFixed(2)}` : "R$0,00"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>CTR</span>
                        <span style={styles.metricValue}>
                          {item.CTR ? `${(item.CTR * 100).toFixed(2)}%` : "0%"}
                        </span>
                      </div>
                      <div style={styles.metricItem}>
                        <span style={styles.metricLabel}>VTR</span>
                        <span style={styles.metricValue}>
                          {item.VTR ? `${(item.VTR * 100).toFixed(2)}%` : "0%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Veiculos_investimentos;