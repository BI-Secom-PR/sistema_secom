import React from 'react';
import { Card } from 'react-bootstrap';
import { Twitter, Instagram } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { trending_twitter, trending_google, trending_instagram } from '../data/trending';
import { useTheme } from '../context/ThemeContext'; // Importe o useTheme

const TrendingTopics = () => {
  const { isDarkMode } = useTheme(); // Acesse o estado do tema

  return (
    <Card 
      style={{
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: 'auto',
        maxHeight: '700px',
        overflowY: 'auto',
        backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff', // Cor de fundo dinâmica
        color: isDarkMode ? '#ffffff' : '#000000', // Cor do texto dinâmica
      }}
    >
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Trending Topics</h2>

      {/* Twitter Trending Topics */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Twitter size={18} style={{ color: '#1DA1F2' }} /> {/* Cor do ícone fixa */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Twitter</h3>
        </div>
        {trending_twitter.map((trend) => (
          <div 
            key={trend.rank} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              borderBottom: `1px solid ${isDarkMode ? '#444444' : '#dee2e6'}`, // Cor da borda dinâmica
              transition: 'background-color 0.2s',
              cursor: 'pointer',
              backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff', // Cor de fundo dinâmica (igual ao fundo do card)
              '&:hover': {
                backgroundColor: isDarkMode ? '#3c3c3c' : '#f8f9fa', // Cor de fundo ao passar o mouse
              },
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ color: isDarkMode ? '#cccccc' : '#6c757d', fontWeight: 500, minWidth: '24px' }}>#{trend.rank}</span>
              <span style={{ fontWeight: 500 }}>{trend.topic}</span>
            </div>
            <span style={{ color: isDarkMode ? '#cccccc' : '#6c757d', fontSize: '0.875rem' }}>{trend.tweets}</span>
          </div>
        ))}
      </div>

      {/* Google Trending Topics */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <FaGoogle size={18} style={{ color: '#494949' }} /> {/* Cor do ícone fixa */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Google</h3>
        </div>
        {trending_google.map((trend) => (
          <div 
            key={trend.rank} 
            style={{
              display: 'flex',
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 1rem',
              borderBottom: `1px solid ${isDarkMode ? '#444444' : '#dee2e6'}`, // Cor da borda dinâmica
              transition: 'background-color 0.2s',
              cursor: 'pointer',
              backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff', // Cor de fundo dinâmica (igual ao fundo do card)
              '&:hover': {
                backgroundColor: isDarkMode ? '#3c3c3c' : '#f8f9fa', // Cor de fundo ao passar o mouse
              },
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ color: isDarkMode ? '#cccccc' : '#6c757d', fontWeight: 500, minWidth: '24px' }}>#{trend.rank}</span>
              <span style={{ fontWeight: 500 }}>{trend.topic}</span>
            </div>
            <span style={{ color: isDarkMode ? '#cccccc' : '#6c757d', fontSize: '0.875rem' }}>{trend.searches}</span>
          </div>
        ))}
      </div>

      {/* Instagram Trending Topics */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Instagram size={18} style={{ color: '#E1306C' }} /> {/* Cor do ícone fixa */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Instagram</h3>
        </div>
        {trending_instagram.map((trend) => (
          <div 
            key={trend.rank} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center', 
              padding: '0.75rem 1rem',
              borderBottom: `1px solid ${isDarkMode ? '#444444' : '#dee2e6'}`, // Cor da borda dinâmica
              transition: 'background-color 0.2s',
              cursor: 'pointer',
              backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff', // Cor de fundo dinâmica (igual ao fundo do card)
              '&:hover': {
                backgroundColor: isDarkMode ? '#3c3c3c' : '#f8f9fa', // Cor de fundo ao passar o mouse
              },
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ color: isDarkMode ? '#cccccc' : '#6c757d', fontWeight: 500, minWidth: '24px' }}>#{trend.rank}</span>
              <span style={{ fontWeight: 500 }}>{trend.topic}</span>
            </div>
            <span style={{ color: isDarkMode ? '#cccccc' : '#6c757d', fontSize: '0.875rem' }}>{trend.posts}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrendingTopics;