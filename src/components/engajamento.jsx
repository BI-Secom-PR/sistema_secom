import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { fetchPlatformEngagement } from '../data/fetchMetrics';

// Função para encurtar números grandes
const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'; // Bilhões
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'; // Milhões
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'; // Milhares
  }
  return num.toString(); // Números menores que 1000
};

const Engajamento = ({ startDate, endDate, selectedCampaign }) => {
  const [engagementData, setEngagementData] = useState({
    likes: 0,
    comments: 0,
    views: 0,
  });

  useEffect(() => {
    const fetchEngagement = async () => {
      // Passando startDate, endDate e selectedCampaign para a requisição
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
    };

    fetchEngagement();
  }, [startDate, endDate, selectedCampaign]);  // Re-executa sempre que as datas ou a campanha mudarem

  return (
    <Card className="campaign-card h-100 p-4">
      <h2 className="h4 mb-5 text-dark">Engajamento</h2>  {/* Exibe o intervalo de datas */}
      {selectedCampaign && <h3 className="text-dark mb-4">Campanha: {selectedCampaign}</h3>}  {/* Exibe o nome da campanha selecionada */}
      <div className="d-flex flex-column gap-5">
        <div 
          className="rounded d-flex justify-content-between align-items-center p-4"
          style={{
            minHeight: '90px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f0f7ff 100%)',
            borderLeft: '4px solid #3b82f6'
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <ThumbsUp size={32} color="#3b82f6" />
            <span className="fs-5 text-dark">Curtidas</span>
          </div>
          <span className="fs-4 fw-bold" style={{ color: '#000000' }}>
            {engagementData.likes.toLocaleString()}
          </span>
        </div>
  
        <div 
          className="rounded d-flex justify-content-between align-items-center p-4"
          style={{
            minHeight: '90px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f0fff4 100%)',
            borderLeft: '4px solid #22c55e'
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <MessageCircle size={32} color="#22c55e" />
            <span className="fs-5 text-dark">Comentários</span>
          </div>
          <span className="fs-4 fw-bold" style={{ color: '#000000' }}>
            {engagementData.comments.toLocaleString()}
          </span>
        </div>
  
        <div 
          className="rounded d-flex justify-content-between align-items-center p-4"
          style={{
            minHeight: '90px',
            background: 'linear-gradient(145deg, #ffffff 0%, #fffdf3 100%)',
            borderLeft: '4px solid #FBD500'
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <Eye size={32} color="#FBD500" />
            <span className="fs-5 text-dark">Visualizações</span>
          </div>
          <span className="fs-4 fw-bold" style={{ color: '#000000' }}>
            {formatNumber(engagementData.views)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Engajamento;
