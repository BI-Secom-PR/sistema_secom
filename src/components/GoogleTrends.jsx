import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext'; // Importe o useTheme

const TrendsList = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Acesse o estado do tema

  useEffect(() => {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://trends.google.com/trending/rss?geo=BR')}`)
      .then(response => response.json())
      .then(data => {
        const xml = new DOMParser().parseFromString(data.contents, 'text/xml');
        const items = Array.from(xml.getElementsByTagName('item'))
          .slice(0, 10)
          .map(item => ({
            title: item.getElementsByTagName('title')[0]?.textContent,
            traffic: item.getElementsByTagName('ht:approx_traffic')[0]?.textContent
          }));
        setTrends(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '10px auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff', // Cor de fundo dinâmica
      padding: '15px',
      borderRadius: '8px'
    },
    title: {
      color: isDarkMode ? '#ffffff' : '#333', // Cor do texto dinâmica
      textAlign: 'center',
      fontSize: '1.2em',
      margin: '10px 0'
    },
    list: {
      padding: 0,
      listStyle: 'none'
    },
    item: {
      background: isDarkMode ? '#3a3a3a' : '#f9f9f9', // Cor de fundo dinâmica
      margin: '5px 0',
      padding: '8px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: isDarkMode ? '1px solid #444' : 'none' // Borda para melhor visibilidade no modo escuro
    },
    link: {
      color: isDarkMode ? '#66b0ff' : '#0066cc', // Cor do link dinâmica
      textDecoration: 'none',
      fontSize: '1em',
      fontWeight: 'bold'
    },
    traffic: {
      color: isDarkMode ? '#aaaaaa' : '#666', // Cor do tráfego dinâmica
      fontSize: '0.8em'
    },
    loading: {
      textAlign: 'center',
      color: isDarkMode ? '#aaaaaa' : '#666', // Cor do texto de carregamento dinâmica
      fontSize: '0.9em'
    }
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.loading}>Carregando...</div>
      ) : (
        <ul style={styles.list}>
          {trends.map((trend, i) => (
            <li key={i} style={styles.item}>
              <a href={trend.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                {i + 1}. {trend.title}
              </a>
              <span style={styles.traffic}>{trend.traffic || 'N/A'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendsList;