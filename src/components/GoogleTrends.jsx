import React, { useState, useEffect } from 'react';

const TrendsList = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

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
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      color: '#333',
      textAlign: 'center',
      fontSize: '1.2em',
      margin: '10px 0'
    },
    list: {
      padding: 0,
      listStyle: 'none'
    },
    item: {
      background: '#f9f9f9',
      margin: '5px 0',
      padding: '8px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    link: {
      color: '#0066cc',
      textDecoration: 'none',
      fontSize: '1em',
      fontWeight: 'bold'
    },
    traffic: {
      color: '#666',
      fontSize: '0.8em'
    },
    loading: {
      textAlign: 'center',
      color: '#666',
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